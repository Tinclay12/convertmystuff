export type DiffLineType = "same" | "added" | "removed";

export type DiffDisplayLine = {
  index: number;
  text: string;
  type: DiffLineType;
};

export const buildDiffLines = (left: string, right: string) => {
  const leftLines = left.split(/\r?\n/);
  const rightLines = right.split(/\r?\n/);
  const max = Math.max(leftLines.length, rightLines.length);

  const displayLeft: DiffDisplayLine[] = [];
  const displayRight: DiffDisplayLine[] = [];
  const textLines: string[] = [];

  for (let index = 0; index < max; index += 1) {
    const leftLine = leftLines[index] ?? "";
    const rightLine = rightLines[index] ?? "";

    if (leftLine === rightLine) {
      displayLeft.push({ index, text: leftLine, type: "same" });
      displayRight.push({ index, text: rightLine, type: "same" });
      textLines.push(`  ${leftLine}`);
      continue;
    }

    if (leftLine) {
      displayLeft.push({ index, text: leftLine, type: "removed" });
      textLines.push(`- ${leftLine}`);
    }
    if (rightLine) {
      displayRight.push({ index, text: rightLine, type: "added" });
      textLines.push(`+ ${rightLine}`);
    }
  }

  return {
    leftLines: displayLeft,
    rightLines: displayRight,
    textOutput: textLines.join("\n"),
  };
};
