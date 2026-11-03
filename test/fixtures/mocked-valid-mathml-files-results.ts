import type { IgnoreLevel, ValidationResult } from "../../src/types.js";

import { mockedEntryPoint } from "../utils/fixtures/mocked-entry-points.js";

const schema = encodeURIComponent("https://www.w3.org/Math/RelaxNG/mathml3/mathml3.rnc");
const content = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE math PUBLIC "-//W3C//DTD MathML 3.0//EN" "http://www.w3.org/Math/DTD/mathml3/mathml3.dtd">
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <mi>a</mi> <mo>&InvisibleTimes;</mo> <msup><mi>x</mi><mn>2</mn></msup>
    <mo>+</mo><mi>b</mi><mo>&InvisibleTimes;</mo><mi>x</mi>
    <mo>+</mo><mi>c</mi>
  </mrow>
</math>
`;
const contentWithoutDoctype = `<?xml version="1.0" encoding="UTF-8"?>
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <mi>a</mi> <mo>&#x2062;</mo> <msup><mi>x</mi><mn>2</mn></msup>
    <mo>+</mo><mi>b</mi><mo>&#x2062;</mo><mi>x</mi>
    <mo>+</mo><mi>c</mi>
  </mrow>
</math>
`;
const contentWithoutProlog = `<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <mi>a</mi> <mo>&#x2062;</mo> <msup><mi>x</mi><mn>2</mn></msup>
    <mo>+</mo><mi>b</mi><mo>&#x2062;</mo><mi>x</mi>
    <mo>+</mo><mi>c</mi>
  </mrow>
</math>
`;
export const mockedValidMathMLFilesResults: {
  content: string;
  ignoreLevel: IgnoreLevel;
  expectedEntryPoint: string;
  expectedResult: ValidationResult;
}[] = [
  {
    content: content,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithoutDoctype,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithoutProlog,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: content,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithoutDoctype,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithoutProlog,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: content,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithoutDoctype,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  },
  {
    content: contentWithoutProlog,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: []
    }
  }
];
