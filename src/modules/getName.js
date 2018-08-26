const getName = (link) => {
  if (typeof link !== 'string') throw new ReferenceError('Invalid Link passed to getName helper');
  if (link.length) {
    let name = /problems[^/]*\/(.*?)(\/|$)/.exec(link)[1].split('-');
    name = name.map(v => `${v[0].toUpperCase()}${v.slice(1)}`).join(' ');
    return name;
  }
  return 'New Item';
};

export default getName;
