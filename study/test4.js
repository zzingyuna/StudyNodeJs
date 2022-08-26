
var client = require('cheerio-httpcli');
var word = "python nodejs"
client.fetch('http://www.google.com/search', {q:word}, function(err, $, res, body){
	console.log(res.headers);
	console.log('title : '+$('title').text());
	$('a').each(function(idx){
		console.log($(this).attr('href'));
	});
});


// "nps install --save cheerio-httpcli"로 사용하는 라이브러리 설치 후 진행!!
// word변수에 설정된 'python nodejs'이라는 문구를 검색한 결과 페이지에서 a링크 href 속성값을 콘솔창에 찍어준다..
