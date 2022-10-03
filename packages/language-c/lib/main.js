<<<<<<< HEAD
exports.activate = function () {
=======
exports.activate = function() {
>>>>>>> origin/master
  // Highlight macro bodies as C/C++
  for (const language of ['c', 'cpp']) {
    for (const nodeType of ['preproc_def', 'preproc_function_def']) {
      atom.grammars.addInjectionPoint(`source.${language}`, {
        type: nodeType,
<<<<<<< HEAD
        language (node) { return language },
        content (node) { return node.lastNamedChild }
      })
    }
  }
}
=======
        language(node) {
          return language;
        },
        content(node) {
          return node.lastNamedChild;
        }
      });
    }
  }
};
>>>>>>> origin/master
