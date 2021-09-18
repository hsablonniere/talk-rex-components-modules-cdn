export function toCamelCase (text) {
  return text.replace(/-(.)/g, (all, letter) => letter.toUpperCase());
}

export function markup (text) {
  return text
    .replace(/\*(.*)\*/g, '<strong>$1</strong>')
    .replace(/_(.*)_/g, '<em>$1</em>')
    .replace(/#(.*)#/g, '<mark>$1</mark>');
}

export function balance (text) {
  return text.includes('  ')
    ? text
      .replace(/ /g, '&nbsp;')
      .replace(/&nbsp;&nbsp;/g, ' ')
    : text;
}

export function trim (text) {
  return (typeof text === 'string') ? text.trim() : text;
}

export function entriesToObject (a, b, index, all) {
  if (index === all.length - 1) {
    return Object.fromEntries(all);
  }
}

export function getTitle () {
  return document.title;
}

export function getMeta () {
  return Array
    .from(document.head.querySelectorAll('meta[name][content]'))
    .map((node) => {
      const name = toCamelCase(node.getAttribute('name'));
      const content = node.getAttribute('content');
      return [name, content];
    })
    .reduce(entriesToObject);
}
