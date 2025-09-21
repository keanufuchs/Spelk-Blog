---
layout: layout.njk
title: "Keanu's Tech Blog"
---

<div class="text-center mb-12">
  <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
    Welcome to My Tech Blog
  </h1>
  <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
    Exploring the world of technology, from Linux system administration to network engineering with Cisco. 
    Sharing knowledge, tutorials, and real-world experiences.
  </p>
</div>

<div class="grid gap-8 md:gap-12">
  <section>
    <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
      <svg class="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
      </svg>
      Latest Posts
    </h2>
    
    <div class="space-y-6">
      <!-- Tech Post Card -->
      <article class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 border-l-4 border-blue-500">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              <a href="/posts/2025-09-21-hello-world/" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                Getting Started with Linux System Administration
              </a>
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
              Welcome to my tech blog! This is my first post where I'll share insights about Linux, network engineering, 
              and system administration from real-world experience.
            </p>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <time datetime="2025-09-21">September 21, 2025</time>
              <span class="mx-2">•</span>
              <span>Linux</span>
            </div>
            <div class="flex space-x-2">
              <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                Linux
              </span>
              <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                Tutorial
              </span>
            </div>
          </div>
          <div class="ml-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
              New
            </span>
          </div>
        </div>
      </article>
    </div>
  </section>
</div>