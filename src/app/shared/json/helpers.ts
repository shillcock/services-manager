export const syntaxHighlight = (
  jsonString: string,
  opts = {
    numberClass: 'json-number',
    stringClass: 'json-string',
    keyClass: 'json-key',
    booleanClass: 'json-boolean',
    nullClass: 'json-null'
  }
) => {
  const escappedJson = jsonString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escappedJson.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match: any) => {
      let cls = opts.numberClass;
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = opts.keyClass;
        } else {
          cls = opts.stringClass;
        }
      } else if (/true|false/.test(match)) {
        cls = opts.booleanClass;
      } else if (/null/.test(match)) {
        cls = opts.nullClass;
      }
      return '<span class="' + cls + '">' + match + '</span>';
    }
  );
};
