import type { Message, ValidationReportMessage } from "../../../src/types.js";

export const mockedMessagesToMap: {
  original: Message[];
  expected: ValidationReportMessage[];
} = {
  original: [
    {
      type: "info",
      message: "Using the preset for SVG + URL + HTML + MathML based on the root namespace."
    },
    {
      type: "error",
      lastLine: 5,
      lastColumn: 19,
      firstColumn: 12,
      message: "Element “title” must not be empty.",
      extract: "   <title></title>\\n  </h",
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
      extract: "</h1>\\n    <section>\\n     ",
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
  ],
  expected: [
    {
      type: "info",
      message: "Using the preset for SVG + URL + HTML + MathML based on the root namespace."
    },
    {
      type: "error",
      line: 5,
      column: 12,
      message: "Element “title” must not be empty.",
      extract: "   <title></title>\\n  </h"
    },
    {
      type: "warning",
      line: 10,
      column: 5,
      message:
        "Section lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all sections, or else use a “div” element instead for any cases where no heading is needed.",
      extract: "</h1>\\n    <section>\\n     "
    },
    {
      type: "error",
      line: 13,
      column: 11,
      message:
        "Element “p” not allowed as child of element “span” in this context. (Suppressing further errors from this subtree.)",
      extract: "    <span><p>A phra"
    }
  ]
};
