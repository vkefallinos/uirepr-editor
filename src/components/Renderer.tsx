import React, { useEffect, useState } from 'react';
import * as DigiGovUI from '@digigov/ui';
import * as ReactCore from '@digigov/react-core';
import * as ts from 'typescript';

interface RendererProps {
  code: string;
}

const Renderer: React.FC<RendererProps> = ({ code }) => {
  const [renderedComponent, setRenderedComponent] =
    useState<React.ReactNode | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    renderCode();
  }, [code]);

  const renderCode = () => {
    try {
      // Remove import statements
      const codeWithoutImports = code.replace(/import.*?from.*?;/g, '');

      // Transpile the code
      const transpiledCode = ts.transpileModule(codeWithoutImports, {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          jsx: ts.JsxEmit.React,
          target: ts.ScriptTarget.ES2015,
        },
      }).outputText;

      // Extract the JSX from the component
      const jsxMatch = transpiledCode.match(/=>\s*\(([\s\S]*?)\);/);
      if (!jsxMatch) {
        throw new Error('No JSX found in the component');
      }

      const jsxCode = jsxMatch[1].trim();

      // Combine DigiGovUI and ReactCore components
      const componentMapping = { ...DigiGovUI, ...ReactCore };

      // Use Function constructor to create a component with all components in scope
      const ComponentFunction = new Function(
        'React',
        ...Object.keys(componentMapping),
        `
        return ${jsxCode};
      `
      );

      setRenderedComponent(
        ComponentFunction(React, ...Object.values(componentMapping))
      );
      setError(null);
    } catch (err) {
      console.error('Error rendering code:', err);
      setError(err.message);
      setRenderedComponent(null);
    }
  };

  return (
    <div className="w-1/2 h-full overflow-auto p-4 bg-white">
      <div className="border-2 border-dashed border-gray-300 p-4 min-h-full">
        {error ? (
          <div className="text-red-500">
            <p>Error rendering component:</p>
            <pre>{error}</pre>
            <p>Please check your code and try again.</p>
          </div>
        ) : (
          renderedComponent
        )}
      </div>
    </div>
  );
};

export default Renderer;
