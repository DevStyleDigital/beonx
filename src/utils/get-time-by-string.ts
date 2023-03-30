const timeTable = {
  y: () => timeTable.d() * 365,
  mt: () => timeTable.d() * 30,
  d: () => timeTable.h() * 24,
  h: () => timeTable.m() * 60,
  m: () => timeTable.s() * 60,
  s: () => timeTable.ms() * 1000,
  ms: () => 1,
};

type TimeTableKeys = keyof typeof timeTable;

/**
 * getTimeByString - A function that converts a time string to a time in a specific unit
 *
 * @param time - A string representing the time (e.g. "5s" or "10m")
 * @param resType - An optional parameter to specify the desired unit of time to convert to (e.g. "ms", "s", "m", "h"). Default is "s"
 * @return - The time in the specified unit
 *
 * @example
 * getTimeByString("5s")
 * // returns 5000
 *
 * @example
 * getTimeByString("10m", "h")
 * // returns 0.16666666666666666
 */
export function getTimeByString(time: string, resType?: TimeTableKeys) {
  const [timeNumber, timeMultiplier] = [
    +time.replace(/\D+/g, ''),
    time.replace(/\d+/g, ''),
  ];

  const timeInMiliSecond = timeNumber * timeTable[timeMultiplier as TimeTableKeys]();
  const timeResponse = timeInMiliSecond / timeTable[resType || 's']();
  return timeResponse;
}
