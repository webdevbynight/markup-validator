import type { IgnoreLevel, ValidationResult } from "../../src/types.js";

import { mockedEntryPoint } from "../utils/fixtures/mocked-entry-points.js";

const schema = encodeURIComponent("https://www.w3.org/Math/RelaxNG/mathml3/mathml3.rnc");
const content = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE math PUBLIC "-//W3C//DTD MathML 3.0//EN" "http://www.w3.org/Math/DTD/mathml3/mathml3.dtd">
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <mfrac>
      <mi>a</mi>
    </mfrac>
  </mrow>
</math>
`;
const contentWithoutDoctype = `<?xml version="1.0" encoding="UTF-8"?>
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <mi>a</mi> <mo>&InvisibleTimes;</mo> <msup><mi>x</mi><mn>2</mn></msup>
    <mo>+</mo><mi>b</mi><mo>&InvisibleTimes;</mo><mi>x</mi>
    <mo>+</mo><mi>c</mi>
  </mrow>
</math>
`;
const contentWithoutProlog = `<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <mi>a</mi> <mo>&InvisibleTimes;</mo> <msup><mi>x</mi><mn>2</mn></msup>
    <mo>+</mo><mi>b</mi><mo>&InvisibleTimes;</mo><mi>x</mi>
    <mo>+</mo><mi>c</mi>
  </mrow>
