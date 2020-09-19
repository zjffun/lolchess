const fs = require("fs");
const path = require("path");

const heroes = require("./heroes");
const items = require("./items");
const synergies = require("./synergies");

const baseDir = path.resolve(__dirname, "../../src/assets/");

const heroesResult = heroes.map((hero) => {
  return {
    keyword: hero.TFTID,
    armor: hero.armor, // 防御
    magicResistance: hero.spellBlock,
    attackDamage: hero.attackData,
    attackMag: hero.attackMag,
    attackRange: hero.attackRange,
    attackSpeed: hero.attackSpeed,
    crit: hero.crit,
    displayName: hero.displayName,
    illustrate: hero.illustrate,
    health: hero.lifeData,
    healthMag: hero.lifeMag,
    mana: hero.magic,
    startMana: hero.startMagic,
    price: hero.price,
    proStatus: hero.proStatus,
    skillDetail: hero.skillDetail,
    skillName: hero.skillName,
    skillType: hero.skillType,
    title: hero.title,
    imageURL: `https://game.gtimg.cn/images/lol/act/img/tft/champions/${hero.TFTID}.png`,
    skillImage: hero.skillImage,
  };
});

const synergiesResult = synergies.map((synergy) => {
  return {
    keyword: synergy.id,
    heroes: heroes
      .filter(
        (hero) =>
          hero.jobIds.split(",").includes(synergy.jobId) ||
          hero.raceIds.split(",").includes(synergy.raceId)
      )
      .map((d) => d.TFTID),
    type: synergy.type,
    desc: synergy.introduce,
    stats: synergy.level,
    name: synergy.name,
    imageURL: synergy.imagePath,
  };
});

const itemsResult = items.map((item) => {
  return {
    id: item.id,
    raws: item.raws,
    name: item.name,
    keywords: item.keywords,
    proStatus: item.proStatus,
    desc: item.effect,
    lolqqheroes: heroes
      .filter((d) => d.recEquip.split(",").includes(item.equipId))
      .map((d) => d.TFTID),
    imageURL: item.imagePath,
  };
});

fs.writeFileSync(
  path.resolve(baseDir, "heroes.zh-CN.json"),
  JSON.stringify(heroesResult, null, 2)
);

fs.writeFileSync(
  path.resolve(baseDir, "synergies.zh-CN.json"),
  JSON.stringify(synergiesResult, null, 2)
);

fs.writeFileSync(
  path.resolve(baseDir, "items.zh-CN.json"),
  JSON.stringify(itemsResult, null, 2)
);
