import type { Language, ValidationReport, ValidationResult } from "../../../src/types.js";

import { mockedCwd } from "./mocked-cwd.js";

export const mockedInvalidResultReporting: {
  file: string;
  url: string;
  language: Language;
  result: ValidationResult;
  reporting: ValidationReport;
  messages: number;
  logs: {
    level: "Error" | "Warning" | "Info";
    message: string;
    place?: string;
    extract?: string;
  }[];
}[] = [
  {
    file: `${mockedCwd}/docs/invalid.html`,
    url: "docs/invalid.html",
    language: "html",
    result: {
      version: "26.2.5",
      messages: [
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
      ]
    },
    reporting: {
      language: "html",
      status: "fail",
      url: "docs/invalid.html",
      messages: [
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
    },
    messages: 3,
    logs: [
      {
        level: "Error",
        message: "Element “title” must not be empty.",
        place: "line 5, column 12",
        extract: "   <title></title>\\n  </h"
      },
      {
        level: "Warning",
        message:
          "Section lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all sections, or else use a “div” element instead for any cases where no heading is needed.",
        place: "line 10, column 5",
        extract: "</h1>\\n    <section>\\n     "
      },
      {
        level: "Error",
        message:
          "Element “p” not allowed as child of element “span” in this context. (Suppressing further errors from this subtree.)",
        place: "line 13, column 11",
        extract: "    <span><p>A phra"
      }
    ]
  },
  {
    file: `${mockedCwd}/docs/invalid.css`,
    url: "docs/invalid.css",
    language: "css",
    result: {
      version: "26.2.5",
      messages: [
        {
          type: "error",
          lastLine: 4,
          lastColumn: 15,
          firstColumn: 12,
          message: "“display”: “nine” is not a “display” value.",
          extract: 'tf-8";\\n\\n.element {\\n  display: nine;\\n}\\n@m',
          hiliteStart: 30,
          hiliteLength: 4
        },
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
      status: "fail",
      url: "docs/invalid.css",
      messages: [
        {
          type: "error",
          line: 4,
          column: 12,
          message: "“display”: “nine” is not a “display” value.",
          extract: 'tf-8";\\n\\n.element {\\n  display: nine;\\n}\\n@m'
        },
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
    messages: 4,
    logs: [
      {
        level: "Error",
        message: "“display”: “nine” is not a “display” value.",
        place: "line 4, column 12",
        extract: 'tf-8";\\n\\n.element {\\n  display: nine;\\n}\\n@m'
      },
      {
        level: "Warning",
        message:
          "“font-family”: You are encouraged to offer a generic family as a last alternative",
        place: "line 8, column 6",
        extract: 'font-family: "JetBrains Mono"'
      },
      {
        level: "Warning",
        message:
          "You have no background-color set (or background-color is set to transparent) but you have set a color. Make sure that cascading of colors keeps the text reasonably legible.",
        place: "line 9, column 6",
        extract: "color: red"
      },
      {
        level: "Warning",
        message: "“-webkit-appearance” is a vendor extension",
        place: "line 10, column 6",
        extract: "-webkit-appearance: none"
      }
    ]
  },
  {
    file: `${mockedCwd}/docs/invalid.svg`,
    url: "docs/invalid.svg",
    language: "svg",
    result: {
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
    },
    reporting: {
      language: "svg",
      status: "fail",
      url: "docs/invalid.svg",
      messages: [
        {
          type: "info",
          message: "Using the preset for SVG + URL + HTML + MathML based on the root namespace."
        },
        {
          type: "warning",
          line: 5,
          column: 5,
          message: "This validator does not validate RDF. RDF subtrees go unchecked.",
          extract: "data>\\n    <rdf:RDF>\\n     "
        },
        {
          type: "error",
          line: 19,
          column: 59,
          message: "undeclared attribute prefix in: xlink:href",
          extract: 'rm="scale(.8)"/>\\n  <use xlink:'
        }
      ]
    },
    messages: 3,
    logs: [
      {
        level: "Info",
        message: "Using the preset for SVG + URL + HTML + MathML based on the root namespace."
      },
      {
        level: "Warning",
        message: "This validator does not validate RDF. RDF subtrees go unchecked.",
        place: "line 5, column 5",
        extract: "data>\\n    <rdf:RDF>\\n     "
      },
      {
        level: "Error",
        message: "undeclared attribute prefix in: xlink:href",
        place: "line 19, column 59",
        extract: 'rm="scale(.8)"/>\\n  <use xlink:'
      }
    ]
  },
  {
    file: `${mockedCwd}/docs/invalid.mml`,
    url: "docs/invalid.mml",
    language: "mathml",
    result: {
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
    },
    reporting: {
      language: "mathml",
      status: "fail",
      url: "docs/invalid.mml",
      messages: [
        {
          type: "error",
          line: 7,
          column: 5,
          message:
            "MathML element “mfrac” is missing a required instance of one or more of the following child elements: “abs”, “and”, “apply”, “approx”, “arccos”, “arccosh”, “arccot”, “arccoth”, “arccsc”, “arccsch”, “arcsec”, “arcsech”, “arcsin”, “arcsinh”, “arctan”, “arctanh”, “arg”, “bind”, “card”, “cartesianproduct”, “cbytes”, “ceiling”, “cerror”, “ci”, “cn”, “codomain”, “complexes”, “compose”, “conjugate”, “cos”, “cosh”, “cot”, “coth”, “cs”, “csc”, “csch”, “csymbol”, “curl”, “declare”, “determinant”, “diff”, “divergence”, “divide”, “domain”, “emptyset”, “eq”, “equivalent”, “eulergamma”, “exists”, “exp”, “exponentiale”, “factorial”, “factorof”, “false”, “floor”, “fn”, “forall”, “gcd”, “geq”, “grad”, “gt”, “ident”, “image”, “imaginary”, “imaginaryi”, “implies”, “in”, “infinity”, “int”, “integers”, “intersect”, “interval”, “inverse”, “lambda”, “laplacian”, “lcm”, “leq”, “limit”, “list”, “ln”, “log”, “lt”, “maction”, “maligngroup”, “malignmark”, “matrix”, “matrixrow”, “max”, “mean”, “median”, “menclose”, “merror”, “mfenced”, “mfrac”, “mi”, “min”, “minus”, “mlongdiv”, “mmultiscripts”, “mn”, “mo”, “mode”, “moment”, “mover”, “mpadded”, “mphantom”, “mroot”, “mrow”, “ms”, “mspace”, “msqrt”, “mstack”, “mstyle”, “msub”, “msubsup”, “msup”, “mtable”, “mtext”, “munder”, “munderover”, “naturalnumbers”, “neq”, “not”, “notanumber”, “notin”, “notprsubset”, “notsubset”, “or”, “outerproduct”, “partialdiff”, “pi”, “piecewise”, “plus”, “power”, “primes”, “product”, “prsubset”, “quotient”, “rationals”, “real”, “reals”, “reln”, “rem”, “root”, “scalarproduct”, “sdev”, “sec”, “sech”, “selector”, “semantics”, “set”, “setdiff”, “share”, “sin”, “sinh”, “subset”, “sum”, “tan”, “tanh”, “tendsto”, “times”, “transpose”, “true”, “union”, “variance”, “vector”, “vectorproduct”, “xor”.",
          extract: "</mi>\\n    </mfrac>\\n  </m"
        }
      ]
    },
    messages: 1,
    logs: [
      {
        level: "Error",
        message:
          "MathML element “mfrac” is missing a required instance of one or more of the following child elements: “abs”, “and”, “apply”, “approx”, “arccos”, “arccosh”, “arccot”, “arccoth”, “arccsc”, “arccsch”, “arcsec”, “arcsech”, “arcsin”, “arcsinh”, “arctan”, “arctanh”, “arg”, “bind”, “card”, “cartesianproduct”, “cbytes”, “ceiling”, “cerror”, “ci”, “cn”, “codomain”, “complexes”, “compose”, “conjugate”, “cos”, “cosh”, “cot”, “coth”, “cs”, “csc”, “csch”, “csymbol”, “curl”, “declare”, “determinant”, “diff”, “divergence”, “divide”, “domain”, “emptyset”, “eq”, “equivalent”, “eulergamma”, “exists”, “exp”, “exponentiale”, “factorial”, “factorof”, “false”, “floor”, “fn”, “forall”, “gcd”, “geq”, “grad”, “gt”, “ident”, “image”, “imaginary”, “imaginaryi”, “implies”, “in”, “infinity”, “int”, “integers”, “intersect”, “interval”, “inverse”, “lambda”, “laplacian”, “lcm”, “leq”, “limit”, “list”, “ln”, “log”, “lt”, “maction”, “maligngroup”, “malignmark”, “matrix”, “matrixrow”, “max”, “mean”, “median”, “menclose”, “merror”, “mfenced”, “mfrac”, “mi”, “min”, “minus”, “mlongdiv”, “mmultiscripts”, “mn”, “mo”, “mode”, “moment”, “mover”, “mpadded”, “mphantom”, “mroot”, “mrow”, “ms”, “mspace”, “msqrt”, “mstack”, “mstyle”, “msub”, “msubsup”, “msup”, “mtable”, “mtext”, “munder”, “munderover”, “naturalnumbers”, “neq”, “not”, “notanumber”, “notin”, “notprsubset”, “notsubset”, “or”, “outerproduct”, “partialdiff”, “pi”, “piecewise”, “plus”, “power”, “primes”, “product”, “prsubset”, “quotient”, “rationals”, “real”, “reals”, “reln”, “rem”, “root”, “scalarproduct”, “sdev”, “sec”, “sech”, “selector”, “semantics”, “set”, “setdiff”, “share”, “sin”, “sinh”, “subset”, “sum”, “tan”, “tanh”, “tendsto”, “times”, “transpose”, “true”, “union”, “variance”, “vector”, “vectorproduct”, “xor”.",
        place: "line 7, column 5",
        extract: "</mi>\\n    </mfrac>\\n  </m"
      }
    ]
  }
];
