/*
https://github.com/facebook/jscodeshift
https://github.com/benjamn/ast-types/tree/master/def
https://astexplorer.net/
jscodeshift -t demo/codemod.js demo/*.js

function input() {

}

const output = () => {

}

*/

function codemod(file, api) {
  const j = api.jscodeshift;
  const ast = j(file.source);

  ast
    .find(j.FunctionDeclaration)
    .forEach(function(path) {
      j(path).replaceWith(
        j.variableDeclaration('const', [
          j.variableDeclarator(
            path.node.id,
            j.arrowFunctionExpression(path.node.params, path.node.body)
          )
        ])
      )
    });

  return ast.toSource();
}


module.exports = codemod;
