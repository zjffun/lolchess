const { data: lqJobData } = require("../lolqq/job.json");
const { data: lqRaceData } = require("../lolqq/race.json");

module.exports = lqJobData
  .map((d) => {
    return {
      ...d,
      type: "classType",
      id: "class" + d.TFTID,
    };
  })
  .concat(
    lqRaceData.map((d) => {
      return {
        ...d,
        type: "origin",
        id: "origin" + d.TFTID,
      };
    })
  );
