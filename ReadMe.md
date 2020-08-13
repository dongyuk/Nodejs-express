# Express
##
### route, routing
- 갈림길에서 적당한곳에서 자리를 잡는 것.
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
- 생코 曰 미들웨어란? 애플리케이션이 구동될 때 각각의 프로그램들이 서로와 서로를 연결해주는 작은 소프트웨어.
- express 에서는 모든 게 미들웨어라고 할 수 있다.
- 미들웨어는 순차적으로 실행된다.
- 미들웨어는 함수다.
- 함수 인자가 정해져 있다.
```javascript
// 1. 인자1 request / 인자2 response / 인자3 next
// 2. next 설명: 다음에 호출돼야 할 미들웨어 객체
// 3. 다음 미들웨어를 호출할지 말지 이전 미들웨어가 결정한다.
function(req, res, next) {
  next() // 다음 미들웨어를 실행한다.
}
```

- 미들웨어 예제
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

// 예제 3 
// 경로 및 해당 핸들러 기능 (미들웨어 시스템). 
// 이 함수는 /user/:id경로 에 대한 GET 요청을 처리
app.get('/user/:id', function (req, res, next) {
  res.send('USER')
})

// 예제 4
// 미들웨어를 여러 개 호출 가능. 
// /user/:id 경로에서 모든 유형의 HTTP 요청에 대해 실행 됨.
// 2번째 미들웨어(콜백함수) 호출 후 next()로 3번째 미들웨어(콜백함수) 호출.
app.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// 예제5
// /user/:id경로 에 대한 GET 요청을 처리하는 미들웨어
// route가 같음. 
// /user/id 요청 시 실행 순서  
// 1. (1) get함수 실행. 
// 2. callback함수 next() 실행. 다음인자의 콜백함수 실행
// 3. 웹브라우저에 응답 후 종료.
// (1) 요청-응답주기를 종료하므로 (2) 호출되지 않음.
// (1)
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id)
  next()
}, function (req, res, next) {
  res.send('User Info')
})

// (2)
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id)
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

##
### 에러처리
- 다른 미들웨어 함수와 동일한 방식으로 오류 처리 미들웨어 함수를 정의.
- 단, 오류 처리 함수에는 3 개 대신 4 개의 인수가 (err, req, res, next)로 약속 됨.
```javascript
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

- 에러발생시 오류처리 미들웨어 호출 예제
```javascript
// 에러발생 시 실행 순서  
// 1. if (err) 구문 next(err) 실행 
// 2. 에러처리 미들웨어(함수) 호출
app.get('/', function (req, res, next) {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})

// 에러처리 함수
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

##
## Express.Router
- 라우터를 모듈로 생성 => 그 안에 미들웨어 기능을로드 => 일부 경로를 정의 => 기본 앱의 경로에 라우터 모듈을 마운트 예제

- birds.js(라우터 모듈)
```javascript
var express = require('express')
var router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router

```

- main.js
```javascript
// 모듈 선언
var birdRouter = require('./birds'); 

// ...

// /birds 으로 들어오면 처리되는 birdRouter 미들웨어 적용
// 라우터 모듈 안에서 라우팅할 때는 /birds 는 생략 해야 함. case1, case2에서 설명
app.use('/birds', birdRouter);
```

- case 1    
&nbsp;`1`. /birds/about 로 요청 시 birdRouter 모듈 호출      
&nbsp;`2`. birds.js의 router.get('/about', callback) 호출     
- case 2    
&nbsp;`1`. /birds 로 요청 시 birdRouter 모듈 호출      
&nbsp;`2`. birds.js의 router.get('/', callback) 호출          

##
## express generator
- 개발에 필요한 기본적인 구성을 해줌
- app.js = 메인파일


- express generator 설치 순서(cmd에서 실행)    
&nbsp;`1`. npm install express-generator -g 입력        
&nbsp;`2`. express 구성을 할 프로젝트 폴더 경로로 이동.    
&nbsp;`3`. express myapp 입력 => 해당프로젝트에 express 로 개발할 때 필요한 package.json 및 폴더 구성됨    
&nbsp;`4`. cd myapp 입력 (change directory)    
&nbsp;`5`. npm install 입력 (package.json에 있는 모듈들 다운)    
&nbsp;`6`. npm start 입력    
   
- package.json 파일 
```javascript
{
  "name": "myapp",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "morgan": "~1.9.1"
  }
}
```
- npm start 시 실행 순서     
&nbsp;`1`. package.json 파일의 scripts 실행.      
&nbsp;`2`. ./bin/www 실행    


