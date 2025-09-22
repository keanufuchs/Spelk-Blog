module.exports = function(eleventyConfig) {
  // passt statische assets so, dass sie in _site/ kopiert werden
  eleventyConfig.addPassthroughCopy({"src/assets": "assets"});
  
  // Posts Collection erstellen
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      return new Date(b.data.date) - new Date(a.data.date); // Neueste zuerst
    });
  });
  
  // Excerpt Filter hinzufügen
  eleventyConfig.addFilter("excerpt", function(content) {
    // Entferne Front Matter und Markdown-Syntax für cleanen Text
    let text = content;
    
    // Entferne Headings (# ## ###)
    text = text.replace(/^#{1,6}\s+.*/gm, '');
    
    // Entferne Code-Blöcke
    text = text.replace(/```[\s\S]*?```/g, '');
    
    // Entferne Inline-Code
    text = text.replace(/`[^`]*`/g, '');
    
    // Entferne Bilder
    text = text.replace(/!\[.*?\]\(.*?\)/g, '');
    
    // Entferne Links aber behalte Text
    text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
    
    // Entferne Bold/Italic Markdown
    text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
    text = text.replace(/\*([^*]+)\*/g, '$1');
    
    // Entferne Blockquotes
    text = text.replace(/^>\s+.*/gm, '');
    
    // Entferne mehrfache Leerzeichen und Newlines
    text = text.replace(/\s+/g, ' ').trim();
    
    // Extrahiere erste ~200 Zeichen und füge ... hinzu
    if (text.length > 200) {
      text = text.substring(0, 200).trim() + '...';
    }
    
    return text;
  });
  
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    passthroughFileCopy: true
  };
};
