const { data: lqRawData } = require("../lolqq/equip.json");

const firstLine = [...Array.from({ length: 9 }, (_, i) => 1 << (i * 2))];

const lqBasicItemsMap = [301, 302, 303, 304, 305, 306, 307, 308, 309].reduce(
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
        `${lqBasicItemsMap[raws[0]]},${lqBasicItemsMap[raws[1]]}` ||
      lqItem.formula ===
        `${lqBasicItemsMap[raws[1]]},${lqBasicItemsMap[raws[0]]}`
    );
  };
}

const result = firstLine.map((id) => {
  const item = lqRawData.filter((d) => d.equipId === lqBasicItemsMap[id]).pop();
  console.log(item);
  return {
    ...item,
    id,
    raws: [],
  };
});

for (let i = 0; i < 9; i++) {
  for (let j = 0; j <= i; j++) {
    const raws = [1 << (i * 2), 1 << (j * 2)];
    const item = lqRawData.filter(getSyntheticItem(raws)).pop();
    result.push({
      ...item,
      id: (1 << (i * 2)) + (1 << (j * 2)),
      raws: raws,
    });
  }
}

module.exports = result;
