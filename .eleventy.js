const { DateTime } = require("luxon");
const pluginTOC = require("eleventy-plugin-toc");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItHighlightJS = require("markdown-it-highlightjs");
const embeds = require("eleventy-plugin-embed-everything");

const eleventyWebcPlugin = require("@11ty/eleventy-plugin-webc");
const { eleventyImagePlugin } = require("@11ty/eleventy-img");

const mdOptions = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
};

const mdAnchorOpts = {
  level: [1, 2, 3, 4],
  permalink: markdownItAnchor.permalink.linkInsideHeader({
    symbol: '#',
    class: 'anchor-link',
    placement: 'before', // Opción para ubicar el enlace antes o después del encabezado
  }),
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css/style.css");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("src/pages", "pages");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addPairedShortcode("myShortcode", function (content) {
    return `<div class="is-flex full-container-blog content-center">${content}</div>`;
  });

  eleventyConfig.addShortcode("br", function () {
    return `<br>`;
  });

  eleventyConfig.addShortcode("br2", function () {
    return `<br><br>`;
  });

  eleventyConfig.addShortcode("br3", function () {
    return `<br><br><br>`;
  });

  eleventyConfig.addPlugin(embeds);

  eleventyConfig.setLibrary(
    "md",
    markdownIt(mdOptions)
      .use(markdownItAnchor, mdAnchorOpts)
      .use(markdownItHighlightJS)
  );

  eleventyConfig.addPlugin(pluginTOC);

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  function getIndex(collection, currentSlug) {
    return collection.findIndex((page) => page.fileSlug === currentSlug);
  }

  eleventyConfig.addFilter("nextInCollection", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index == currentIndex + 1 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });

  eleventyConfig.addFilter("prevInCollection", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index == currentIndex - 1 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });

  eleventyConfig.addFilter("reverseWords", function (value) {
    if (typeof value === "string") {
      return value.split("").reverse().join("");
    }
    return value;
  });

  // WebC
  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: [
      // Agrega como componente global de WebC
      "npm:@11ty/eleventy-img/*.webc",
    ],
  });

  eleventyConfig.addPlugin(eleventyImagePlugin, {
    // Opciones globales predeterminadas
    formats: ["webp"],
    urlPath: "/assets/static/",
    outputDir: "public/assets/static/",

    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  return {
    dir: {
      data: "_data",
      input: "src",
      output: "public",
    },
    passthroughFileCopy: true,
  };
};
