const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

function getRaws(id) {
  const raw = [];

  let cur = 1;
  while (id > 0) {
    let num = id & 3;
    for (let i = 0; i < num; i++) {
      raw.push(cur);
    }
    id = id >> 2;
    cur = cur << 2;
  }

  return raw;
}

async function main() {
  const baseDir = path.resolve(__dirname, "../src/assets/items");
  const rowInfoBaseDir = path.resolve(baseDir, "infos");
  const rowInfos = fs
    .readdirSync(rowInfoBaseDir)
    .sort((a, b) => (a > b ? 1 : -1));

  const result = [];

  for (const rowInfoName of rowInfos) {
    const rowInfoPath = path.resolve(rowInfoBaseDir, rowInfoName);
    const dom = JSDOM.fragment(String(fs.readFileSync(rowInfoPath)));
    const p = dom.firstElementChild.querySelector("p");
    const divs = dom.firstElementChild.querySelectorAll("div");
    const id = rowInfoName.split(".")[0];

    let info = {
      id: +id,
      name: p.innerHTML.trim(),
      raws: getRaws(id),
    };

    if (divs.length <= 2) {
      Object.assign(info, {
        desc: "",
        attrs: [divs[0].innerHTML.trim()],
      });
    } else {
      Object.assign(info, {
        desc: divs[0].innerHTML.trim(),
        attrs: Array.from(divs[1].children).map((d) => d.innerHTML.trim()),
      });
    }

    result.push(info);
  }

  fs.writeFileSync(
    path.resolve(baseDir, "infos.en.json"),
    JSON.stringify(result, null, 2)
  );
}

main();
