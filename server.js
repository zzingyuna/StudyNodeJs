// 웹프레임워크 종류는 대표적으로 Express, Koa, Hapi 등이 있다(여기서는 express사용)
var express = require('express');
// express를 실행시키면서 app에 담는다
var app = express();
// body-parser – POST 데이터 처리 사용(npm install 설치 필수)
var bodyparser = require('body-parser');
// express-session – 세션을 관리하는 미들웨어(npm install 설치 필수)
var session = require('express-session');
// 기본 내장 모듈fs (파일 입/출력을 위해 쓰임)
var fs = require('fs');


/*
// 라우터를 지정하지 않았을때 아래의 res.send메세지를 뿌려주는 페이지를 호출한다
app.get('/', function(req, res){
	res.send('hello world');
});
*/

// html 위치 정의
app.set('views', './views');
// html렌더링 할때 EJS엔진을 사용하도록 한다
app.set('view engine', 'ejs');
// EJS엔진을 사용해서 html파일을 불러온다
app.engine('html', require('ejs').renderFile);

// css파일 사용을 위해 아래와 같이 
// public 폴더안에 파일을 사용한다고 선언해준다
app.use(express.static('public'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
// Express 의 이전 버전에서는 cookie-parser 모듈도 불러와야한다
// express-session 모듈이 직접 쿠키에 접근하므로 cookie-parser 를 더이상 사용 할 필요가 없습니다
// secret – 쿠키를 임의로 변조하는것을 방지하기 위한 sign 값 입니다. 원하는 값을 넣으면 됩니다.
// resave – 세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값입니다. express-session documentation에서는 이 값을 false 로 하는것을 권장하고 필요에 따라 true로 설정합니다.
// saveUninitialized – uninitialized 세션이란 새로 생겼지만 변경되지 않은 세션을 의미합니다. Documentation에서 이 값을 true로 설정하는것을 권장합니다.
app.use(session({
	secret: '@#@$MYSING#@$#$',
	resave: false,
	saveUnintialized: true
}));

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

// main.js 파일을 불러온다 (라우터 기능:url주소창에 입력한 주소와 실제 페이지 파일명 매칭)
var router = require('./router/main')(app, fs);
