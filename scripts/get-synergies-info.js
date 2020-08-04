const https = require("https");
const fs = require("fs");
const path = require("path");

const URL = "https://lolchess.gg/synergies";

async function main() {
  const filePath = path.resolve(__dirname, "./data/synergies.info");
  const file = fs.createWriteStream(filePath);
  https.get(URL, function (response) {
    response.pipe(file);
  });
}

main();
