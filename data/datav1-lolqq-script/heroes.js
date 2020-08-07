const v1Data = require("../datav1/heroes.en.json");
const { data: lqRawData } = require("../lolqq/chess.json");

const v1LqMap = {
  ahri: "阿狸",
  annie: "安妮",
  ashe: "艾希",
  aurelionsol: "奥瑞利安·索尔",
  bard: "巴德",
  blitzcrank: "布里茨",
  caitlyn: "凯特琳",
  cassiopeia: "卡西奥佩娅",
  darius: "德莱厄斯",
  ekko: "艾克",
  ezreal: "伊泽瑞尔",
  fiora: "菲奥娜",
  fizz: "菲兹",
  gangplank: "普朗克",
  gnar: "纳尔",
  graves: "格雷福斯",
  illaoi: "俄洛伊",
  irelia: "艾瑞莉娅",
  janna: "迦娜",
  jarvaniv: "嘉文四世",
  jayce: "杰斯",
  jhin: "烬",
  jinx: "金克丝",
  karma: "卡尔玛",
  kogmaw: "克格莫",
  leona: "蕾欧娜",
  lucian: "卢锡安",
  lulu: "璐璐",
  malphite: "墨菲特",
  masteryi: "易",
  monkeyking: "孙悟空",
  mordekaiser: "莫德凯撒",
  nautilus: "诺提勒斯",
  neeko: "妮蔻",
  nocturne: "魔腾",
  poppy: "波比",
  rakan: "洛",
  riven: "锐雯",
  rumble: "兰博",
  shaco: "萨科",
  shen: "慎",
  soraka: "索拉卡",
  syndra: "辛德拉",
  teemo: "提莫",
  thresh: "锤石",
  twistedfate: "崔斯特",
  urgot: "厄加特",
  vayne: "薇恩",
  vi: "蔚",
  viktor: "维克托",
  xayah: "霞",
  xerath: "泽拉斯",
  xinzhao: "赵信",
  yasuo: "亚索",
  zed: "劫",
  ziggs: "吉格斯",
  zoe: "佐伊",
};

module.exports = v1Data.map((data) => {
  return {
    v1: data,
    lq: lqRawData.find((d) => d.displayName === v1LqMap[data.keyword]),
  };
});
