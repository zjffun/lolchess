const https = require("https");
const fs = require("fs");
const path = require("path");

const imgs = require("./data/items-img-info.json");

async function main() {
  for (const img of imgs) {
    const file = fs.createWriteStream(
      path.resolve(__dirname, "../src/assets/items", `${img.dest}.png`)
    );
    https.get(img.src, function (response) {
      response.pipe(file);
    });
    await new Promise((res) => setTimeout(res, 100));
  }
}

main();
