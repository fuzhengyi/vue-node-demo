export function getMime(extname) {
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.gif':
      return `image/${extname.substr(1)}`;
    case '.png':
      return `image/${extname.substr(1)}`;
    case '.jpg':
      return `image/${extname.substr(1)}`;
    case '.jpeg':
      return `image/${extname.substr(1)}`;
    default:
      return 'text/html';
  }
}
