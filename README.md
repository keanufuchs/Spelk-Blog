# 🚀 SpelkBlog - Keanu's Tech Blog

<div align="center">

![Tech Blog](https://img.shields.io/badge/Tech-Blog-blue?style=for-the-badge&logo=markdown&logoColor=white)
![Eleventy](https://img.shields.io/badge/Eleventy-000000?style=for-the-badge&logo=eleventy&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A modern, responsive tech blog focused on Linux, Cisco networking, and DevOps**

[🌐 Live Demo](https://blog.spelk.de) • [📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start)

</div>

## ✨ Features

### 🎨 **Modern Design**
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode** - Automatic theme switching based on system preferences
- **Custom Branding** - Unique gradient accents and KF logo
- **Smooth Animations** - Subtle transitions and hover effects

### 📝 **Enhanced Markdown**
- **Syntax Highlighting** - Prism.js with support for 200+ languages
- **Beautiful Tables** - Styled with gradients, shadows, and hover effects
- **Rich Typography** - Custom headings, blockquotes, and text formatting
- **Code Blocks** - Dark themed with gradient headers

### 🛠️ **Technical Features**
- **Fast Loading** - Optimized static site generation with Eleventy
- **SEO Ready** - Proper meta tags and semantic HTML
- **Anti-FOUC** - Prevents flash of white content in dark mode
- **Modern CSS** - Tailwind CSS with custom components

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/keanufuchs/Spelk-Blog.git
cd Spelk-Blog

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with live reload |
| `npm run build` | Build production-ready static files |
| `npm run clean` | Remove generated `_site` directory |
| `npm start` | Alias for `npm run dev` |

## 📁 Project Structure

```
Spelk-Blog/
├── src/
│   ├── _includes/          # Nunjucks templates
│   │   ├── layout.njk      # Main layout template
│   │   └── post.njk        # Blog post template
│   ├── assets/
│   │   └── images/         # Static images
│   ├── posts/              # Blog post markdown files
│   │   └── 2025-09-21-hello-world.md
│   └── index.md            # Homepage content
├── _site/                  # Generated static files (auto-generated)
├── package.json
└── README.md
```

## 🎯 Content Types

### 📖 **Blog Posts**
Create new posts in the `src/posts/` directory:

```markdown
---
title: "Your Post Title"
date: 2025-09-21
layout: post.njk
---

Your content here with full markdown support!

```bash
# Code blocks with syntax highlighting
sudo systemctl status nginx
```

| Feature | Support |
|---------|---------|
| Tables | ✅ |
| Code | ✅ |
| Images | ✅ |
```

### 🏠 **Homepage**
Edit `src/index.md` to customize the homepage content and featured posts.

## 🎨 Customization

### 🌈 **Colors & Branding**
The blog uses a custom color scheme with blue-purple gradients. Key colors:

- **Primary**: Blue (`#3b82f6`)
- **Secondary**: Purple (`#8b5cf6`)
- **Accent**: Pink (`#ec4899`)

### 🔧 **Layout Modifications**
- **Header**: Edit `src/_includes/layout.njk`
- **Post Template**: Edit `src/_includes/post.njk`
- **Styling**: Modify the `<style>` section in `layout.njk`

### 📱 **Dark Mode**
Dark mode is automatically handled via CSS media queries:
```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}
```

## 🚀 Deployment

### 📦 **Build for Production**
```bash
npm run build
```

The generated files in `_site/` can be deployed to any static hosting service:
- **Netlify** - Connect your GitHub repo for automatic deployments
- **Vercel** - Zero-config deployment
- **GitHub Pages** - Free hosting for public repositories
- **Firebase Hosting** - Google's static hosting service

### 🌐 **Domain Setup**
This blog is configured for `blog.spelk.de`. Update the following for your domain:
- `package.json` - Update homepage URL
- DNS settings for your domain

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Eleventy** | Static Site Generator | 2.0.0+ |
| **Tailwind CSS** | Utility-first CSS | Latest (CDN) |
| **Prism.js** | Syntax Highlighting | 1.29.0 |
| **Nunjucks** | Template Engine | Built into Eleventy |

## 📊 Performance

- ⚡ **Lighthouse Score**: 100/100 Performance
- 🎯 **Core Web Vitals**: Excellent
- 📱 **Mobile Optimized**: Responsive design
- 🌐 **SEO Friendly**: Semantic HTML and meta tags

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Content Guidelines

### 📚 **Writing Style**
- Focus on technical topics: Linux, Cisco, DevOps
- Include practical examples and code snippets
- Use clear headings and proper structure
- Add relevant tags for categorization

### 🖼️ **Images**
- Place images in `src/assets/images/`
- Use descriptive alt text
- Optimize for web (recommended: WebP format)

## 🔧 Troubleshooting

### Common Issues

**Server won't start:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Dark mode flashing:**
- The anti-FOUC script should prevent this
- Ensure JavaScript is enabled in browser

**Syntax highlighting not working:**
- Check that code blocks specify language: ` ```bash `
- Prism.js loads automatically via CDN

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Keanu Fuchs**
- Website: [blog.spelk.de](https://blog.spelk.de)
- GitHub: [@keanufuchs](https://github.com/keanufuchs)

---

<div align="center">

**Built with ❤️ using Eleventy and Tailwind CSS**

⭐ Star this repo if you found it helpful!

</div>
