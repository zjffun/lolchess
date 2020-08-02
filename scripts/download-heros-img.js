const https = require("https");
const fs = require("fs");
const path = require("path");

const heros = require("./data/heros-info.json");

async function main() {
  for (const hero of heros) {
    const file = fs.createWriteStream(
      path.resolve(__dirname, "../src/assets/heros/imgs", `${hero.keyword}.png`)
    );
    https.get(hero.imgSrc, function (response) {
      response.pipe(file);
    });
    await new Promise((res) => setTimeout(res, 1000 + Math.random() * 1000));
  }
}

main();
