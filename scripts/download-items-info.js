const https = require("https");
const fs = require("fs");
const path = require("path");

const infos = require("./data/items-info-info.json");

async function main() {
  for (const info of infos) {
    const file = fs.createWriteStream(
      path.resolve(__dirname, "../src/assets/items/infos", `${info.dest}.en.info`)
    );
    https.get(info.src, function (response) {
      response.pipe(file);
    });
    await new Promise((res) => setTimeout(res, 1000 + Math.random() * 1000));
  }
}

main();
