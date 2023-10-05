const fs = require("fs");
const http = require("http");
const templateOverview = fs.readFileSync(`${__dirname}/template/overview.html`, "utf8");
const templateProduct = fs.readFileSync(`${__dirname}/template/product.html`, "utf8");
const templateCard = fs.readFileSync(`${__dirname}/template/template-card.html`, "utf8");
const data = fs.readFileSync(`${__dirname}/data.json`, "utf8");
const dataObj = JSON.parse(data);
const replaceTemplate = require('./replaceTemplate');
const url = require('url');

const server = http.createServer((req, res) => {
  const {query, pathname} = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const cardsHtml = dataObj.map((el) => replaceTemplate(templateCard, el));
    const output = templateOverview.replace('{%PRODUCT__CARD%}', cardsHtml);
    res.end(output);
  }

  else if (pathname === "/product") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateProduct, product);
    res.end(output);
  } 

  else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  }

  else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-own-header": "hello world",
    });
    res.end("<h1>page not found 404</h1>");
  }

});

server.listen(5000, () => {
  console.log("server running on port 8000");
});
