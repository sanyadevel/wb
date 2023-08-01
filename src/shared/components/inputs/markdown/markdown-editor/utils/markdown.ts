type MarkResult = {
  text: string;
  selectionStart: number;
  selectionEnd: number;
};

const isWrapped = (text: string, from: number, to: number, mark: string): boolean => {
  const startPos = from - mark.length;
  const endPost = to + mark.length;

  return text.substring(startPos, from) === mark && text.substring(to, endPost) === mark;
};

export const markText = (text: string, from: number, to: number, mark: string): MarkResult => {
  if (isWrapped(text, from, to, mark)) {
    const startText = text.substring(0, from - mark.length);
    const middleText = text.substring(from, to);
    const endText = text.substring(to + mark.length, text.length);
    const newText = startText + middleText + endText;

    const selectionStart = from - mark.length;
    const selectionEnd = to - mark.length;

    return {
      text: newText,
      selectionStart,
      selectionEnd,
    };
  }
  const startText = text.substring(0, from);
  const middleText = text.substring(from, to);
  const endText = text.substring(to, text.length);
  const newText = startText + mark + middleText + mark + endText;

  const selectionStart = from + mark.length;
  const selectionEnd = to + mark.length;

  return {
    text: newText,
    selectionStart,
    selectionEnd,
  };
};

const getLines = (text: string): Array<string> => {
  const lines: Array<string> = [];
  let search = true;
  let startPos: number = 0;
  let endPos: number = text.length;
  while (search) {
    const nPos: number = text.indexOf('\n', startPos);
    endPos = nPos > -1 ? nPos : text.length;
    const subStr = text.substring(startPos, endPos + 1);
    lines.push(subStr);
    startPos = nPos > -1 ? nPos + 1 : -1;
    search = startPos >= 0;
  }
  return lines;
};

const findLine = (lines: Array<string>, textPosition: number): number => {
  let index = 0;
  let startPos = 0;
  let endPos = 0;
  let acc = 0;
  while (index < lines.length) {
    acc += lines[index].length;
    endPos = acc - 1;
    if (textPosition >= startPos && textPosition <= endPos) return index;
    if (lines.length - 1 === index && textPosition === endPos + 1) return index;
    startPos = acc;
    index += 1;
  }

  return -1;
};

export const markLine = (text: string, from: number, to: number, mark: string): MarkResult => {
  const lines: Array<string> = getLines(text);
  const startLine: number = findLine(lines, from);
  const endLine: number = findLine(lines, to);

  let selection = to;
  for (let i = startLine; i <= endLine; i += 1) {
    if (lines[i].startsWith(mark)) {
      lines[i] = lines[i].replace(mark, '');
      selection -= mark.length;
    } else {
      lines[i] = mark + lines[i];
      selection += mark.length;
    }
  }
  const newText = lines.join('');

  return {
    text: newText,
    selectionStart: selection,
    selectionEnd: selection,
  };
};

const isTemplate = (text: string, from: number, to: number, leftMark: string, rightMark: string): boolean => {
  const startPos = from - leftMark.length;
  const endPost = to + rightMark.length;

  return text.substring(startPos, from) === leftMark && text.substring(to, endPost) === rightMark;
};

export const insertTemplate = (
  text: string,
  from: number,
  to: number,
  leftMark: string,
  rightMark: string,
): MarkResult => {
  if (isTemplate(text, from, to, leftMark, rightMark)) {
    const startText = text.substring(0, from - leftMark.length);
    const middleText = text.substring(from, to);
    const endText = text.substring(to + rightMark.length, text.length);
    const newText = startText + middleText + endText;

    const selectionStart = from - leftMark.length;
    const selectionEnd = to - leftMark.length;

    return {
      text: newText,
      selectionStart,
      selectionEnd,
    };
  }
  const startText = text.substring(0, from);
  const middleText = text.substring(from, to);
  const endText = text.substring(to, text.length);
  const newText = startText + leftMark + middleText + rightMark + endText;

  const selectionStart = from + leftMark.length;
  const selectionEnd = to + leftMark.length;

  return {
    text: newText,
    selectionStart,
    selectionEnd,
  };
};

export const h1 = (text: string, from: number, to: number) => markLine(text, from, to, '# ');
export const h2 = (text: string, from: number, to: number) => markLine(text, from, to, '## ');
export const h3 = (text: string, from: number, to: number) => markLine(text, from, to, '### ');

export const bold = (text: string, from: number, to: number) => markText(text, from, to, '**');
export const italic = (text: string, from: number, to: number) => markText(text, from, to, '*');
export const crossOut = (text: string, from: number, to: number) => markText(text, from, to, '~~');

export const code = (text: string, from: number, to: number) => {
  const result = text.slice(from, to);
  if (result.includes('\n')) return markText(text, from, to, '\n```\n');
  return markText(text, from, to, '`');
};

export const quote = (text: string, from: number, to: number) => markLine(text, from, to, '> ');
export const list = (text: string, from: number, to: number) => markLine(text, from, to, '* ');
export const numberedList = (text: string, from: number, to: number) => markLine(text, from, to, '1. ');

export const link = (text: string, from: number, to: number) => {
  if (from !== to) return insertTemplate(text, from, to, '[', '](url)');

  return insertTemplate(text, from, to, '', '[text](url)');
};
export const image = (text: string, from: number, to: number) => {
  if (from !== to) return insertTemplate(text, from, to, '![', '](url)');

  return insertTemplate(text, from, to, '', '![text](url)');
};

export const insert = (text: string, insertText: string, from: number, to: number) => {
  const startText = text.substring(0, from);
  const middleText = text.substring(from, to);
  const endText = text.substring(to, text.length);
  const newText = startText + insertText + endText;
  const selectionStart = from + insertText.length - middleText.length;
  const selectionEnd = selectionStart;

  return {
    text: newText,
    selectionStart,
    selectionEnd,
  };
};
