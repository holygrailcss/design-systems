const puppeteer = require('puppeteer');
const data = require('./src/_data/global.json');

const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

// Función helper para delays
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureMultipleScreenshots(urls) {
  const browser = await puppeteer.launch({ 
    ignoreHTTPSErrors: true, 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  await page.setUserAgent(userAgent);
  await page.setViewport({ width: 1200, height: 810 });

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      console.log(`\n[${i + 1}/${urls.length}] Capturando: ${url.name}`);
      console.log(`URL: ${url.url}`);

      // Limpiar el nombre del archivo (remover rutas si las hay)
      const cleanName = url.name.replace(/^.*\//, '').replace(/^.*\\/, '');
      const filePath = `./src/assets/static/capturas/${cleanName}`;

      await page.goto(url.url, { 
        waitUntil: ['load', 'domcontentloaded', 'networkidle0'],
        timeout: 30000 
      });

      // Esperar un poco para que la página cargue completamente
      await delay(3000);

      // Manejar cookies si existe el selector
      if (url.cookies) {
        try {
          await page.waitForSelector(url.cookies, { visible: true, timeout: 5000 });
          await page.click(url.cookies);
          await delay(2000);
        } catch (cookieError) {
          console.log(`  ⚠️  No se pudo hacer click en cookies, continuando...`);
        }
      }

      // Scroll para asegurar que la página está cargada
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await delay(1000);
      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });
      await delay(1000);

      // Capturar screenshot
      await page.screenshot({ 
        path: filePath,
        fullPage: false 
      });

      // Obtener descripción si existe
      const descriptionMetaElement = await page.$('meta[name="description"]');
      const descriptionMeta = descriptionMetaElement 
        ? await descriptionMetaElement.getProperty('content').then(prop => prop.jsonValue()) 
        : '';

      console.log(`  ✓ Captura guardada: ${cleanName}`);
      if (descriptionMeta) {
        console.log(`  📝 Descripción: ${descriptionMeta.substring(0, 100)}...`);
      }

      successCount++;

      // Delay entre capturas para no sobrecargar servidores
      if (i < urls.length - 1) {
        await delay(2000);
      }

    } catch (error) {
      errorCount++;
      console.log(`  ✗ Error al capturar ${url.name}: ${error.message}`);
    }
  }

  await browser.close();
  console.log(`\n✅ Proceso completado:`);
  console.log(`   - Exitosas: ${successCount}`);
  console.log(`   - Errores: ${errorCount}`);
  console.log(`   - Total: ${urls.length}`);
}

// Obtener argumentos de línea de comandos
const args = process.argv.slice(2);

// Preparar todos los sistemas disponibles
const allSystems = data.sistemas
  .filter(item => item.imageUrl && item.imageSistema) // Filtrar elementos válidos
  .map((item, index) => {
    // Limpiar el nombre del archivo
    let fileName = item.imageSistema;
    if (fileName.includes('/')) {
      fileName = fileName.split('/').pop();
    }
    if (!fileName.endsWith('.jpg') && !fileName.endsWith('.png')) {
      fileName = fileName + '.jpg';
    }
    
    return {
      index: index + 1,
      url: item.imageUrl,
      name: fileName,
      cookies: item.cookies,
      nombreSistema: item.nombreSistema,
      empresaSistema: item.empresaSistema
    };
  });

// Función para buscar sistemas por nombre, empresa o índice
function findSystems(criteria) {
  const results = [];
  
  for (const criterion of criteria) {
    // Si es un número, buscar por índice
    if (!isNaN(criterion)) {
      const index = parseInt(criterion) - 1;
      if (index >= 0 && index < allSystems.length) {
        results.push(allSystems[index]);
      } else {
        console.log(`⚠️  Índice ${criterion} no válido (rango: 1-${allSystems.length})`);
      }
    } else {
      // Buscar por nombre del sistema, empresa o nombre de archivo
      const found = allSystems.find(system => 
        system.nombreSistema.toLowerCase().includes(criterion.toLowerCase()) ||
        system.empresaSistema.toLowerCase().includes(criterion.toLowerCase()) ||
        system.name.toLowerCase().includes(criterion.toLowerCase())
      );
      
      if (found) {
        results.push(found);
      } else {
        console.log(`⚠️  No se encontró sistema con: "${criterion}"`);
      }
    }
  }
  
  // Eliminar duplicados
  return [...new Map(results.map(item => [item.name, item])).values()];
}

// Determinar qué sistemas capturar
let urlsToCapture;

if (args.length === 0) {
  // Si no hay argumentos, capturar todos
  urlsToCapture = allSystems;
  console.log(`🚀 Iniciando captura de TODOS los ${allSystems.length} design systems...\n`);
} else if (args[0] === '--list' || args[0] === '-l') {
  // Listar todos los sistemas disponibles
  console.log(`\n📋 Sistemas disponibles (${allSystems.length}):\n`);
  allSystems.forEach((system, index) => {
    console.log(`  ${index + 1}. ${system.nombreSistema} (${system.empresaSistema})`);
    console.log(`     Archivo: ${system.name}`);
    console.log(`     URL: ${system.url}\n`);
  });
  process.exit(0);
} else if (args[0] === '--help' || args[0] === '-h') {
  // Mostrar ayuda
  console.log(`
📸 Capturador de Design Systems

Uso:
  npm run img-exporter                    # Capturar todos los sistemas
  npm run img-exporter --list              # Listar todos los sistemas disponibles
  npm run img-exporter adobe google        # Capturar sistemas específicos por nombre
  npm run img-exporter 1 2 3              # Capturar por índice (1, 2, 3)
  npm run img-exporter "Material Design"   # Capturar por nombre exacto

Ejemplos:
  npm run img-exporter adobe              # Captura Adobe Spectrum
  npm run img-exporter 1 5 10             # Captura los sistemas 1, 5 y 10
  npm run img-exporter google ibm         # Captura Google e IBM
  npm run img-exporter --list             # Ver todos los sistemas disponibles
`);
  process.exit(0);
} else {
  // Capturar sistemas específicos
  urlsToCapture = findSystems(args);
  
  if (urlsToCapture.length === 0) {
    console.log(`\n❌ No se encontraron sistemas para capturar.`);
    console.log(`💡 Usa "npm run img-exporter --list" para ver todos los sistemas disponibles.\n`);
    process.exit(1);
  }
  
  console.log(`🚀 Iniciando captura de ${urlsToCapture.length} design system(s) específico(s)...\n`);
  urlsToCapture.forEach((system, index) => {
    console.log(`  ${index + 1}. ${system.nombreSistema} (${system.empresaSistema})`);
  });
  console.log('');
}

captureMultipleScreenshots(urlsToCapture);
