const fs = require('fs');
const path = require('path');
const packageJsonPath = './package.json';

function checkDistFolder(distDir) {
  if (!fs.existsSync(distDir)) {
    console.error('\x1b[31mError: ./dist directory not found!\x1b[0m');
    console.log('\x1b[33mPlease run:\x1b[0m');
    console.log('\x1b[36mnpm run build\x1b[0m');
    console.log('\x1b[33mto generate the dist folder before running this script.\x1b[0m');
    process.exit(1);
  }

  // Check if dist folder is empty
  const files = fs.readdirSync(distDir);
  if (files.length === 0) {
    console.error('\x1b[31mError: ./dist directory is empty!\x1b[0m');
    console.log('\x1b[33mPlease run:\x1b[0m');
    console.log('\x1b[36mnpm run build\x1b[0m');
    console.log('\x1b[33mto generate the build files.\x1b[0m');
    process.exit(1);
  }
}

function generateExports(distDir) {
  const exports = {};

  function getUniqueFiles(files) {
    return [...new Set(files.map(file => path.basename(file, path.extname(file))))];
  }

  function findMatchingFiles(dir, baseName) {
    const jsFile = `${baseName}.js`;
    const dtsFile = `${baseName}.d.ts`;
    
    if (fs.existsSync(path.join(dir, jsFile)) && fs.existsSync(path.join(dir, dtsFile))) {
      return {
        types: `./${path.join('dist', path.relative(distDir, dir), dtsFile).replace(/\\/g, '/')}`,
        default: `./${path.join('dist', path.relative(distDir, dir), jsFile).replace(/\\/g, '/')}`,

      };
    }
    return null;
  }

  function processDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);
    
    const files = items.filter(item => {
      const itemPath = path.join(dirPath, item);
      return fs.statSync(itemPath).isFile();
    });

    const uniqueFiles = getUniqueFiles(files);

    uniqueFiles.forEach(baseFile => {
      const matchingFiles = findMatchingFiles(dirPath, baseFile);
      
      if (matchingFiles) {
        const relativePath = path.relative(distDir, dirPath);
        const exportPath = `./${path.join(relativePath, baseFile).replace(/\\/g, '/')}`;
        exports[exportPath] = matchingFiles;
      }
    });

    items
      .filter(item => fs.statSync(path.join(dirPath, item)).isDirectory())
      .forEach(dir => processDirectory(path.join(dirPath, dir)));
  }

  processDirectory(distDir);
  
  // Check if any exports were generated
  if (Object.keys(exports).length === 0) {
    console.warn('\x1b[33mWarning: No matching .js and .d.ts files found in the dist folder.\x1b[0m');
    console.log('\x1b[33mMake sure your build process generates both .js and .d.ts files.\x1b[0m');
    process.exit(1);
  }

  return exports;
}

function updatePackageJson(exports) {
  try {
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json not found in the current directory');
    }

    const packageJsonData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    packageJsonData.exports = exports;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonData, null, 2));
    console.log('\x1b[32mPackage.json updated successfully!\x1b[0m');
    console.log('\nGenerated exports:', JSON.stringify(exports, null, 2));
  } catch (error) {
    console.error('\x1b[31mError updating package.json:', error.message, '\x1b[0m');
    process.exit(1);
  }
}

try {
  const distDir = './dist';
  
  // Check dist folder before proceeding
  checkDistFolder(distDir);
  
  // Generate and update exports
  const generatedExports = generateExports(distDir);
  updatePackageJson(generatedExports);
} catch (error) {
  console.error('\x1b[31mUnexpected error:', error.message, '\x1b[0m');
  process.exit(1);
}