const fs = require("fs");
const path = require("path");

const heroes = require("./heroes");
const items = require("./items");
const synergies = require("./synergies");

const baseDir = path.resolve(__dirname, "../../src/assets/");

const heroesResult = heroes.map((hero) => {
  const { v1, lq } = hero;

  return {
    keyword: v1.keyword,
    armor: lq.armor, // 防御
    magicResistance: lq.spellBlock,
    attackDamage: lq.attackData,
    attackMag: lq.attackMag,
    attackRange: lq.attackRange,
    attackSpeed: lq.attackSpeed,
    crit: lq.crit,
    displayName: lq.displayName,
    illustrate: lq.illustrate,
    health: lq.lifeData,
    healthMag: lq.lifeMag,
    mana: lq.magic,
    startMana: lq.startMagic,
    price: lq.price,
    proStatus: lq.proStatus,
    skillDetail: lq.skillDetail,
    skillName: lq.skillName,
    skillType: lq.skillType,
    title: lq.title,
  };
});

const synergiesResult = synergies.map((synergy) => {
  const { v1, lq } = synergy;
  return {
    keyword: v1.keyword,
    heroes: v1.heroes,
    type: v1.type === "origins" ? "origin" : "classType",
    desc: lq.introduce,
    stats: lq.level,
    name: lq.name,
  };
});

const itemsResult = items.map((item) => {
  const { v1, lq } = item;
  return {
    id: v1.id,
    raws: v1.raws,
    name: lq.name,
    keywords: lq.keywords,
    proStatus: lq.proStatus,
    desc: lq.effect,
    attrs: v1.attrs,
    lolqqheroes: heroes
      .filter((d) => d.lq.recEquip.split(",").includes(lq.equipId))
      .map((d) => d.v1.keyword),
    lolchessheroes: heroes
      .filter((d) => d.v1.recommendItems.includes(v1.id))
      .map((d) => d.v1.keyword),
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
