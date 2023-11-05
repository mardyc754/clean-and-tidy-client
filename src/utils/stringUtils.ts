export function convertToCamelCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word, i) => {
      return i === 0
        ? word.toLowerCase()
        : word.replace('/', '').charAt(0).toUpperCase().concat(word.slice(1));
    })
    .join('');
}
