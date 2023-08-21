module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: 'blog',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
  };
};
