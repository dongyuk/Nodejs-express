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
- 웹브라우저 쪽에서 요청한 데이터를 분석해서 필요한 형태로 가공해주는 역할을 한다.
- 모듈 설치 순서(cmd에서 실행)    
&nbsp;`1`. node.js 프로젝트 경로로 이동
&nbsp;`2`. npm install body-parser --save 입력
- 모듈 선언
```
var bodyParser = require('body-parser')
```
- bodyParser 미들웨어 장착
```
app.use(bodyParser.urlencoded({ extended: false }));
```