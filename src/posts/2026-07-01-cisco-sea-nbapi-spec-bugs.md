---
title: "Fixing the Cisco SEA NorthBound API Spec: 8 Bugs That Break Your Generated Client"
date: 2026-07-01
layout: post.njk
---

I recently integrated with Cisco's **Secure Equipment Access (SEA) NorthBound API** and ran into a frustrating problem: the official `SEA_NBApiSpec.json` is out of sync with the actual API behavior. If you generate an OpenAPI client from the published spec and run it against a real SEA instance, you will hit validation errors — not because your code is wrong, but because the spec is.

This post documents every discrepancy I found, the exact error each one causes, and the fix I applied.

---

## Background

The **Cisco SEA NorthBound API (NBAPI)** lets you programmatically manage gateways, devices, connections, and users in a SEA deployment. Cisco provides a Swagger/OpenAPI 2.0 spec file (`SEA_NBApiSpec.json`) that you can use with any OpenAPI generator to produce a typed client — in my case, a Python client with Pydantic validation.

The problem is that **strict Pydantic validation immediately exposes spec/reality mismatches** that are invisible with a hand-written HTTP client. Every enum value that doesn't match, every wrong type, every missing model variant becomes a `ValidationError` at runtime.

---

## Bug 1: Wrong Protocol Value — `WEB` vs. `WEB_APP`

**Affected definitions:** `input_post_connection`, `input_put_connection`, and all `response_*` protocol enums (7 occurrences total)

The spec defines the `protocol` enum with the value `"WEB"`. The actual API rejects this with:

```
400 Bad Request
{"error_code":"006001","message":"Invalid/Missing Inputs",
"debug_message":["Connection protocol is not recognized.
Please use these available options: [RDP, SSH, VNC, TELNET, WEB_APP, SEA_PLUS]"]}
```

**Fix:** Replace `"WEB"` with `"WEB_APP"` in every protocol enum across the spec.

---

## Bug 2: `idle_timeout` Maximum Is Wrong

**Affected definitions:** `input_post_connection`, `input_put_connection`, `response_common_get_connection`

The spec sets `"maximum": 600` for `idle_timeout` (10 minutes). The actual API and the SEA admin dashboard both support up to **7200 seconds (120 minutes)**. Any client-side validation will reject perfectly valid timeout values:

```
ValidationError: 1 validation error for InputPostConnection
idle_timeout
  Input should be less than or equal to 600 [input_value=900, input_type=int]
```

**Fix:**
```diff
- "maximum": 600,
+ "maximum": 7200,
```

---

## Bug 3: Missing Gateway Models in `input_gateway`

The `model` enum in `input_gateway` is missing several real-world Catalyst 9300 variants. If your gateway uses any of these models, the input validation rejects it before the request even reaches the API:

| Missing Model     |
|-------------------|
| `C9300-48T`       |
| `C9300L-24P-4G`   |
| `C9300L-24P-4X`   |
| `C9300L-48P-4G`   |
| `C9300L-48P-4X`   |

**Fix:** Add all five to the `input_gateway.model` enum.

---

## Bug 4: Missing Gateway Models in `response_common_gateway`

The response-side enum has the same problem. Two additional models appear in real API responses but are absent from the spec, causing deserialization to fail:

```
ValidationError: 1 validation error for ResponseCommonGateway
model
  Value error, must be one of enum values (...) [input_value='C9300LM-48U-4Y']
```

**Missing from `response_common_gateway.model`:**

| Missing Model      |
|--------------------|
| `C9300L-48PF-4X`   |
| `C9300LM-48U-4Y`   |

**Fix:** Add both to the `response_common_gateway.model` enum.

---

## Bug 5: `response_protocol_port.protocol` Is an Integer, Not a String

When you fetch a connection and inspect `protocol_definition.allowed_protocols[]`, the spec says `protocol` is a `string` with values like `["SSH", "RDP", ...]`. The API actually returns an **integer**:

```
ValidationError: 1 validation error for ResponseProtocolPort
protocol
  Input should be a valid string [type=string_type, input_value=6, input_type=int]
```

**Fix:**
```diff
- "protocol": {
-     "type": "string",
-     "description": "Available options: [SSH, RDP, TELNET, VNC, WEB, SEA_PLUS]",
-     "enum": ["SSH", "RDP", "TELNET", "VNC", "WEB", "SEA_PLUS"],
-     "example": "SSH"
- }
+ "protocol": {
+     "type": "integer",
+     "description": "Protocol port number (integer)",
+     "example": 6
+ }
```

---

## Bug 6: Protocol Definition Type — Case Sensitivity

The `response_common_protocol_definition.type` enum only includes uppercase values `["PREDEFINED", "CUSTOM"]`. The actual API returns `"Custom"` (mixed case), which fails strict validation:

```
ValidationError: 1 validation error for ResponseCommonProtocolDefinition
type
  Value error, must be one of enum values ('PREDEFINED', 'CUSTOM')
  [input_value='Custom', input_type=str]
```

**Fix:** Add `"Custom"` to the enum alongside the existing uppercase variants.

---

## Bug 7: Multiple Enum Mismatches in GET /devices

The `response_common_gateway` definition has several fields where the spec and the real API disagree on valid values. These all surface as Pydantic validation errors when listing devices or gateways:

| Field | Missing from Spec | API actually returns |
|---|---|---|
| `sra_agent_app_status` | `Unsupported` | `"Unsupported"` |
| `sra_agent_installed_by` | `App_Manager`, `Cyber_Vision` | `"App_Manager"`, `"Cyber_Vision"` |
| `sra_agent_installed_by_display_name` | `Cyber Vision` | `"Cyber Vision"` |
| `sra_agent_status` | `Deploying`, `Installed` | `"Deploying"`, `"Installed"` |
| `sra_agent_app_phase` | `Original` | `"Original"` |

Additionally, the `gateway` field in `response_common_device_with_gateway` is defined as an **array** in the spec, but the API returns a **single object**:

```diff
- "gateway": {
-     "type": "array",
-     "items": { "$ref": "#/definitions/response_common_gateway" }
- }
+ "gateway": {
+     "$ref": "#/definitions/response_common_gateway"
+ }
```

**Fix:** Add all missing enum values and correct the `gateway` field type.

---

## Bug 8: User Status Enum Case Mismatch

The `response_common_group_user.status` enum is defined with PascalCase values: `["Active", "Inactive", "Blocked"]`. The API returns lowercase: `"active"`, `"inactive"`, `"blocked"`.

| Spec Value | API Value |
|---|---|
| `Active` | `active` |
| `Inactive` | `inactive` |
| `Blocked` | `blocked` |

**Fix:** Change the enum to lowercase to match actual API responses.

---

## The Fixed Spec

I applied all of these fixes to a corrected `SEA_NBApiSpec.json`, available here:

**[github.com/keanufuchs/cisco-sea-nbapi-spec](https://github.com/keanufuchs/cisco-sea-nbapi-spec)**

Drop it into your OpenAPI generator in place of the official spec — the resulting client will work against a real SEA instance without hitting these validation errors.

If you find additional mismatches, feel free to open an issue or PR.

---

## Takeaway

The Cisco SEA NBAPI itself works fine — these are all documentation/spec issues, not API bugs. But if you're generating a typed client from the published spec, you will run into each of these. The pattern is consistent: enum values with wrong casing, missing model variants that exist in the real world, and a couple of type mismatches where the spec and API disagree on `string` vs. `integer` or `array` vs. `object`.

Hopefully this saves someone the hours of trial-and-error it took me to track them all down.
