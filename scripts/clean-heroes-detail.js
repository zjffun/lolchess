const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const itemsImgInfo = require("./data/items-img-info.json");

function handleSlashSparatedValue(str) {
  return str
    .trim()
    .split("/")
    .map((d) => parseInt(d.trim()));
}

function trimAll(str) {
  return str.replace(/\s/g, "");
}

async function main() {
  const baseDir = path.resolve(__dirname, "../src/assets/heroes");
  const rowDetailsBaseDir = path.resolve(baseDir, "details");
  const rowInfos = fs
    .readdirSync(rowDetailsBaseDir)
    .sort((a, b) => (a > b ? 1 : -1));

  const result = [];

  for (const rowDetailName of rowInfos) {
    console.log(rowDetailName);

    const rowDetailPath = path.resolve(rowDetailsBaseDir, rowDetailName);
    const dom = JSDOM.fragment(String(fs.readFileSync(rowDetailPath)));

    // rm needless DOMs
    Array.from(dom.querySelectorAll(".d-lg-none")).forEach((d) => {
      d.parentNode.removeChild(d);
    });

    const detailDom = dom.querySelector(".guide-champion-detail");
    const headerDom = detailDom.querySelector(".guide-champion-detail__header");
    const statsDoms = detailDom.querySelectorAll(
      ".guide-champion-detail__stats .guide-champion-detail__stats__value"
    );
    const baseStatsDoms = detailDom.querySelectorAll(
      ".guide-champion-detail__base-stats .guide-champion-detail__base-stat__value"
    );
    const skillDom = detailDom.querySelector(".guide-champion-detail__skill");
    const synergiesDom = detailDom.querySelector(
      ".guide-champion-detail__synergies"
    );
    const recommendItemsDoms = detailDom.querySelectorAll(
      ".guide-champion-detail__recommend-items img"
    );

    const keyword = rowDetailName.split(".")[0];

    let detail = {
      keyword,
      name: headerDom
        .querySelector(".guide-champion-detail__name")
        .innerHTML.trim(),
      cost: statsDoms[0].childNodes[2].textContent.trim(),
      prise: statsDoms[0].querySelector(".d-inline-block").textContent.trim(),
      originAndClass: [
        statsDoms[1].textContent.trim(),
        ...Array.from(statsDoms[2].querySelectorAll("img")).map(
          (img) => img.alt
        ),
      ],
      health: handleSlashSparatedValue(baseStatsDoms[0].textContent),
      attachDamage: handleSlashSparatedValue(baseStatsDoms[1].textContent),
      dps: handleSlashSparatedValue(baseStatsDoms[2].textContent),
      attackRange: +baseStatsDoms[3].querySelector("img").src.substr(-5, 1),
      attackSpeed: trimAll(baseStatsDoms[4].textContent),
      armor: baseStatsDoms[5].textContent.trim(),
      magicalResistance: baseStatsDoms[6].textContent.trim(),

      skillName: skillDom.querySelector("strong").textContent.trim(),
      skillType: skillDom
        .querySelectorAll("div.text-gray span")[0]
        .textContent.trim(),
      skillMana: skillDom
        .querySelectorAll("div.text-gray span")[2]
        .textContent.trim(),
      skillDesc: skillDom.querySelector("span.d-block").textContent.trim(),
      skillStats: Array.from(
        skillDom.querySelectorAll("div.guide-champion-detail__skill__stats div")
      ).map((d) => trimAll(d.textContent)),

      recommendItems: Array.from(recommendItemsDoms).map((img) => {
        let info = itemsImgInfo.find(
          (item) => path.basename(item.src) === path.basename(img.src)
        );
        return info ? info.dest : null;
      }),
    };

    // if (divs.length <= 2) {
    //   Object.assign(detail, {
    //     desc: "",
    //     attrs: [divs[0].innerHTML.trim()],
    //   });
    // } else {
    //   Object.assign(detail, {
    //     desc: divs[0].innerHTML.trim(),
    //     attrs: Array.from(divs[1].children).map((d) => d.innerHTML.trim()),
    //   });
    // }

    result.push(detail);
  }

  fs.writeFileSync(
    path.resolve(baseDir, "details.en.json"),
    JSON.stringify(result, null, 2)
  );
}

main();