</math>
`;
export const mockedInvalidMathMLFilesResults: {
  content: string;
  ignoreLevel: IgnoreLevel;
  expectedEntryPoint: string;
  expectedResult: ValidationResult;
}[] = [
  {
    content,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 7,
          lastColumn: 12,
          firstColumn: 5,
          message:
            "MathML element “mfrac” is missing a required instance of one or more of the following child elements: “abs”, “and”, “apply”, “approx”, “arccos”, “arccosh”, “arccot”, “arccoth”, “arccsc”, “arccsch”, “arcsec”, “arcsech”, “arcsin”, “arcsinh”, “arctan”, “arctanh”, “arg”, “bind”, “card”, “cartesianproduct”, “cbytes”, “ceiling”, “cerror”, “ci”, “cn”, “codomain”, “complexes”, “compose”, “conjugate”, “cos”, “cosh”, “cot”, “coth”, “cs”, “csc”, “csch”, “csymbol”, “curl”, “declare”, “determinant”, “diff”, “divergence”, “divide”, “domain”, “emptyset”, “eq”, “equivalent”, “eulergamma”, “exists”, “exp”, “exponentiale”, “factorial”, “factorof”, “false”, “floor”, “fn”, “forall”, “gcd”, “geq”, “grad”, “gt”, “ident”, “image”, “imaginary”, “imaginaryi”, “implies”, “in”, “infinity”, “int”, “integers”, “intersect”, “interval”, “inverse”, “lambda”, “laplacian”, “lcm”, “leq”, “limit”, “list”, “ln”, “log”, “lt”, “maction”, “maligngroup”, “malignmark”, “matrix”, “matrixrow”, “max”, “mean”, “median”, “menclose”, “merror”, “mfenced”, “mfrac”, “mi”, “min”, “minus”, “mlongdiv”, “mmultiscripts”, “mn”, “mo”, “mode”, “moment”, “mover”, “mpadded”, “mphantom”, “mroot”, “mrow”, “ms”, “mspace”, “msqrt”, “mstack”, “mstyle”, “msub”, “msubsup”, “msup”, “mtable”, “mtext”, “munder”, “munderover”, “naturalnumbers”, “neq”, “not”, “notanumber”, “notin”, “notprsubset”, “notsubset”, “or”, “outerproduct”, “partialdiff”, “pi”, “piecewise”, “plus”, “power”, “primes”, “product”, “prsubset”, “quotient”, “rationals”, “real”, “reals”, “reln”, “rem”, “root”, “scalarproduct”, “sdev”, “sec”, “sech”, “selector”, “semantics”, “set”, “setdiff”, “share”, “sin”, “sinh”, “subset”, “sum”, “tan”, “tanh”, “tendsto”, “times”, “transpose”, “true”, “union”, “variance”, “vector”, “vectorproduct”, “xor”.",
          extract: "</mi>\n    </mfrac>\n  </m",
          hiliteStart: 10,
          hiliteLength: 8
        }
      ]
    }
  },
  {
    content: contentWithoutDoctype,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 4,
          lastColumn: 35,
          subType: "fatal",
          message: "reference to undeclared general entity InvisibleTimes",
          extract: "&InvisibleTimes;</mo> <msup><m",
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  },
  {
    content: contentWithoutProlog,
    ignoreLevel: null,
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 3,
          lastColumn: 35,
          subType: "fatal",
          message: "reference to undeclared general entity InvisibleTimes",
          extract: "&InvisibleTimes;</mo> <msup><m",
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  },
  {
    content,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 7,
          lastColumn: 12,
          firstColumn: 5,
          message:
            "MathML element “mfrac” is missing a required instance of one or more of the following child elements: “abs”, “and”, “apply”, “approx”, “arccos”, “arccosh”, “arccot”, “arccoth”, “arccsc”, “arccsch”, “arcsec”, “arcsech”, “arcsin”, “arcsinh”, “arctan”, “arctanh”, “arg”, “bind”, “card”, “cartesianproduct”, “cbytes”, “ceiling”, “cerror”, “ci”, “cn”, “codomain”, “complexes”, “compose”, “conjugate”, “cos”, “cosh”, “cot”, “coth”, “cs”, “csc”, “csch”, “csymbol”, “curl”, “declare”, “determinant”, “diff”, “divergence”, “divide”, “domain”, “emptyset”, “eq”, “equivalent”, “eulergamma”, “exists”, “exp”, “exponentiale”, “factorial”, “factorof”, “false”, “floor”, “fn”, “forall”, “gcd”, “geq”, “grad”, “gt”, “ident”, “image”, “imaginary”, “imaginaryi”, “implies”, “in”, “infinity”, “int”, “integers”, “intersect”, “interval”, “inverse”, “lambda”, “laplacian”, “lcm”, “leq”, “limit”, “list”, “ln”, “log”, “lt”, “maction”, “maligngroup”, “malignmark”, “matrix”, “matrixrow”, “max”, “mean”, “median”, “menclose”, “merror”, “mfenced”, “mfrac”, “mi”, “min”, “minus”, “mlongdiv”, “mmultiscripts”, “mn”, “mo”, “mode”, “moment”, “mover”, “mpadded”, “mphantom”, “mroot”, “mrow”, “ms”, “mspace”, “msqrt”, “mstack”, “mstyle”, “msub”, “msubsup”, “msup”, “mtable”, “mtext”, “munder”, “munderover”, “naturalnumbers”, “neq”, “not”, “notanumber”, “notin”, “notprsubset”, “notsubset”, “or”, “outerproduct”, “partialdiff”, “pi”, “piecewise”, “plus”, “power”, “primes”, “product”, “prsubset”, “quotient”, “rationals”, “real”, “reals”, “reln”, “rem”, “root”, “scalarproduct”, “sdev”, “sec”, “sech”, “selector”, “semantics”, “set”, “setdiff”, “share”, “sin”, “sinh”, “subset”, “sum”, “tan”, “tanh”, “tendsto”, “times”, “transpose”, “true”, “union”, “variance”, “vector”, “vectorproduct”, “xor”.",
          extract: "</mi>\n    </mfrac>\n  </m",
          hiliteStart: 10,
          hiliteLength: 8
        }
      ]
    }
  },
  {
    content: contentWithoutDoctype,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 4,
          lastColumn: 35,
          subType: "fatal",
          message: "reference to undeclared general entity InvisibleTimes",
          extract: "&InvisibleTimes;</mo> <msup><m",
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  },
  {
    content: contentWithoutProlog,
    ignoreLevel: "info",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}&level=warning`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 3,
          lastColumn: 35,
          subType: "fatal",
          message: "reference to undeclared general entity InvisibleTimes",
          extract: "&InvisibleTimes;</mo> <msup><m",
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  },
  {
    content,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 7,
          lastColumn: 12,
          firstColumn: 5,
          message:
            "MathML element “mfrac” is missing a required instance of one or more of the following child elements: “abs”, “and”, “apply”, “approx”, “arccos”, “arccosh”, “arccot”, “arccoth”, “arccsc”, “arccsch”, “arcsec”, “arcsech”, “arcsin”, “arcsinh”, “arctan”, “arctanh”, “arg”, “bind”, “card”, “cartesianproduct”, “cbytes”, “ceiling”, “cerror”, “ci”, “cn”, “codomain”, “complexes”, “compose”, “conjugate”, “cos”, “cosh”, “cot”, “coth”, “cs”, “csc”, “csch”, “csymbol”, “curl”, “declare”, “determinant”, “diff”, “divergence”, “divide”, “domain”, “emptyset”, “eq”, “equivalent”, “eulergamma”, “exists”, “exp”, “exponentiale”, “factorial”, “factorof”, “false”, “floor”, “fn”, “forall”, “gcd”, “geq”, “grad”, “gt”, “ident”, “image”, “imaginary”, “imaginaryi”, “implies”, “in”, “infinity”, “int”, “integers”, “intersect”, “interval”, “inverse”, “lambda”, “laplacian”, “lcm”, “leq”, “limit”, “list”, “ln”, “log”, “lt”, “maction”, “maligngroup”, “malignmark”, “matrix”, “matrixrow”, “max”, “mean”, “median”, “menclose”, “merror”, “mfenced”, “mfrac”, “mi”, “min”, “minus”, “mlongdiv”, “mmultiscripts”, “mn”, “mo”, “mode”, “moment”, “mover”, “mpadded”, “mphantom”, “mroot”, “mrow”, “ms”, “mspace”, “msqrt”, “mstack”, “mstyle”, “msub”, “msubsup”, “msup”, “mtable”, “mtext”, “munder”, “munderover”, “naturalnumbers”, “neq”, “not”, “notanumber”, “notin”, “notprsubset”, “notsubset”, “or”, “outerproduct”, “partialdiff”, “pi”, “piecewise”, “plus”, “power”, “primes”, “product”, “prsubset”, “quotient”, “rationals”, “real”, “reals”, “reln”, “rem”, “root”, “scalarproduct”, “sdev”, “sec”, “sech”, “selector”, “semantics”, “set”, “setdiff”, “share”, “sin”, “sinh”, “subset”, “sum”, “tan”, “tanh”, “tendsto”, “times”, “transpose”, “true”, “union”, “variance”, “vector”, “vectorproduct”, “xor”.",
          extract: "</mi>\n    </mfrac>\n  </m",
          hiliteStart: 10,
          hiliteLength: 8
        }
      ]
    }
  },
  {
    content: contentWithoutDoctype,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 4,
          lastColumn: 35,
          subType: "fatal",
          message: "reference to undeclared general entity InvisibleTimes",
          extract: "&InvisibleTimes;</mo> <msup><m",
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  },
  {
    content: contentWithoutProlog,
    ignoreLevel: "warning",
    expectedEntryPoint: `${mockedEntryPoint}?out=json&parser=xmldtd&schema=${schema}&level=error`,
    expectedResult: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 3,
          lastColumn: 35,
          subType: "fatal",
          message: "reference to undeclared general entity InvisibleTimes",
          extract: "&InvisibleTimes;</mo> <msup><m",
          hiliteStart: 15,
          hiliteLength: 1
        }
      ]
    }
  }
];
