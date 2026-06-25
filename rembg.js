const { Jimp } = require('jimp');

const THRESHOLD = 40;

async function removeBg() {
  const img = await Jimp.fromFile('./assets/Papel-v1.png');
  const { width, height } = img.bitmap;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = img.bitmap.data[idx];
      const g = img.bitmap.data[idx + 1];
      const b = img.bitmap.data[idx + 2];
      if (r > 255 - THRESHOLD && g > 255 - THRESHOLD && b > 255 - THRESHOLD) {
        img.bitmap.data[idx + 3] = 0;
      }
    }
  }

  await img.write('./assets/Papel-v1.png');
  console.log('Fondo removido: assets/Papel-v1.png');
}

removeBg().catch(console.error);
