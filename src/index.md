---
layout: layout.njk
title: "SpelkBlog - Home"
---

<!-- Hero Section mit animiertem Gradient -->
<div class="relative overflow-hidden rounded-3xl">
  <!-- Animated Background -->
  <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 animate-gradient-xy rounded-3xl"></div>
  <div class="absolute inset-0 bg-grid-pattern opacity-5 rounded-3xl"></div>
  
  <!-- Floating Elements -->
  <div class="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-float"></div>
  <div class="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-float-delayed"></div>
  <div class="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-500/20 rounded-full blur-xl animate-float-slow"></div>

  <div class="relative z-10 text-center py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Badge -->
      <div class="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-lg">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        Solutions for the Unsolved
      </div>
      
      <!-- Main Headline -->
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight">
        When Google Doesn't Have The Answer
      </h1>
      
      <!-- Subtitle -->
      <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
        We've all been there - your computer does something weird, you search online for hours, but nothing works. 
        <span class="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Here are the solutions I found</span> 
        when the usual help sites came up empty.
      </p>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
        <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ collections.posts.length }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Solutions</div>
        </div>
        <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
          <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">100%</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Tested</div>
        </div>
        <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 col-span-2 sm:col-span-1">
          <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">∞</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Hours Saved</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Posts Section -->
<div class="max-w-6xl mx-auto px-6 lg:px-8 py-16">
  <div class="flex items-center justify-between mb-12">
    <div>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Latest Solutions</h2>
      <p class="text-gray-600 dark:text-gray-400">Fresh fixes for your tech troubles</p>
    </div>
    <div class="hidden sm:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
      <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      <span>Recently updated</span>
    </div>
  </div>
  
  <div class="grid gap-6 lg:gap-8">
    {%- for post in collections.posts -%}
    <article class="group relative overflow-hidden bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
      <!-- Gradient Border Effect -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all duration-300"></div>
      
      <div class="relative p-6 lg:p-8 cursor-pointer" onclick="window.location.href='{{ post.url }}'">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="flex-1 lg:pr-8">
            <!-- Category Badge -->
            <div class="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium mb-4 shadow-sm">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              Tech Solution
            </div>

            <!-- Title -->
            <h3 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-tight">
              {{ post.data.title }}
            </h3>
            
            <!-- Excerpt -->
            <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-2">
              {{ post.templateContent | excerpt }}
            </p>
            
            <!-- Meta Info -->
            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <time datetime="{{ post.data.date | date: '%Y-%m-%d' }}">{{ post.data.date | date: '%B %d, %Y' }}</time>
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {% assign wordcount = post.templateContent | strip_html | number_of_words %}
                {% assign readingtime = wordcount | divided_by: 200 | ceil %}
                {{ readingtime }}m read
              </div>
            </div>
          </div>
          
          <!-- Action Button -->
          <div class="mt-6 lg:mt-0 flex justify-end">
            <div class="group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 group-hover:text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 shadow-sm group-hover:shadow-lg">
              <span class="group-hover:text-white transition-colors duration-200">Read Solution</span>
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </article>
    {%- endfor -%}
  </div>

  <!-- Call to Action -->
  <div class="mt-16 text-center">
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 lg:p-12">
      <h3 class="text-2xl lg:text-3xl font-bold mb-4">Got a tech problem?</h3>
      <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
        If you found a solution to something that's not covered here, or have a tech mystery that needs solving, let's connect!
      </p>
      <a href="/about" class="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors duration-200 shadow-lg">
        Get in Touch
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      </a>
    </div>
  </div>
</div>