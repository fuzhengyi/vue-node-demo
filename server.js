import http from 'http';
import fs from 'fs';
const hostname = '127.0.0.1';
const port = 3000;

import { renderToString } from 'vue/server-renderer';
import { createApp } from './public/app.js';
import { getMime } from './model/getMime.js';
import path from 'path';

const server = http.createServer((req, res) => {
  const pathname = req.url;
  //获取文件后缀名
  const extname = path.extname(pathname);
  const mime = getMime(extname);
  res.setHeader('Content-Type', mime);
  const app = createApp();

  (async () => {
    const html = await renderToString(app);
    console.log(html);
    //浏览器渲染的静态文件在放在public文件夹下面
    if (req.url.indexOf('/public/') !== -1) {
      fs.readFile('.' + req.url, (err, data) => {
        if (err) {
          res.end('404');
          return;
        }
        res.end(data);
      });
    } else if ((req.url = '/')) {
      res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vue SSR Example</title>
          <script type="importmap">
            {
              "imports": {
                "vue": "https://unpkg.com/vue@3.2.33/dist/vue.esm-browser.js"
              }
            }
          </script>
          <script type="module" src="/public/client.js"></script>
          <link rel="stylesheet" type="text/css" href="/public/index.css">
        </head>
        <body>
          <div id="app">${html}</div>
        </body>
      </html>
      `);
    }
  })();
});

server.listen(port, hostname, () => {
  console.log(`服务运行在http://${hostname}:${port}/`);
});
