#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const categoryMap = {
  images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'],
  documents: ['doc', 'docx', 'pdf', 'txt', 'xls', 'xlsx', 'ppt', 'pptx', 'md', 'rtf'],
  audio: ['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a'],
  video: ['mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv', 'webm'],
  archives: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'],
  code: ['js', 'ts', 'py', 'java', 'c', 'cpp', 'cs', 'rb', 'go', 'php', 'html', 'css'],
};

function getExtension(filename) {
  const ext = path.extname(filename || '').slice(1).toLowerCase();
  return ext;
}

function getCategory(ext) {
  for (const [cat, exts] of Object.entries(categoryMap)) {
    if (exts.includes(ext)) {
      return cat;
    }
  }
  return 'others';
}

function extractPattern(filename) {
  // Remove extension
  const base = filename.split('.')[0];
  // Split by common delimiters and take first significant part
  const parts = base.split(/[_\-\s]+/);
  // Return first part if it's meaningful (not too short, not dates)
  if (parts[0] && parts[0].length > 2 && !/^\d{4}$/.test(parts[0])) {
    return parts[0];
  }
  return null;
}


function ensureDirExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function moveFile(src, dest, dryRun) {
  if (dryRun) {
    console.log(`[dry run] Move: ${src} -> ${dest}`);
    return;
  }

  const finalDest = dest;
  if (!fs.existsSync(finalDest)) {
    fs.mkdirSync(path.dirname(finalDest), { recursive: true });
  }

  fs.renameSync(src, finalDest);
  console.log(`Moved: ${src} -> ${finalDest}`);
}

function hasFiles(dirPath) {
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    return entries.some(entry => entry.isFile());
  } catch {
    return false;
  }
}

function scanAndOrganize(directory, options) {
  const { dryRun, recursive, skipPopulated } = options;
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === options.destinationFolder) continue;
      
      // Skip folders that already contain files if flag is set
      if (skipPopulated && hasFiles(fullPath)) {
        console.log(`Skipped: ${fullPath} (already contains files)`);
        continue;
      }
      
      if (recursive) {
        scanAndOrganize(fullPath, options);
      }
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const ext = getExtension(entry.name);
    const category = getCategory(ext);
    const targetDir = path.join(directory, options.destinationFolder, category);
    const targetPath = path.join(targetDir, entry.name);

    ensureDirExists(targetDir);
    moveFile(fullPath, targetPath, dryRun);
  }
}

function printUsage() {
  console.log('Usage: node organizer.js <source_directory> [--recursive] [--dry-run] [--dest <folder>] [--skip-populated]');
  console.log('  --recursive       : scan subdirectories recursively (default: disabled)');
  console.log('  --dry-run         : show operations without moving files');
  console.log('  --dest <name>     : output folder name under source dir (default: organized)');
  console.log('  --skip-populated  : skip folders that already contain files (default: disabled)');
}

function parseArgs(args) {
  if (args.length < 1) {
    printUsage();
    process.exit(1);
  }

  const options = {
    source: args[0],
    recursive: false,
    dryRun: false,
    skipPopulated: false,
    destinationFolder: 'organized',
  };

  let i = 1;
  while (i < args.length) {
    const arg = args[i];
    if (arg === '--recursive') {
      options.recursive = true;
      i += 1;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
      i += 1;
    } else if (arg === '--skip-populated') {
      options.skipPopulated = true;
      i += 1;
    } else if (arg === '--dest') {
      if (i + 1 >= args.length) {
        console.error('Missing value for --dest');
        printUsage();
        process.exit(1);
      }
      options.destinationFolder = args[i + 1];
      i += 2;
    } else {
      console.error(`Unknown option: ${arg}`);
      printUsage();
      process.exit(1);
    }
  }

  return options;
}

function main() {
  const options = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(options.source) || !fs.lstatSync(options.source).isDirectory()) {
    console.error(`Source directory does not exist or is not a directory: ${options.source}`);
    process.exit(1);
  }

  console.log(`Scanning: ${options.source}`);
  console.log(`Destination folder: ${options.destinationFolder}`);
  console.log(`Recursive: ${options.recursive}`);
  console.log(`Dry run: ${options.dryRun}`);

  scanAndOrganize(options.source, options);

  console.log('Done.');
}

if (require.main === module) {
  main();
}
