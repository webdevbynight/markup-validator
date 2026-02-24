import type { IgnoreLevel, ValidationResult } from "../../src/types.js";

import { mockedEntryPoint } from "../utils/fixtures/mocked-entry-points.js";

const contentWithoutWarnings = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="40" height="144" viewBox="0 0 40 144">
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
const contentWithoutDoctypeWithoutWarnings = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="40" height="144" viewBox="0 0 40 144">
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
const contentWithoutPrologWithoutWarnings = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="40" height="144" viewBox="0 0 40 144">
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
const contentWithWarnings = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:cc="http://creativecommons.org/ns#"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:svg="http://www.w3.org/2000/svg"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  width="210mm"
  height="297mm"
  viewBox="0 0 210 297"
  version="1.1"
  id="svg8"
  inkscape:version="1.0.1 (c497b03c, 2020-09-10)"
  sodipodi:docname="age-picto.svg">
  <defs
    id="defs2" />
  <sodipodi:namedview
    id="base"
    pagecolor="#ffffff"
    bordercolor="#666666"
    borderopacity="1.0"
    inkscape:pageopacity="0.0"
    inkscape:pageshadow="2"
    inkscape:zoom="11.2"
    inkscape:cx="318.08899"
    inkscape:cy="300.22648"
    inkscape:document-units="mm"
    inkscape:current-layer="g856"
    inkscape:document-rotation="0"
    showgrid="false"
    inkscape:window-width="2560"
    inkscape:window-height="1309"
    inkscape:window-x="2560"
    inkscape:window-y="25"
    inkscape:window-maximized="1" />
  <metadata
    id="metadata5">
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
  <g
    inkscape:label="Layer 1"
    inkscape:groupmode="layer"
    id="layer1"
    style="display:inline"
    sodipodi:insensitive="true">
    <circle
      style="fill:none;stroke:#000000;stroke-width:0.264583;stroke-opacity:1"
      id="path855"
      cx="90.052826"
      cy="72.250153"
      r="46.963543" />
  </g>
