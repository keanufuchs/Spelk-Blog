---
layout: layout.njk
title: "Keanu's Tech Blog"
---

<div class="text-center mb-12">
  <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
    When Google Doesn't Have The Answer
  </h1>
  <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
    We've all been there - your computer does something weird, you search online for hours, but nothing works. 
    <span class="text-blue-600 dark:text-blue-400 font-medium">Here are the solutions I found</span> 
    when the usual help sites came up empty.
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
      {%- for post in collections.posts -%}
      <article class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 border-l-4 border-blue-500 cursor-pointer hover:shadow-lg transform hover:-translate-y-1" onclick="window.location.href='{{ post.url }}'">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              <span class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                {{ post.data.title }}
              </span>
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
              {{ post.templateContent | excerpt }}
            </p>
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
              <time datetime="{{ post.data.date | date: '%Y-%m-%d' }}">{{ post.data.date | date: '%B %d, %Y' }}</time>
              <span class="mx-2">•</span>
              <span>Tech Post</span>
            </div>
          </div>
          <div class="ml-4 flex flex-col items-end">
            <div class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 shadow-sm">
              <span>Read more</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </article>
      {%- endfor -%}
    </div>
  </section>
</div>