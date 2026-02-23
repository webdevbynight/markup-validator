import type { IgnoreLevel, ValidationResult } from "../../src/types.js";

import { mockedEntryPoint } from "../utils/fixtures/mocked-entry-points.js";

const content = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title></title>
</head>

<body>
<h1>Hello World</h1>
<section>
<p>This section has no headings.</p>
</section>
<span><p>A phrasing content element containing an element supposed to contain it.</p></span>
</body>
</html>
`;
export const mockedInvalidHTMLFilesResults: {
  content: string;
  ignoreLevel: IgnoreLevel;
  expectedEntryPoint: string;
  expectedResult: ValidationResult;
}[] = [
  {
    content,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=html`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 5,
          lastColumn: 19,
          firstColumn: 12,
          message: "Element “title” must not be empty.",
          extract: "   <title></title>\n  </h",
          hiliteStart: 10,
          hiliteLength: 8
        },
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
        },
        {
          type: "error",
          lastLine: 13,
          lastColumn: 13,
          firstColumn: 11,
          message:
            "Element “p” not allowed as child of element “span” in this context. (Suppressing further errors from this subtree.)",
          extract: "    <span><p>A phra",
          hiliteStart: 10,
          hiliteLength: 3
        }
      ]
    }
  },
  {
    content,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=html&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 5,
          lastColumn: 19,
          firstColumn: 12,
          message: "Element “title” must not be empty.",
          extract: "   <title></title>\n  </h",
          hiliteStart: 10,
          hiliteLength: 8
        },
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
        },
        {
          type: "error",
          lastLine: 13,
          lastColumn: 13,
          firstColumn: 11,
          message:
            "Element “p” not allowed as child of element “span” in this context. (Suppressing further errors from this subtree.)",
          extract: "    <span><p>A phra",
          hiliteStart: 10,
          hiliteLength: 3
        }
      ]
    }
  },
  {
    content,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=html&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 5,
          lastColumn: 19,
          firstColumn: 12,
          message: "Element “title” must not be empty.",
          extract: "   <title></title>\n  </h",
          hiliteStart: 10,
          hiliteLength: 8
        },
        {
          type: "error",
          lastLine: 13,
          lastColumn: 13,
          firstColumn: 11,
          message:
            "Element “p” not allowed as child of element “span” in this context. (Suppressing further errors from this subtree.)",
          extract: "    <span><p>A phra",
          hiliteStart: 10,
          hiliteLength: 3
        }
      ]
    }
  }
];
