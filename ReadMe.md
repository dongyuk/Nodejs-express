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
```javascript
app.get('/page/:pageId', function(request, response) {
  // clinet url path : localhost:3000/page/HTML 
  // request.params = {"pageId","HTML"}
  response.send(request.params);
});
```
##
## 미들웨어
```javascript
// 미들웨어는 함수다.
// 함수인자가 정해져 있다.
// 인자1 request / 인자2 response / 인자3 next
function(req, res, next) {
  next() // 다음 미들웨어를 실행한다.
}
```

```javascript
var express = require('express')
var app = express()

// 예제 1
// route 경로가없는 use 함수
// 앱이 요청을 받을 때마다 실행됨.
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// 예제 2
// /user/:id경로에 route 된 미들웨어 기능 
// 이 함수는 /user/:id경로 에서 모든 유형의 HTTP 요청에 대해 실행됨.
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
```

##
## Third-party middleware(남이 만든 미들웨어)
### body parser
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
##
### compression
- 웹서버가 웹브라우저에게 응답할 때 압축해서 데이터 전달해주는 역할. 
- 효과 : 데이터 양이 획기적으로 줄어든다.
- 모듈 설치 순서(cmd에서 실행)    
&nbsp;`1`. node.js 프로젝트 경로로 이동    
&nbsp;`2`. npm install compression --save 입력

```javascript
// 모듈 선언
var compression = require('compression')
```

```javascript
// compression 미들웨어 장착(express + compression)
app.use(compression());
```