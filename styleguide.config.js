module.exports = {
  sections: [
    // {
    //   name: 'React Style Guide Example',
    //   components: 'app/components/**/index.jsx'
    // },
    {
      name: 'Dictionary instruction',
      content: 'app/components/Dictionary/instruction.md'
    }
  ],
  webpackConfig: require("./internals/webpack/webpack.styleguide.js")
};