</svg>
`;
const contentWithoutDoctypeWithWarnings = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:cc="http://creativecommons.org/ns#"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:svg="http://www.w3.org/2000/svg"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  width="210mm"
  height="297mm"
  viewBox="0 0 210 297"
  version="1.1"
  id="svg8"
  inkscape:version="1.0.1 (c497b03c, 2020-09-10)"
  sodipodi:docname="age-picto.svg">
  <defs
    id="defs2" />
  <sodipodi:namedview
    id="base"
    pagecolor="#ffffff"
    bordercolor="#666666"
    borderopacity="1.0"
    inkscape:pageopacity="0.0"
    inkscape:pageshadow="2"
    inkscape:zoom="11.2"
    inkscape:cx="318.08899"
    inkscape:cy="300.22648"
    inkscape:document-units="mm"
    inkscape:current-layer="g856"
    inkscape:document-rotation="0"
    showgrid="false"
    inkscape:window-width="2560"
    inkscape:window-height="1309"
    inkscape:window-x="2560"
    inkscape:window-y="25"
    inkscape:window-maximized="1" />
  <metadata
    id="metadata5">
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
  <g
    inkscape:label="Layer 1"
    inkscape:groupmode="layer"
    id="layer1"
    style="display:inline"
    sodipodi:insensitive="true">
    <circle
      style="fill:none;stroke:#000000;stroke-width:0.264583;stroke-opacity:1"
      id="path855"
      cx="90.052826"
      cy="72.250153"
      r="46.963543" />
  </g>
</svg>
`;
const contentWithoutPrologWithWarnings = `<svg
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:cc="http://creativecommons.org/ns#"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:svg="http://www.w3.org/2000/svg"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  width="210mm"
  height="297mm"
  viewBox="0 0 210 297"
  version="1.1"
  id="svg8"
  inkscape:version="1.0.1 (c497b03c, 2020-09-10)"
  sodipodi:docname="age-picto.svg">
  <defs
    id="defs2" />
  <sodipodi:namedview
    id="base"
    pagecolor="#ffffff"
    bordercolor="#666666"
    borderopacity="1.0"
    inkscape:pageopacity="0.0"
    inkscape:pageshadow="2"
    inkscape:zoom="11.2"
    inkscape:cx="318.08899"
    inkscape:cy="300.22648"
    inkscape:document-units="mm"
    inkscape:current-layer="g856"
    inkscape:document-rotation="0"
    showgrid="false"
    inkscape:window-width="2560"
    inkscape:window-height="1309"
    inkscape:window-x="2560"
    inkscape:window-y="25"
    inkscape:window-maximized="1" />
  <metadata
    id="metadata5">
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
  <g
    inkscape:label="Layer 1"
    inkscape:groupmode="layer"
    id="layer1"
    style="display:inline"
    sodipodi:insensitive="true">
    <circle
      style="fill:none;stroke:#000000;stroke-width:0.264583;stroke-opacity:1"
      id="path855"
      cx="90.052826"
      cy="72.250153"
      r="46.963543" />
  </g>
</svg>
`;
export const mockedValidSVGFilesResults: {
  content: string;
  ignoreLevel: IgnoreLevel;
  expectedEntryPoint: string;
  expectedResult: ValidationResult;
}[] = [
  {
    content: contentWithoutWarnings,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          message: "Using the preset for SVG + URL + HTML + MathML based on the root namespace."
        }
      ]
    }
  },
  {
    content: contentWithoutDoctypeWithoutWarnings,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          message: "Using the preset for SVG + URL + HTML + MathML based on the root namespace."
        }
      ]
    }
  },
  {
    content: contentWithoutPrologWithoutWarnings,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          message: "Using the preset for SVG + URL + HTML + MathML based on the root namespace."
        }
      ]
    }
  },
  {
    content: contentWithWarnings,
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
          lastLine: 17,
          firstLine: 3,
          lastColumn: 35,
          firstColumn: 1,
          subType: "warning",
          message:
            "This validator does not validate Inkscape extensions properly. Inkscape-specific errors may go unnoticed.",
          extract:
            'g11.dtd">\n<svg\n  xmlns:dc="http://purl.org/dc/elements/1.1/"\n  xmlns:cc="http://creativecommons.org/ns#"\n  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n  xmlns:svg="http://www.w3.org/2000/svg"\n  xmlns="http://www.w3.org/2000/svg"\n  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\n  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\n  width="210mm"\n  height="297mm"\n  viewBox="0 0 210 297"\n  version="1.1"\n  id="svg8"\n  inkscape:version="1.0.1 (c497b03c, 2020-09-10)"\n  sodipodi:docname="age-picto.svg">\n  <de',
          hiliteStart: 10,
          hiliteLength: 534
        },
        {
          type: "info",
          lastLine: 41,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: 'ta5">\n    <rdf:RDF>\n     ',
          hiliteStart: 10,
          hiliteLength: 9
        }
      ]
    }
  },
  {
    content: contentWithoutDoctypeWithWarnings,
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
          lastLine: 16,
          firstLine: 1,
          lastColumn: 35,
          firstColumn: 1,
          subType: "warning",
          message:
            "This validator does not validate Inkscape extensions properly. Inkscape-specific errors may go unnoticed.",
          extract:
            '\n<svg\n  xmlns:dc="http://purl.org/dc/elements/1.1/"\n  xmlns:cc="http://creativecommons.org/ns#"\n  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n  xmlns:svg="http://www.w3.org/2000/svg"\n  xmlns="http://www.w3.org/2000/svg"\n  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\n  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\n  width="210mm"\n  height="297mm"\n  viewBox="0 0 210 297"\n  version="1.1"\n  id="svg8"\n  inkscape:version="1.0.1 (c497b03c, 2020-09-10)"\n  sodipodi:docname="age-picto.svg">\n  <d',
          hiliteStart: 0,
          hiliteLength: 535
        },
        {
          type: "info",
          lastLine: 40,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: 'ta5">\n    <rdf:RDF>',
          hiliteStart: 10,
          hiliteLength: 9
        }
      ]
    }
  },
  {
    content: contentWithoutPrologWithWarnings,
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
          lastLine: 15,
          firstLine: 1,
          lastColumn: 35,
          firstColumn: 1,
          subType: "warning",
          message:
            "This validator does not validate Inkscape extensions properly. Inkscape-specific errors may go unnoticed.",
          extract:
            '<svg\n  xmlns:dc="http://purl.org/dc/elements/1.1/"\n  xmlns:cc="http://creativecommons.org/ns#"\n  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n  xmlns:svg="http://www.w3.org/2000/svg"\n  xmlns="http://www.w3.org/2000/svg"\n  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\n  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\n  width="210mm"\n  height="297mm"\n  viewBox="0 0 210 297"\n  version="1.1"\n  id="svg8"\n  inkscape:version="1.0.1 (c497b03c, 2020-09-10)"\n  sodipodi:docname="age-picto.svg">\n  <de',
          hiliteStart: 0,
          hiliteLength: 534
        },
        {
          type: "info",
          lastLine: 39,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: 'ta5">\n    <rdf:RDF>\n',
          hiliteStart: 10,
          hiliteLength: 9
        }
      ]
    }
  },
  {
    content: contentWithoutWarnings,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithoutDoctypeWithoutWarnings,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithoutPrologWithoutWarnings,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithWarnings,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          lastLine: 17,
          firstLine: 3,
          lastColumn: 35,
          firstColumn: 1,
          subType: "warning",
          message:
            "This validator does not validate Inkscape extensions properly. Inkscape-specific errors may go unnoticed.",
          extract:
            'g11.dtd">\n<svg\n  xmlns:dc="http://purl.org/dc/elements/1.1/"\n  xmlns:cc="http://creativecommons.org/ns#"\n  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n  xmlns:svg="http://www.w3.org/2000/svg"\n  xmlns="http://www.w3.org/2000/svg"\n  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\n  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\n  width="210mm"\n  height="297mm"\n  viewBox="0 0 210 297"\n  version="1.1"\n  id="svg8"\n  inkscape:version="1.0.1 (c497b03c, 2020-09-10)"\n  sodipodi:docname="age-picto.svg">\n  <de',
          hiliteStart: 10,
          hiliteLength: 534
        },
        {
          type: "info",
          lastLine: 41,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: 'ta5">\n    <rdf:RDF>\n     ',
          hiliteStart: 10,
          hiliteLength: 9
        }
      ]
    }
  },
  {
    content: contentWithoutDoctypeWithWarnings,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          lastLine: 16,
          firstLine: 1,
          lastColumn: 35,
          firstColumn: 1,
          subType: "warning",
          message:
            "This validator does not validate Inkscape extensions properly. Inkscape-specific errors may go unnoticed.",
          extract:
            '\n<svg\n  xmlns:dc="http://purl.org/dc/elements/1.1/"\n  xmlns:cc="http://creativecommons.org/ns#"\n  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n  xmlns:svg="http://www.w3.org/2000/svg"\n  xmlns="http://www.w3.org/2000/svg"\n  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\n  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\n  width="210mm"\n  height="297mm"\n  viewBox="0 0 210 297"\n  version="1.1"\n  id="svg8"\n  inkscape:version="1.0.1 (c497b03c, 2020-09-10)"\n  sodipodi:docname="age-picto.svg">\n  <d',
          hiliteStart: 0,
          hiliteLength: 535
        },
        {
          type: "info",
          lastLine: 40,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: 'ta5">\n    <rdf:RDF>',
          hiliteStart: 10,
          hiliteLength: 9
        }
      ]
    }
  },
  {
    content: contentWithoutPrologWithWarnings,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "info",
          lastLine: 15,
          firstLine: 1,
          lastColumn: 35,
          firstColumn: 1,
          subType: "warning",
          message:
            "This validator does not validate Inkscape extensions properly. Inkscape-specific errors may go unnoticed.",
          extract:
            '<svg\n  xmlns:dc="http://purl.org/dc/elements/1.1/"\n  xmlns:cc="http://creativecommons.org/ns#"\n  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n  xmlns:svg="http://www.w3.org/2000/svg"\n  xmlns="http://www.w3.org/2000/svg"\n  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\n  xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\n  width="210mm"\n  height="297mm"\n  viewBox="0 0 210 297"\n  version="1.1"\n  id="svg8"\n  inkscape:version="1.0.1 (c497b03c, 2020-09-10)"\n  sodipodi:docname="age-picto.svg">\n  <de',
          hiliteStart: 0,
          hiliteLength: 534
        },
        {
          type: "info",
          lastLine: 39,
          lastColumn: 13,
          firstColumn: 5,
          subType: "warning",
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: 'ta5">\n    <rdf:RDF>\n',
          hiliteStart: 10,
          hiliteLength: 9
        }
      ]
    }
  },
  {
    content: contentWithoutWarnings,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithoutDoctypeWithoutWarnings,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithoutPrologWithoutWarnings,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithWarnings,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithoutDoctypeWithWarnings,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithoutPrologWithWarnings,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xml&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  }
];
