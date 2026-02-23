import type { IgnoreLevel, ValidationResult } from "../../src/types.js";

import { mockedEntryPoint } from "../utils/fixtures/mocked-entry-points.js";

const contentWithoutWarnings = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Valid HTML file</title>
</head>

<body>
<h1>Hello World</h1>
</body>
</html>
`;
const contentWithWarnings = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Valid HTML file with warnings</title>
</head>

<body>
<h1>Hello World</h1>
<section>
  <p>This section has no headings.</p>
</section>
</body>
</html>
`;
export const mockedValidHTMLFilesResults: {
  content: string;
  ignoreLevel: IgnoreLevel;
  expectedEntryPoint: string;
  expectedResult: ValidationResult;
}[] = [
  {
    content: contentWithoutWarnings,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=html`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithWarnings,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=html`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          lastLine: 10,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message:
            "Section lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all sections, or else use a “div” element instead for any cases where no heading is needed.",
          extract: "</h1>\n    <section>\n     ",
          hiliteStart: 10,
          hiliteLength: 9
        }
      ]
    }
  },
  {
    content: contentWithoutWarnings,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=html&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithWarnings,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=html&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          lastLine: 10,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message:
            "Section lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all sections, or else use a “div” element instead for any cases where no heading is needed.",
          extract: "</h1>\n    <section>\n     ",
          hiliteStart: 10,
          hiliteLength: 9
        }
      ]
    }
  },
  {
    content: contentWithoutWarnings,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=html&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithWarnings,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=html&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  }
];
