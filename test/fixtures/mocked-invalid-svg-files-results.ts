import type { IgnoreLevel, ValidationResult } from "../../src/types.js";

import { mockedEntryPoint } from "../utils/fixtures/mocked-entry-points.js";

const content = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" version="1.1" width="40" height="144" viewBox="0 0 40 144">
  <metadata>
    <rdf:RDF>
      <cc:Work
        rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
          rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs>
    <path id="correct-answer" fill="#26d782" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z"/>
    <path id="incorrect-answer" fill="#ee5454" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"/>
  </defs>
  <use xlink:href="#correct-answer" transform="scale(.8)"/>
  <use xlink:href="#incorrect-answer" transform="translate(0,32) scale(.8)"/>
  <use xlink:href="#correct-answer" transform="translate(0,64)"/>
  <use xlink:href="#incorrect-answer" transform="translate(0,104)"/>
</svg>
`;
const contentWithoutDoctype = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" version="1.1" width="40" height="144" viewBox="0 0 40 144">
  <metadata>
    <rdf:RDF>
      <cc:Work
        rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
          rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs>
    <path id="correct-answer" fill="#26d782" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z"/>
    <path id="incorrect-answer" fill="#ee5454" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"/>
  </defs>
  <use xlink:href="#correct-answer" transform="scale(.8)"/>
  <use xlink:href="#incorrect-answer" transform="translate(0,32) scale(.8)"/>
  <use xlink:href="#correct-answer" transform="translate(0,64)"/>
  <use xlink:href="#incorrect-answer" transform="translate(0,104)"/>
</svg>
`;
const contentWithoutProlog = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" version="1.1" width="40" height="144" viewBox="0 0 40 144">
  <metadata>
    <rdf:RDF>
      <cc:Work
        rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
          rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs>
    <path id="correct-answer" fill="#26d782" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-1.875 15.105L25.3 15.41a1.25 1.25 0 0 1 1.915 1.593l-.145.174-8.06 8.08a1.25 1.25 0 0 1-1.595.148l-.175-.145-4.375-4.375a1.25 1.25 0 0 1 1.595-1.913l.175.143 3.49 3.49Z"/>
    <path id="incorrect-answer" fill="#ee5454" d="M20 5a15 15 0 1 1 0 30 15 15 0 0 1 0-30Zm0 2.5a12.5 12.5 0 1 0 0 25 12.5 12.5 0 0 0 0-25Zm-5.402 7.415.142-.175a1.25 1.25 0 0 1 1.595-.143l.175.143L20 18.233l3.49-3.493a1.25 1.25 0 0 1 1.595-.143l.175.143a1.25 1.25 0 0 1 .142 1.595l-.142.175L21.767 20l3.493 3.49a1.25 1.25 0 0 1 .142 1.595l-.142.175a1.25 1.25 0 0 1-1.595.142l-.175-.142L20 21.767l-3.49 3.493a1.25 1.25 0 0 1-1.595.142l-.175-.142a1.25 1.25 0 0 1-.143-1.595l.143-.175L18.233 20l-3.493-3.49a1.25 1.25 0 0 1-.143-1.595Z"/>
  </defs>
  <use xlink:href="#correct-answer" transform="scale(.8)"/>
  <use xlink:href="#incorrect-answer" transform="translate(0,32) scale(.8)"/>
  <use xlink:href="#correct-answer" transform="translate(0,64)"/>
  <use xlink:href="#incorrect-answer" transform="translate(0,104)"/>
</svg>
`;
export const mockedInvalidSVGFilesResults: {
  content: string;
  ignoreLevel: IgnoreLevel;
  expectedEntryPoint: string;
  expectedResult: ValidationResult;
}[] = [
  {
    content,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          message: "Using the preset for SVG + URL + HTML + MathML based on the root namespace."
        },
        {
          type: "info",
          lastLine: 5,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: "data>\n    <rdf:RDF>\n     ",
          hiliteStart: 10,
          hiliteLength: 9
        },
        {
          type: "error",
          lastLine: 19,
          lastColumn: 59,
          subType: "fatal",
          message: "undeclared attribute prefix in: xlink:href",
          extract: 'rm="scale(.8)"/>\n  <use xlink:',
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  },
  {
    content: contentWithoutDoctype,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          message: "Using the preset for SVG + URL + HTML + MathML based on the root namespace."
        },
        {
          type: "info",
          lastLine: 4,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: "data>\n    <rdf:RDF>\n     ",
          hiliteStart: 10,
          hiliteLength: 9
        },
        {
          type: "error",
          lastLine: 18,
          lastColumn: 59,
          subType: "fatal",
          message: "undeclared attribute prefix in: xlink:href",
          extract: 'rm="scale(.8)"/>\n  <use xlin',
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  },
  {
    content: contentWithoutProlog,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          message: "Using the preset for SVG + URL + HTML + MathML based on the root namespace."
        },
        {
          type: "info",
          lastLine: 3,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: "data>\n    <rdf:RDF>\n     ",
          hiliteStart: 10,
          hiliteLength: 9
        },
        {
          type: "error",
          lastLine: 17,
          lastColumn: 59,
          subType: "fatal",
          message: "undeclared attribute prefix in: xlink:href",
          extract: 'rm="scale(.8)"/>\n  <use xlink',
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  },
  {
    content,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          lastLine: 5,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: "data>\n    <rdf:RDF>\n     ",
          hiliteStart: 10,
          hiliteLength: 9
        },
        {
          type: "error",
          lastLine: 19,
          lastColumn: 59,
          subType: "fatal",
          message: "undeclared attribute prefix in: xlink:href",
          extract: 'rm="scale(.8)"/>\n  <use xlink:',
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  },
  {
    content: contentWithoutDoctype,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          lastLine: 4,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: "data>\n    <rdf:RDF>\n     ",
          hiliteStart: 10,
          hiliteLength: 9
        },
        {
          type: "error",
          lastLine: 18,
          lastColumn: 59,
          subType: "fatal",
          message: "undeclared attribute prefix in: xlink:href",
          extract: 'rm="scale(.8)"/>\n  <use xlin',
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  },
  {
    content: contentWithoutProlog,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          lastLine: 3,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: "data>\n    <rdf:RDF>\n     ",
          hiliteStart: 10,
          hiliteLength: 9
        },
        {
          type: "error",
          lastLine: 17,
          lastColumn: 59,
          subType: "fatal",
          message: "undeclared attribute prefix in: xlink:href",
          extract: 'rm="scale(.8)"/>\n  <use xlink',
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  },
  {
    content,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 19,
          lastColumn: 59,
          subType: "fatal",
          message: "undeclared attribute prefix in: xlink:href",
          extract: 'rm="scale(.8)"/>\n  <use xlink:',
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  },
  {
    content: contentWithoutDoctype,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 18,
          lastColumn: 59,
          subType: "fatal",
          message: "undeclared attribute prefix in: xlink:href",
          extract: 'rm="scale(.8)"/>\n  <use xlin',
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  },
  {
    content: contentWithoutProlog,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 17,
          lastColumn: 59,
          subType: "fatal",
          message: "undeclared attribute prefix in: xlink:href",
          extract: 'rm="scale(.8)"/>\n  <use xlink',
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  }
];
