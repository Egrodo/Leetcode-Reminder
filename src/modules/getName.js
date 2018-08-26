const getName = (link) => {
  let name = /problems[^/]*\/(.*?)(\/|$)/.exec(link)[1].split('-');
  name = name.map(v => `${v[0].toUpperCase()}${v.slice(1)}`).join(' ');
  return name;
};

export default getName;
