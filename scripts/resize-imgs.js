const fs = require("fs");
const path = require("path");
const Jimp = require("jimp");

// const baseDir = path.resolve(__dirname, "../src/assets/items/imgs");
const baseDir = path.resolve(__dirname, "../src/assets/heros/imgs");
const imgs = fs.readdirSync(baseDir);

for (const imgName of imgs) {
  let imgPath = path.resolve(baseDir, imgName);
  Jimp.read(imgPath, (err, img) => {
    if (err) throw err;
    img.resize(64, 64).write(imgPath, (err) => {
      if (err) throw err;
    });
  });
}
