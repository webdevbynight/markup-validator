import type { IgnoreLevel, ValidationResult } from "../../src/types.js";

import { mockedEntryPoint } from "../utils/fixtures/mocked-entry-points.js";

const contentWithoutWarnings = `@charset "utf-8";

.element {
  display: none;
}
@media (width > 500px) {
  .element {
    display: block;
  }
}
`;
const contentWithWarnings = `@charset "utf-8";

.element {
  display: none;
}
@media screen and (min-width: 500px) {
  .element {
    font-family: "JetBrains Mono";
    color: red;
    -webkit-appearance: none;
  }
}
`;
export const mockedValidCSSFilesResults: {
  content: string;
  ignoreLevel: IgnoreLevel;
  expectedEntryPoint: string;
  expectedResult: ValidationResult;
}[] = [
  {
    content: contentWithoutWarnings,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&css=yes`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithWarnings,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&css=yes`,
    expectedResult: {
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
    }
  },
  {
    content: contentWithoutWarnings,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&css=yes&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithWarnings,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&css=yes&level=warning`,
    expectedResult: {
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
    }
  },
  {
    content: contentWithoutWarnings,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&css=yes&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithWarnings,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&css=yes&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  }
];
