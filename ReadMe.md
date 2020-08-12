# Express
##
### route, routing
- 갈림길에서 적당한곳에섯 자리를 잡는 것.
- 사용자들이 여러가지 path로 들어올때 알맞은 응답을 해줌.

### routing 기법 - parameter 전달
- id를 통한 parameter 전달 방식 X    
&nbsp;ex) /page/id?HTML       
- url path 를 통해 parameter를 전달    
&nbsp;ex) /page/HTML       

- url path 를 통해 parameter를 전달하는 경우 express에서 처리하는 케이스.
```
app.get('/page/:pageId', function(request, response) {
  // clinet url path : localhost:3000/page/HTML 
  // request.params = {"pageId","HTML"}
  response.send(request.params);
});
```
## 미들웨어
# body parser
- 웹브라우저에서 요청한 데이터를 분석. 필요한 형태로 가공해주는 역할
- 모듈 설치 순서(cmd에서 실행)    
&nbsp;`1`. node.js 프로젝트 경로로 이동    
&nbsp;`2`. npm install body-parser --save 입력

```javascript
// 모듈 선언
var bodyParser = require('body-parser')
```

```javascript
// bodyParser 미들웨어 장착(express + bodyParser)
app.use(bodyParser.urlencoded({ extended: false }));
```

```javascript
// bodyParser 장착 후 변화
// request.on('data'), request.on('end') 이벤트핸들러 필요 없음.
app.post('/test', function(request, response) {
     
    // 장착 전-------------------------------------------------
    /* var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
    }); */
    // -------------------------------------------------------
    
    // 장착 후------------------------------------------------- 
    var post = request.body;
    var title = post.title;
    var description = post.description;
    // -------------------------------------------------------
});
```