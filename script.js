const categoryMap = {
  images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'],
  documents: ['doc', 'docx', 'pdf', 'txt', 'xls', 'xlsx', 'ppt', 'pptx', 'md', 'rtf'],
  audio: ['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a'],
  video: ['mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv', 'webm'],
  archives: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'],
  code: ['js', 'ts', 'py', 'java', 'c', 'cpp', 'cs', 'rb', 'go', 'php', 'html', 'css'],
};

function getExtension(fileName) {
  const dotIndex = fileName.lastIndexOf('.');
  if (dotIndex < 0 || dotIndex === fileName.length - 1) return '';
  return fileName.slice(dotIndex + 1).toLowerCase();
}

function getCategory(extension) {
  for (const [category, extensions] of Object.entries(categoryMap)) {
    if (extensions.includes(extension)) {
      return category;
    }
  }
  return 'others';
}

function organizeFiles(fileNames) {
  const groups = {
    images: [],
    documents: [],
    audio: [],
    video: [],
    archives: [],
    code: [],
    others: [],
  };

  const cleaned = fileNames
    .map(name => name.trim())
    .filter(Boolean);

  cleaned.forEach(name => {
    const ext = getExtension(name);
    const category = getCategory(ext);
    groups[category].push(name);
  });

  return { cleaned, groups };
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

function groupByPattern(files) {
  const groups = {};
  files.forEach(f => {
    const pattern = extractPattern(f);
    if (pattern) {
      if (!groups[pattern]) groups[pattern] = [];
      groups[pattern].push(f);
    }
  });
  return groups;
}

function renderResult(data) {
  const resultArea = document.getElementById('resultArea');
  if (data.cleaned.length === 0) {
    resultArea.textContent = 'No files entered yet.';
    return;
  }

  let output = `Organized ${data.cleaned.length} file(s)\n\n`;
  for (const [category, files] of Object.entries(data.groups)) {
    output += `${category.toUpperCase()} (${files.length})\n`;
    
    // For documents, show sub-grouping by pattern
    if (category === 'documents' && files.length > 0) {
      const patterns = groupByPattern(files);
      if (Object.keys(patterns).length > 1 || (Object.keys(patterns).length === 1 && patterns[Object.keys(patterns)[0]].length > 1)) {
        for (const [pattern, docs] of Object.entries(patterns)) {
          output += `  /${pattern}/ (${docs.length})\n`;
          output += docs.map(f => `    - ${f}`).join('\n') + '\n';
        }
      } else {
        output += files.length ? files.map(f => ` - ${f}`).join('\n') : ' - (none)';
        output += '\n';
      }
    } else {
      output += files.length ? files.map(f => ` - ${f}`).join('\n') : ' - (none)';
      output += '\n';
    }
    output += '\n';
  }

  output += 'Tip: Use the Node CLI (`organizer.js`) for real file operations.';
  resultArea.textContent = output;
}

document.getElementById('runButton').addEventListener('click', () => {
  const fileList = document.getElementById('fileList').value;
  const fileNames = fileList.split(',');
  const result = organizeFiles(fileNames);
  renderResult(result);
});

