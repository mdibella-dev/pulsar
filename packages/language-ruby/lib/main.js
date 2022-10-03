exports.activate = function() {
<<<<<<< HEAD
  if (!atom.grammars.addInjectionPoint) return

  atom.grammars.addInjectionPoint('source.ruby', {
    type: 'heredoc_body',
    language (node) { return node.lastChild.text },
    content (node) { return node }
  })

  atom.grammars.addInjectionPoint('source.ruby', {
    type: 'regex',
    language () { return 'regex' },
    content (node) { return node }
  })
}
=======
  if (!atom.grammars.addInjectionPoint) return;

  atom.grammars.addInjectionPoint('source.ruby', {
    type: 'heredoc_body',
    language(node) {
      return node.lastChild.text;
    },
    content(node) {
      return node;
    }
  });

  atom.grammars.addInjectionPoint('source.ruby', {
    type: 'regex',
    language() {
      return 'regex';
    },
    content(node) {
      return node;
    }
  });
};
>>>>>>> origin/master
