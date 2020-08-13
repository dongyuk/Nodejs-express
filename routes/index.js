var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');

// route, routing
// 갈림길에서 적당한곳에섯 자리를 잡는 것.
// 사용자들이 여러가지 path로 들어올때 알맞은 응답을 해줌.
//app.get('/', (req, res) => res.send('Hello World!'))
router.get('/', function(request, response) {
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `
      <h2>${title}</h2>${description}
      <img src="/images/hello.jpg" style="width:300px; display:block; margin-top:10px;">
      `,
      `<a href="/topic/create">create</a>`
    );
    response.send(html);
  });
  
  module.exports = router;