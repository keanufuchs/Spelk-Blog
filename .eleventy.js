module.exports = function(eleventyConfig) {
  // passt statische assets so, dass sie in _site/ kopiert werden
  eleventyConfig.addPassthroughCopy({"src/assets": "assets"});
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    passthroughFileCopy: true
  };
};
