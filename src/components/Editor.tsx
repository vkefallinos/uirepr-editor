import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Download } from 'lucide-react';
import * as ReactCore from '@digigov/react-core';
import * as ts from 'typescript';

interface EditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  filename: string;
}
/**
 * Extracts the UIRepr object from the provided TypeScript AST.
 * @param sourceFile The TypeScript SourceFile AST.
 * @returns The extracted UIRepr object or null if not found.
 */
function extractUIRepr(sourceFile: ts.SourceFile): UIRepr | null {
  let uiRepr: UIRepr | null = null;

  // Helper function to process JSX attributes and build PropsRepr
  function processAttributes(attributes: ts.JsxAttributeLike[]): PropsRepr {
    const propsRepr: PropsRepr = {};

    attributes.forEach((attr) => {
      if (ts.isJsxAttribute(attr)) {
        const propName = attr.name.text;
        let value: any = undefined;
        let context: string | undefined = undefined;

        if (attr.initializer) {
          if (ts.isStringLiteral(attr.initializer)) {
            value = attr.initializer.text;
          } else if (ts.isJsxExpression(attr.initializer)) {
            if (attr.initializer.expression) {
              if (ts.isStringLiteral(attr.initializer.expression)) {
                value = attr.initializer.expression.text;
              } else if (ts.isNumericLiteral(attr.initializer.expression)) {
                value = Number(attr.initializer.expression.text);
              } else if (
                ts.isObjectLiteralExpression(attr.initializer.expression)
              ) {
                value = parseObjectLiteral(attr.initializer.expression);
              } else if (
                ts.isArrayLiteralExpression(attr.initializer.expression)
              ) {
                value = parseArrayLiteral(attr.initializer.expression);
              } else {
                // For other expression types, you might need to handle accordingly
                value = attr.initializer.expression.getText(sourceFile);
              }
            }
          }
        }

        // Optionally handle 'context' if it's part of the props
        if (propName === 'context' && typeof value === 'string') {
          context = value;
        } else {
          propsRepr[propName] = { value, context };
        }
      }
    });

    return propsRepr;
  }
  function parseStringLiteral(str){
    return {
      component: 'TextNode',
      props: {
        text: {
          value: str
        }
      }
    }
  }
  // Helper function to parse object literals into JsonMap
  function parseObjectLiteral(objLiteral: ts.ObjectLiteralExpression): JsonMap {
    const map: JsonMap = {};
    objLiteral.properties.forEach((prop) => {
      if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
        const key = prop.name.text;
        let value: any = undefined;

        if (ts.isStringLiteral(prop.initializer)) {
          value = prop.initializer.text;
        } else if (ts.isNumericLiteral(prop.initializer)) {
          value = Number(prop.initializer.text);
        } else if (ts.isBooleanLiteral(prop.initializer)) {
          value = prop.initializer.kind === ts.SyntaxKind.TrueKeyword;
        } else if (ts.isNullLiteral(prop.initializer)) {
          value = null;
        } else if (
          ts.isIdentifier(prop.initializer) &&
          prop.initializer.text === 'undefined'
        ) {
          value = undefined;
        } else if (ts.isObjectLiteralExpression(prop.initializer)) {
          value = parseObjectLiteral(prop.initializer);
        } else if (ts.isArrayLiteralExpression(prop.initializer)) {
          value = parseArrayLiteral(prop.initializer);
        } else {
          value = prop.initializer.getText(sourceFile); // Fallback to raw text
        }

        map[key] = value;
      }
    });
    return map;
  }

  // Helper function to parse array literals into JsonArray
  function parseArrayLiteral(
    arrayLiteral: ts.ArrayLiteralExpression
  ): JsonArray {
    const array: JsonArray = [];
    arrayLiteral.elements.forEach((element) => {
      if (ts.isStringLiteral(element)) {
        array.push(element.text);
      } else if (ts.isNumericLiteral(element)) {
        array.push(Number(element.text));
      } else if (ts.isBooleanLiteral(element)) {
        array.push(element.kind === ts.SyntaxKind.TrueKeyword);
      } else if (ts.isNullLiteral(element)) {
        array.push(null);
      } else if (ts.isObjectLiteralExpression(element)) {
        array.push(parseObjectLiteral(element));
      } else if (ts.isArrayLiteralExpression(element)) {
        array.push(parseArrayLiteral(element));
      } else {
        array.push(element.getText(sourceFile)); // Fallback to raw text
      }
    });
    return array;
  }

  // Helper function to process children of a JSX element
  function processChildren(
    children: ts.NodeArray<ts.JsxChild>
  ): (UIRepr | string)[] {
    const result: (UIRepr | string)[] = [];

    children.forEach((child) => {
      if (ts.isJsxElement(child)) {
        result.push(processJsxElement(child));
      } else if (ts.isJsxSelfClosingElement(child)) {
        result.push(processJsxSelfClosingElement(child));
      } else if (ts.isJsxText(child)) {
        const text = child.text.trim();
        if (text.length > 0) {
          result.push(parseStringLiteral(text));
        }
      } else if (ts.isJsxExpression(child)) {
        if (child.expression) {
          const exprText = child.expression.getText(sourceFile).trim();
          if (exprText.length > 0) {
            result.push(exprText);
          }
        }
      }
    });

    return result;
  }

  // Process a JSX element and return UIRepr
  function processJsxElement(element: ts.JsxElement): UIRepr {
    const openingElement = element.openingElement;
    const tagName = openingElement.tagName.getText(sourceFile);

    // Initialize UIRepr
    const uirepr: UIRepr = {
      component: tagName,
    };

    // Process attributes if any
    if (
      openingElement.attributes &&
      openingElement.attributes.properties.length > 0
    ) {
      const props = processAttributes(
        openingElement.attributes.properties as ts.JsxAttributeLike[]
      );
      uirepr.props = props;
    }

    // Process children if any
    const children = processChildren(element.children);
    if (children.length > 0) {
      // Determine if children are all strings or UIRepr
      const allStrings = children.every((child) => typeof child === 'string');
      const allUIRepr = children.every((child) => typeof child !== 'string');

      if (allStrings) {
        uirepr.children = children as string[];
      } else if (allUIRepr) {
        uirepr.children = children as UIRepr[];
      } else {
        // Mixed types
        uirepr.children = children;
      }
    }

    return uirepr;
  }

  // Process a self-closing JSX element
  function processJsxSelfClosingElement(
    element: ts.JsxSelfClosingElement
  ): UIRepr {
    const tagName = element.tagName.getText(sourceFile);

    // Initialize UIRepr
    const uirepr: UIRepr = {
      component: tagName,
    };

    // Process attributes if any
    if (element.attributes && element.attributes.properties.length > 0) {
      const props = processAttributes(
        element.attributes.properties as ts.JsxAttributeLike[]
      );
      uirepr.props = props;
    }

    return uirepr;
  }

  // Traverse the AST to find the default export and process its returned JSX
  function traverse(node: ts.Node) {
    if (
      ts.isExportAssignment(node) &&
      (ts.isArrowFunction(node.expression) ||
        ts.isFunctionExpression(node.expression))
    ) {
      const func = node.expression;
      if (ts.isArrowFunction(func) || ts.isFunctionExpression(func)) {
        // Find the JSX returned by the function
        if (ts.isBlock(func.body)) {
          // Function body is a block, look for return statement
          func.body.statements.forEach((statement) => {
            if (ts.isReturnStatement(statement) && statement.expression) {
              const jsx = statement.expression;
              if (ts.isJsxElement(jsx)) {
                uiRepr = processJsxElement(jsx);
              } else if (ts.isJsxFragment(jsx)) {
                // If it's a fragment, process its children
                const fragmentChildren = processChildren(jsx.children);
                // Assuming the first child is the main UIRepr
                if (fragmentChildren.length > 0) {
                  if (typeof fragmentChildren[0] !== 'string') {
                    uiRepr = fragmentChildren[0] as UIRepr;
                  }
                }
              }
            }
          });
        } else {
          // Arrow function with expression body
          const jsx = func.body.expression;
          if (ts.isJsxElement(jsx)) {
            uiRepr = processJsxElement(jsx);
          } else if (ts.isJsxFragment(jsx)) {
            const fragmentChildren = processChildren(jsx.children);
            if (fragmentChildren.length > 0) {
              if (typeof fragmentChildren[0] !== 'string') {
                uiRepr = fragmentChildren[0] as UIRepr;
              }
            }
          }
        }
      }
    }
    ts.forEachChild(node, traverse);
  }

  traverse(sourceFile);

  return uiRepr;
}
const Editor: React.FC<EditorProps> = ({ value, onChange, filename }) => {
  const handleExportJSON = () => {
    try {
      const sourceFile = ts.createSourceFile(
        filename,
        value,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX
      );
      const jsonAST = JSON.stringify(extractUIRepr(sourceFile), null, 2);
      const blob = new Blob([jsonAST], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename.replace('.tsx', '')}_ast.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting JSON:', error);
      alert('Error exporting JSON. Please check the console for details.');
    }
  };
  const [uiRepr, setUIRepr] = useState('');
  const handleViewJSON = () => {
    const sourceFile = ts.createSourceFile(
      filename,
      value,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX
    );
    const jsonAST = JSON.stringify(extractUIRepr(sourceFile), null, 2);
    setUIRepr(jsonAST);
  };

  const beforeMount = (monaco: any) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
      typeRoots: ['node_modules/@types'],
    });

    // Add type definitions for ReactCore components
    const reactCoreComponents = Object.keys(ReactCore).join(', ');
    const reactCoreDefinition = `
      declare module '@digigov/react-core' {
        import React from 'react';
        ${Object.keys(ReactCore)
          .map((component) => `export const ${component}: React.FC<any>;`)
          .join('\n')}
      }
    `;
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      reactCoreDefinition,
      'file:///node_modules/digigov/react-core/index.d.ts'
    );

    // Add global imports for ReactCore components
    const globalImports = `import React from 'react';\nimport { ${reactCoreComponents} } from '@digigov/react-core';\n\n`;
    monaco.editor.createModel(
      globalImports,
      'typescript',
      monaco.Uri.parse('file:///globals.d.ts')
    );
  };

  return (
    <div className="w-1/2 h-full flex flex-col">
      {uiRepr ? (
        <>
          <ReactCore.Button
            onClick={() => {
              setUIRepr(null);
            }}
          >
            <Download size={16} className="mr-1" /> Close UIRepr
          </ReactCore.Button>
          <MonacoEditor
            height="calc(100% - 40px)"
            language="json"
            theme="vs-dark"
            value={uiRepr}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </>
      ) : (
        <>
          <div className="bg-gray-200 p-2 flex justify-between items-center">
            <span>{filename}</span>
            <ReactCore.Button onClick={handleExportJSON}>
              <Download size={16} className="mr-1" /> Export UIRepr
            </ReactCore.Button>
            <ReactCore.Button onClick={handleViewJSON}>
              <Download size={16} className="mr-1" /> View UIRepr
            </ReactCore.Button>
          </div>
          <MonacoEditor
            height="calc(100% - 40px)"
            language="typescript"
            theme="vs-dark"
            value={value}
            onChange={onChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
            beforeMount={beforeMount}
          />
        </>
      )}
    </div>
  );
};

export default Editor;
