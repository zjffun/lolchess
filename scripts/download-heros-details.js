const https = require("https");
const fs = require("fs");
const path = require("path");

const infos = require("./data/heros-info.json");
const baseURL = "https://lolchess.gg/champions/set3.5";

async function main() {
  for (const info of infos) {
    const filePath = path.resolve(
      __dirname,
      "../src/assets/heros/details",
      `${info.keyword}.en.detail`
    );

    if (fs.existsSync(filePath)) {
      continue;
    }

    const file = fs.createWriteStream(filePath);
    https.get(`${baseURL}/${info.keyword}`, function (response) {
      response.pipe(file);
    });

    await new Promise((res) => setTimeout(res, 1000 + Math.random() * 1000));
  }
}

main();
