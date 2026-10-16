import { it, expect } from "vitest";
import ts from "typescript";
import { advancedCompositionEntries } from "../../../apps/playground/src/registry/advanced-compositions";
it("binds each advanced code-pane configuration to a component declared in its source", async () => {
  for (const entry of advancedCompositionEntries) {
    for (const variant of entry.variants) {
      const code = await variant.loadCode();
      const source = ts.createSourceFile(
        variant.id + ".tsx",
        code,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      );
      const names = new Set<string>();
      for (const statement of source.statements) {
        if (ts.isFunctionDeclaration(statement) && statement.name)
          names.add(statement.name.text);
        if (ts.isVariableStatement(statement))
          for (const declaration of statement.declarationList.declarations)
            if (ts.isIdentifier(declaration.name))
              names.add(declaration.name.text);
      }
      const configuration = source.statements.at(-1);
      expect(
        configuration && ts.isExpressionStatement(configuration),
        variant.id,
      ).toBe(true);
      if (
        configuration &&
        ts.isExpressionStatement(configuration) &&
        ts.isJsxSelfClosingElement(configuration.expression)
      )
        expect(
          names.has(configuration.expression.tagName.getText(source)),
          variant.id,
        ).toBe(true);
      else throw Error("Missing configuration in " + variant.id);
    }
  }
});
