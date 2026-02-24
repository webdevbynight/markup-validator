import type { Language, ValidationReport, ValidationResult } from "../../../src/types.js";

import { mockedCwd } from "./mocked-cwd.js";

export const mockedValidResultReporting: {
  file: string;
  url: string;
  language: Language;
  result: ValidationResult;
  reporting: ValidationReport;
  logs?: {
    message: string;
    place?: string;
    extract?: string;
  }[];
}[] = [
  {
    file: `${mockedCwd}/docs/valid.html`,
    url: "docs/valid.html",
    language: "html",
    result: {
      version: "26.2.5",
      messages: []
    },
    reporting: {
      language: "html",
      status: "pass",
      url: "docs/valid.html"
    }
  },
  {
    file: `${mockedCwd}/docs/valid-with-warnings.html`,
    url: "docs/valid-with-warnings.html",
    language: "html",
    result: {
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
    },
    reporting: {
      language: "html",
      status: "pass",
      url: "docs/valid-with-warnings.html",
      messages: [
        {
          type: "warning",
          line: 10,
          column: 5,
          message:
            "Section lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all sections, or else use a “div” element instead for any cases where no heading is needed.",
          extract: "</h1>\\n    <section>\\n     "
        }
      ]
    },
    logs: [
      {
        message:
          "Section lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all sections, or else use a “div” element instead for any cases where no heading is needed.",
        place: "line 10, column 5",
        extract: "</h1>\\n    <section>\\n     "
      }
    ]
  },
  {
    file: `${mockedCwd}/docs/valid.css`,
    url: "docs/valid.css",
    language: "css",
    result: {
      version: "26.2.5",
      messages: []
    },
    reporting: {
      language: "css",
      status: "pass",
      url: "docs/valid.css"
    }
  },
  {
    file: `${mockedCwd}/docs/valid-with-warnings.css`,
    url: "docs/valid-with-warnings.css",
    language: "css",
    result: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          lastLine: 8,
          lastColumn: 34,
          firstColumn: 6,
          subType: "warning",
          message:
            "“font-family”: You are encouraged to offer a generic family as a last alternative",
          extract: 'font-family: "JetBrains Mono"',
          hiliteStart: 19,
          hiliteLength: 15
        },
        {
          type: "info",
          lastLine: 9,
          lastColumn: 16,
          firstColumn: 6,
          subType: "warning",
          message:
            "You have no background-color set (or background-color is set to transparent) but you have set a color. Make sure that cascading of colors keeps the text reasonably legible.",
          extract: "color: red",
          hiliteStart: 6,
          hiliteLength: 10
        },
        {
          type: "info",
          lastLine: 10,
          lastColumn: 30,
          firstColumn: 6,
          subType: "warning",
          message: "“-webkit-appearance” is a vendor extension",
          extract: "-webkit-appearance: none",
          hiliteStart: 6,
          hiliteLength: 17
        }
      ]
    },
    reporting: {
      language: "css",
      status: "pass",
      url: "docs/valid-with-warnings.css",
      messages: [
        {
          type: "warning",
          line: 8,
          column: 6,
          message:
            "“font-family”: You are encouraged to offer a generic family as a last alternative",
          extract: 'font-family: "JetBrains Mono"'
        },
        {
          type: "warning",
          line: 9,
          column: 6,
          message:
            "You have no background-color set (or background-color is set to transparent) but you have set a color. Make sure that cascading of colors keeps the text reasonably legible.",
          extract: "color: red"
        },
        {
          type: "warning",
          line: 10,
          column: 6,
          message: "“-webkit-appearance” is a vendor extension",
          extract: "-webkit-appearance: none"
        }
      ]
    },
    logs: [
      {
        message:
          "“font-family”: You are encouraged to offer a generic family as a last alternative",
        place: "line 8, column 6",
        extract: 'font-family: "JetBrains Mono"'
      },
      {
        message:
          "You have no background-color set (or background-color is set to transparent) but you have set a color. Make sure that cascading of colors keeps the text reasonably legible.",
        place: "line 9, column 6",
        extract: "color: red"
      },
      {
        message: "“-webkit-appearance” is a vendor extension",
        place: "line 10, column 6",
        extract: "-webkit-appearance: none"
      }
    ]
  },
  {
    file: `${mockedCwd}/docs/valid.svg`,
    url: "docs/valid.svg",
    language: "svg",
    result: {
      version: "26.2.5",
      messages: []
    },
    reporting: {
      language: "svg",
      status: "pass",
      url: "docs/valid.svg"
    }
  },
  {
    file: `${mockedCwd}/docs/valid-with-infos.svg`,
    url: "docs/valid-with-infos.svg",
    language: "svg",
    result: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          message: "Using the preset for SVG + URL + HTML + MathML based on the root namespace."
        }
      ]
    },
    reporting: {
      language: "svg",
      status: "pass",
      url: "docs/valid-with-infos.svg",
      messages: [
        {
          type: "info",
          message: "Using the preset for SVG + URL + HTML + MathML based on the root namespace."
        }
      ]
    },
    logs: [
      {
        message: "Using the preset for SVG + URL + HTML + MathML based on the root namespace."
      }
    ]
  },
  {
    file: `${mockedCwd}/docs/valid-with-warnings.svg`,
    url: "docs/valid-with-warnings.svg",
    language: "svg",
    result: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          lastLine: 41,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: 'ta5">\\n    <rdf:RDF>\\n     ',
          hiliteStart: 10,
          hiliteLength: 9
        }
      ]
    },
    reporting: {
      language: "svg",
      status: "pass",
      url: "docs/valid-with-warnings.svg",
      messages: [
        {
          type: "warning",
          line: 41,
          column: 5,
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: 'ta5">\\n    <rdf:RDF>\\n     '
        }
      ]
    },
    logs: [
      {
        message: "This validator does not validate RDF. RDF subtrees go unchecked.",
        place: "line 41, column 5",
        extract: 'ta5">\\n    <rdf:RDF>\\n     '
      }
    ]
  }
];
