<<<<<<< HEAD
exports.activate = function () {
=======
exports.activate = function() {
>>>>>>> origin/master
  for (const scopeName of ['source.ts', 'source.flow']) {
    atom.grammars.addInjectionPoint(scopeName, {
      type: 'call_expression',

<<<<<<< HEAD
      language (callExpression) {
        const {firstChild} = callExpression
        switch (firstChild.type) {
          case 'identifier':
            return languageStringForTemplateTag(firstChild.text)
          case 'member_expression':
            if (firstChild.startPosition.row === firstChild.endPosition.row) {
              return languageStringForTemplateTag(firstChild.text)
=======
      language(callExpression) {
        const { firstChild } = callExpression;
        switch (firstChild.type) {
          case 'identifier':
            return languageStringForTemplateTag(firstChild.text);
          case 'member_expression':
            if (firstChild.startPosition.row === firstChild.endPosition.row) {
              return languageStringForTemplateTag(firstChild.text);
>>>>>>> origin/master
            }
        }
      },

<<<<<<< HEAD
      content (callExpression) {
        const {lastChild} = callExpression
        if (lastChild.type === 'template_string') {
          return lastChild
        }
      }
    })
=======
      content(callExpression) {
        const { lastChild } = callExpression;
        if (lastChild.type === 'template_string') {
          return lastChild;
        }
      }
    });
>>>>>>> origin/master

    atom.grammars.addInjectionPoint(scopeName, {
      type: 'assignment_expression',

<<<<<<< HEAD
      language (callExpression) {
        const {firstChild} = callExpression
        if (firstChild.type === 'member_expression') {
          if (firstChild.lastChild.text === 'innerHTML') {
            return 'html'
=======
      language(callExpression) {
        const { firstChild } = callExpression;
        if (firstChild.type === 'member_expression') {
          if (firstChild.lastChild.text === 'innerHTML') {
            return 'html';
>>>>>>> origin/master
          }
        }
      },

<<<<<<< HEAD
      content (callExpression) {
        const {lastChild} = callExpression
        if (lastChild.type === 'template_string') {
          return lastChild
        }
      }
    })

    atom.grammars.addInjectionPoint(scopeName, {
      type: 'regex_pattern',
      language (regex) { return 'regex' },
      content (regex) { return regex }
    })
  }
}

const STYLED_REGEX = /\bstyled\b/i

function languageStringForTemplateTag (tag) {
  if (STYLED_REGEX.test(tag)) {
    return 'CSS'
  } else {
    return tag
=======
      content(callExpression) {
        const { lastChild } = callExpression;
        if (lastChild.type === 'template_string') {
          return lastChild;
        }
      }
    });

    atom.grammars.addInjectionPoint(scopeName, {
      type: 'regex_pattern',
      language(regex) {
        return 'regex';
      },
      content(regex) {
        return regex;
      }
    });
  }
};

const STYLED_REGEX = /\bstyled\b/i;

function languageStringForTemplateTag(tag) {
  if (STYLED_REGEX.test(tag)) {
    return 'CSS';
  } else {
    return tag;
>>>>>>> origin/master
  }
}
