const { DateTime } = require("luxon");

function getRandomInt() {
  max = Number.MAX_SAFE_INTEGER;
  min = 0;
  return Math.floor(Math.random() * (max - min) + min);
}

function periodKey(date, interval, tz = "UTC") {
  const dt = DateTime.fromJSDate(date, { zone: tz });
  switch (interval) {
    case "daily":
      return dt.toFormat("yyyy-LL-dd");
    case "weekly":
      return `${dt.weekYear}-W${String(dt.weekNumber).padStart(2, "0")}`;
    case "monthly":
      return dt.toFormat("yyyy-LL");
    case "yearly":
      return dt.toFormat("yyyy");
    default:
      return dt.toISODate();
  }
}

function addInterval(fromDate, interval, tz = "UTC") {
  const dt = DateTime.fromJSDate(fromDate, { zone: tz });
  const next =
    {
      daily: dt.plus({ days: 1 }),
      weekly: dt.plus({ weeks: 1 }),
      monthly: dt.plus({ months: 1 }),
      yearly: dt.plus({ years: 1 }),
    }[interval] || dt.plus({ months: 1 });
  return next.toJSDate();
}

module.exports = {
  getRandomInt: getRandomInt,
  periodKey: periodKey,
  addInterval: addInterval,
};
