# Design Systems - Sitio Web

Sitio web sobre Design Systems construido con [Eleventy](https://www.11ty.dev/), [Nunjucks](https://mozilla.github.io/nunjucks/) y Markdown.

## 🚀 Características

- **Generador de Sitios Estáticos**: Eleventy (11ty) para un rendimiento óptimo
- **Templates**: Nunjucks para plantillas flexibles y reutilizables
- **Estilos**: SCSS compilado con Sass
- **Markdown**: Soporte completo para contenido en Markdown con resaltado de sintaxis
- **Optimización de Imágenes**: Integración con Eleventy Image para optimización automática
- **SEO**: Meta tags optimizados y Open Graph
- **Responsive**: Diseño completamente responsive

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd design-systems
```

2. Instala las dependencias:
```bash
npm install
```

## 📝 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo con hot-reload
- `npm run build` - Construye el sitio para producción
- `npm run build:eleventy` - Solo construye con Eleventy
- `npm run build:sass` - Solo compila los estilos SCSS
- `npm run watch:eleventy` - Observa cambios en Eleventy
- `npm run watch:sass` - Observa cambios en SCSS
- `npm run debug` - Ejecuta Eleventy en modo debug
- `npm run img-exporter` - Exporta imágenes

## 📁 Estructura del Proyecto

```
design-systems/
├── public/              # Salida generada (no editar directamente)
├── src/                 # Código fuente
│   ├── _data/           # Datos globales (JSON)
│   ├── _includes/       # Plantillas Nunjucks
│   │   ├── components/  # Componentes reutilizables
│   │   └── base.njk     # Plantilla base
│   ├── assets/          # Recursos estáticos
│   │   ├── css/         # CSS compilado
│   │   ├── sass/        # Archivos SCSS fuente
│   │   ├── js/          # JavaScript
│   │   └── static/      # Imágenes y otros recursos
│   ├── blog/            # Posts del blog (Markdown)
│   ├── cursos/          # Cursos (Markdown)
│   ├── legal/           # Páginas legales
│   └── pages/           # Páginas principales
├── .eleventy.js         # Configuración de Eleventy
├── package.json         # Dependencias y scripts
└── README.md            # Este archivo
```

## 🎨 Personalización

### Configuración Global

Edita `src/_data/global.json` para personalizar:
- Información de la empresa
- Colores del tema
- URLs y enlaces sociales
- Configuración de Google Tag Manager
- Y más...

### Estilos

Los estilos están en `src/assets/sass/`. El archivo principal es `style.scss`.

### Plantillas

Las plantillas están en `src/_includes/`. El archivo base es `base.njk`.

## 📚 Filtros Disponibles

Eleventy incluye varios filtros útiles:

- `postDate` - Formatea fechas en español
- `isoDate` - Formatea fechas en formato ISO
- `relativeDate` - Muestra fechas relativas (hace 2 días)
- `truncate` - Trunca texto a un número de caracteres
- `slugify` - Convierte texto en slug para URLs
- `readingTime` - Calcula tiempo de lectura estimado
- `nextInCollection` - Obtiene el siguiente elemento en una colección
- `prevInCollection` - Obtiene el anterior elemento en una colección

## 🌐 Despliegue

El sitio puede desplegarse en cualquier servicio de hosting estático:

- **Netlify**: Conecta tu repositorio y configura el build command: `npm run build`
- **Vercel**: Similar a Netlify, configura el build command
- **GitHub Pages**: Usa GitHub Actions para construir y desplegar
- **Otros**: Cualquier servicio que soporte sitios estáticos

## 📄 Licencia

ISC

## 👤 Autor

Manuel Ruiz - [digitalstrategy.es](https://digitalstrategy.es)

## 🔗 Enlaces Útiles

- [Documentación de Eleventy](https://www.11ty.dev/docs/)
- [Documentación de Nunjucks](https://mozilla.github.io/nunjucks/)
- [Sass Documentation](https://sass-lang.com/documentation)

---

**Nota**: Este proyecto está basado en una plantilla de Eleventy con Nunjucks y ha sido mejorado para el sitio web de Design Systems.



predix rivet mailchimp sainsburys pulse mesosphere