export const safeReports = (reports: number[][]): number => {
  const safeReports = reports.map(report => {
    let state: "increasing" | "decreasing" | "initial" = "initial";
    let lastValue = Infinity;

    for (const currentValue of report) {
      if (currentValue === lastValue) {
        return false;
      }
      if (lastValue !== Infinity) {
        if (Math.abs(currentValue - lastValue) > 3) {
          return false;
        }
        if (state === "initial") {
          state = currentValue > lastValue ? "increasing" : "decreasing";
        } else if (state === "increasing" && currentValue < lastValue) {
          return false;
        } else if (state === "decreasing" && currentValue > lastValue) {
          return false;
        }
      }

      lastValue = currentValue;
    }
    return true;
  });

  return safeReports.filter(Boolean).length;
};
