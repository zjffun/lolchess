const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const heroesDetails = require("../src/assets/heroes/details.en.json");

function getKeyword(name) {
  return name.toLowerCase().replace(/ /g, "-");
}

function getInfo(type) {
  return function (dom) {
    // header
    const header = dom.querySelector(".guide-synergy-table__synergy__header");
    const imgURL = header.querySelector("img").src;
    const name = header.querySelector(".align-middle").textContent.trim();
    const keyword = getKeyword(name);

    // content
    const content = dom.querySelector(".guide-synergy-table__synergy__content");
    const heroes = Array.from(
      content
        .querySelector(".guide-synergy-table__synergy__champions")
        .querySelectorAll("img")
    ).map((d) => {
      return heroesDetails.find((heroDetail) => heroDetail.name === d.alt)
        .keyword;
    });
    const descDom = content.querySelector(
      ".guide-synergy-table__synergy__desc"
    );
    const desc = descDom ? descDom.textContent.trim() : "";
    const stats = Array.from(
      content
        .querySelector(".guide-synergy-table__synergy__stats")
        .querySelectorAll("div")
    ).map((d) => d.textContent.trim());

    return {
      imgURL,
      name,
      keyword,
      heroes,
      desc,
      stats,
      type,
    };
  };
}
async function main() {
  const baseDir = path.resolve(__dirname, "../src/assets/synergies");

  const dom = JSDOM.fragment(
    String(fs.readFileSync(path.resolve(__dirname, "./data/synergies.info")))
  );
  const synergies = dom.querySelector(".guide-synergy-table");
  const cols = synergies.querySelectorAll(".col-lg-6");

  const result = [].concat(
    // Origins
    Array.from(cols[0].querySelectorAll(".guide-synergy-table__synergy")).map(
      getInfo("origins")
    ), // Classes
    Array.from(cols[1].querySelectorAll(".guide-synergy-table__synergy")).map(
      getInfo("classes")
    )
  );

  fs.writeFileSync(
    path.resolve(__dirname, "./data/synergies-img-info.json"),
    JSON.stringify(
      result.map((d) => {
        return {
          imgURL: `https:${d.imgURL}`,
          keyword: d.keyword,
        };
      }),
      null,
      2
    )
  );

  fs.writeFileSync(
    path.resolve(baseDir, "infos.en.json"),
    JSON.stringify(
      result.map((d) => {
        return {
          ...d,
          imgURL: undefined,
        };
      }),
      null,
      2
    )
  );
}

main();
