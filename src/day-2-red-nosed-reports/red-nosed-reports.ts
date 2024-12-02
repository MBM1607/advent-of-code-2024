// Get variants of report by removing one element at a time
const variants = (report: number[]): number[][] =>
  report.map((_, i) => report.filter((_, j) => i !== j));

export const isSafeReport = (report: number[]): boolean => {
  let isAscending = Number(report[0]) < Number(report[1]);

  for (let i = 0; i < report.length; i++) {
    const currentValue = Number(report[i]);
    const previousValue = Number(report[i - 1]);
    const difference = Math.abs(currentValue - previousValue);

    if (
      difference > 3 ||
      difference === 0 ||
      (isAscending && currentValue < previousValue) ||
      (!isAscending && currentValue > previousValue)
    ) {
      return false;
    }
  }
  return true;
};

export const safeReports = (reports: number[][], withDampener: boolean = false): number =>
  reports.filter(report => {
    if (withDampener) {
      const reportVariants = variants(report);
      const isSafe = reportVariants.some(isSafeReport);
      return isSafe;
    }
    return isSafeReport(report);
  }).length;
