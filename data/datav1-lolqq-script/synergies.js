const v1Data = require("../datav1/synergies.en.json");
const { data: lqJobData } = require("../lolqq/job.json");
const { data: lqRaceData } = require("../lolqq/race.json");

const v1LqMap = {
  astro: ["race", "宇航员"],
  battlecast: ["race", "战地机甲"],
  celestial: ["race", "星神"],
  chrono: ["race", "未来战士"],
  cybernetic: ["race", "源计划"],
  dark_star: ["race", "暗星"],
  mech_pilot: ["race", "银河魔装机神"],
  rebel: ["race", "奥德赛"],
  space_pirate: ["race", "太空海盗"],
  star_guardian: ["race", "星之守护者"],
  blademaster: ["job", "剑士"],
  blaster: ["job", "强袭枪手"],
  brawler: ["job", "斗士"],
  demolitionist: ["job", "爆破专家"],
  infiltrator: ["job", "刺客"],
  mana_reaver: ["job", "破法战士"],
  mercenary: ["job", "佣兵"],
  mystic: ["job", "秘术师"],
  paragon: ["job", "大魔法使"],
  protector: ["job", "重装战士"],
  sniper: ["job", "狙神"],
  sorcerer: ["job", "法师"],
  starship: ["job", "星舰龙神"],
  vanguard: ["job", "圣盾使"],
};

module.exports = v1Data.map((rawData) => {
  const data = {
    ...rawData,
    keyword: rawData.keyword.replace(/-/g, "_"),
  };

  const lqInfo = v1LqMap[data.keyword];

  return {
    v1: data,
    lq:
      lqInfo[0] === "race"
        ? lqRaceData.find((d) => d.name === lqInfo[1])
        : lqJobData.find((d) => d.name === lqInfo[1]),
  };
});
