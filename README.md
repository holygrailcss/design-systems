# Parcel Static Boilerplate

Static site generator

## Development

1. **Clone** or [download](https://github.com/.....zip) this repository.

   ```
   git clone https://github.com/.....zip
   ```

2. **Install** dependencies.

   ```
   npm install
   ```

3. **Run** dev mode. It will open a browser tab with the dev url [`http://localhost:1234/`](http://localhost:1234/).

   ```
   npm run start
   ```

## Production build

Run the build script and the optimized for production website will be generated in the `/dist` folder.

```
npm run build
```

## Serve production build locally

If you want to serve your production build (the generated `/dist` folder) locally just run this command and open [`http://localhost:5000/`](http://localhost:5000/) in your browser. This command runs the `npm run build` command before serving the `/dist` folder.

```
npm run serve
```


## Habilita emmet en este archivo


 "emmet.includeLanguages": {
    "nunjucks": "html"
  }

## Tech stack

- [Parcel](https://parceljs.org/)
- [Babel](https://babeljs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Sass](https://sass-lang.com/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Stylelint](https://stylelint.io/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)
- [Imagemin](https://github.com/imagemin/imagemin)

## To do

- [ ] Detail all features: linting, formatting, building, etc.
- [ ] Add all available commands.
- [ ] Explain why there are two `/static` folders.
- [ ] Warn against how Parcel treats the `site.webmanifest` file.
- [ ] Explain how to config Imagemin.
- [ ] Explain how to config Nunjucks.
- [ ] Find a good Nunjucks code editor formatter.
- [ ] Add recommended extensions for development.
- [ ] Add testing setup with Jest?
