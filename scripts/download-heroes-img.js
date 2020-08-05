const https = require("https");
const fs = require("fs");
const path = require("path");

const heroes = require("./data/heroes-info.json");

async function main() {
  for (const hero of heroes) {
    const filePath = path.resolve(
      __dirname,
      "../src/assets/heroes/imgs",
      `${hero.keyword}.png`
    );

    if (fs.existsSync(filePath)) {
      continue;
    }

    const file = fs.createWriteStream(filePath);
    https.get(hero.imgSrc, function (response) {
      response.pipe(file);
    });

    await new Promise((res) => setTimeout(res, 1000 + Math.random() * 1000));
  }
}

main();
