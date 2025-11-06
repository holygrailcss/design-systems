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

  // Filtro para formatear fechas en español
  eleventyConfig.addFilter("postDate", (dateObj) => {
    if (!dateObj) return "";
    const dt = DateTime.fromJSDate(dateObj);
    return dt.setLocale("es").toLocaleString(DateTime.DATE_MED);
  });

  // Filtro para formatear fechas ISO
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj).toISODate();
  });

  // Filtro para formatear fechas relativas
  eleventyConfig.addFilter("relativeDate", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj).setLocale("es").toRelative();
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

  // Filtro para invertir palabras/caracteres (usado en contacta)
  eleventyConfig.addFilter("reverseWords", function (value) {
    if (typeof value === "string") {
      return value.split("").reverse().join("");
    }
    return value;
  });

  // Filtro para truncar texto
  eleventyConfig.addFilter("truncate", function (str, length = 50) {
    if (typeof str !== "string") return str;
    if (str.length <= length) return str;
    return str.substring(0, length) + "...";
  });

  // Filtro para limpiar URLs
  eleventyConfig.addFilter("slugify", function (str) {
    if (typeof str !== "string") return str;
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  });

  // Filtro para leer más tiempo estimado
  eleventyConfig.addFilter("readingTime", function (content) {
    if (!content) return "1 min";
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
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
    formats: ["webp", "avif", "jpeg"],
    urlPath: "/assets/static/",
    outputDir: "public/assets/static/",
    widths: [400, 800, 1200, 1600],
    sharpOptions: {
      quality: 85,
    },
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  // Configuración de Markdown para mejorar la salida
  eleventyConfig.addFilter("markdownify", function (str) {
    if (!str) return "";
    const md = markdownIt(mdOptions);
    return md.render(str);
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
