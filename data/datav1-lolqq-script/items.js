const { data: lqRawData } = require("../lolqq/equip.json");
const v1Data = require("../datav1/items.en.json");

const lqData = lqRawData.filter(
  (d) =>
    !d.equipId.startsWith("2") && d.equipId !== "333" && d.equipId !== "331"
);

const firstLine = [...Array.from({ length: 9 }, (_, i) => 1 << (i * 2))];

const v1LqBasicItemsMap = [301, 302, 305, 306, 303, 304, 307, 308, 309].reduce(
  (res, d, i) => {
    res[firstLine[i]] = "" + d;
    return res;
  },
  {}
);

function getSyntheticItem(raws) {
  return function (lqItem) {
    return (
      lqItem.formula ===
        `${v1LqBasicItemsMap[raws[0]]},${v1LqBasicItemsMap[raws[1]]}` ||
      lqItem.formula ===
        `${v1LqBasicItemsMap[raws[1]]},${v1LqBasicItemsMap[raws[0]]}`
    );
  };
}

module.exports = v1Data.map((data) => {
  const { id, raws } = data;

  let lqItem = {};

  if (v1LqBasicItemsMap[id]) {
    lqItem = lqData.find((d) => d.equipId === v1LqBasicItemsMap[id]);
  } else {
    lqItem = lqData.find(getSyntheticItem(raws));
  }

  return {
    v1: data,
    lq: lqItem,
  };
});
