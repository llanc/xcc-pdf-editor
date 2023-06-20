const scripts = [
  {
    name: 'pdfjsLib',
    src: '/pdf.min.js',
  },
  {
    name: 'PDFLib',
    src: '/pdf-lib.min.js',
  },
  {
    name: 'download',
    src: '/download.min.js',
  },
  { name: 'makeTextPDF',
    src: '/makeTextPDF.js'
  },
];

const assets = {};
export function getAsset(name) {
  if (assets[name]) return assets[name];
  const script = scripts.find((s) => s.name === name);
  if (!script) throw new Error(`Script ${name} not exists.`);
  return prepareAsset(script);
}

export function prepareAsset({ name, src }) {
  if (assets[name]) return assets[name];
  assets[name] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(window[name]);
      console.log(`${name} is loaded.`);
    };
    script.onerror = () => {
      reject(`The script ${name} didn't load correctly.`);
      alert(`Some scripts did not load correctly. Please reload and try again.`)
    };
    document.body.appendChild(script);
  });
  return assets[name];
}

export default function prepareAssets() {
  scripts.forEach(prepareAsset);
}

// out of the box fonts
const fonts = {
  // Courier: {
  //   correction(size, lineHeight) {
  //     return (size * lineHeight - size) / 2 + size / 6;
  //   },
  // },
  // Helvetica: {
  //   correction(size, lineHeight) {
  //     return (size * lineHeight - size) / 2 + size / 10;
  //   },
  // },
  'Times-Roman': {
    correction(size, lineHeight) {
      return (size * lineHeight - size) / 2 + size / 7;
    },
  },
};
// Available fonts
export const Fonts = {
  ...fonts,
  '宋体': {
    correction(size, lineHeight) {
      return (size * lineHeight - size) / 2 + size / 7;
    },
    src: '/fonts/宋体.ttf',
  },
  '微软雅黑': {
    correction(size, lineHeight) {
      return (size * lineHeight - size) / 2 + size / 7;
    },
    src: '/fonts/微软雅黑.ttf',
  },
  '方正小标宋简': {
    correction(size, lineHeight) {
      return (size * lineHeight - size) / 2 + size / 7;
    },
    src: '/fonts/方正小标宋简.ttf',
  },
  '楷体': {
    correction(size, lineHeight) {
      return (size * lineHeight - size) / 2 + size / 7;
    },
    src: '/fonts/楷体.ttf',
  },
  '等线': {
    correction(size, lineHeight) {
      return (size * lineHeight - size) / 2 + size / 7;
    },
    src: '/fonts/等线.ttf',
  },
  '黑体': {
    correction(size, lineHeight) {
      return (size * lineHeight - size) / 2 + size / 7;
    },
    src: '/fonts/黑体.ttf',
  },
};

export function fetchFont(name) {
  if (fonts[name]) return fonts[name];
  const font = Fonts[name];
  if (!font) throw new Error(`Font '${name}' not exists.`);
  fonts[name] = fetch(font.src)
    .then((r) => r.arrayBuffer())
    .then((fontBuffer) => {
      const fontFace = new FontFace(name, fontBuffer);
      fontFace.display = 'swap';
      fontFace.load().then(() => document.fonts.add(fontFace));
      return {
        ...font,
        buffer: fontBuffer,
      };
    });
  return fonts[name];
}