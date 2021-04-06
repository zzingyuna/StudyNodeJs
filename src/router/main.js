// 해당 소스에서 url 주소창에 쓴 경로를 기준으로 바인딩할 페이지 설정
// localhost:3000 -> index.html호출
// localhost:3000/about -> about.html호출
module.exports = function(app, fs){

	app.get('/',function(req, res){
		var sess = req.session;
		res.render('index.html',{
			username: sess==undefined?"":sess.username,
			name: sess==undefined?"":sess.name,
			age: sess==undefined?"":sess.age
		});
	});
	app.get('/about',function(req,res){
		res.render('about.html');
	});
	app.get('/login',function(req,res){
		var sess = req.session;
		if (sess.name==undefined ) {
			res.render('login.html');
		}
		else {
			res.render('ejs2',{
				title: "MY HOMEPAGE2",
				tempVar: 10,
				username: sess==undefined?"":sess.username, // 세션값 사용하기
				name: sess==undefined?"":sess.name // 세션값 사용하기
			})
		}
	});
	app.post('/login',function(req,res){
		var username = req.body.id;
		var password = req.body.pw;
		console.log(username);
		console.log(password);

		// 세션값 담기
		var sess = req.session;
		var result = {};
		fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
            var users = JSON.parse(data);
            if(!users[username]){
                // USERNAME NOT FOUND
                result["success"] = 0;
                result["error"] = "not found";
				return res.render('login.html');
            }

            if(users[username]["password"] == password){
                result["success"] = 1;
                sess.username = username;
                sess.name = users[username]["name"];
				sess.age = users[username]["age"];
				/*
				return res.render('index.html',{
					username: sess==undefined?"":sess.username, // 세션값 사용하기
					name: sess==undefined?"":sess.name // 세션값 사용하기
				});
				*/
				return res.redirect('/');
            }else{
                result["success"] = 0;
                result["error"] = "incorrect";
				return res.render('login.html');
            }

        })
	});
	app.get('/ejs1',function(req, res){
		var sess = req.session;
		res.render('index',{
			title: "MY HOMEPAGE",
			username: sess==undefined?"":sess.username,
			tempVar: 5
		})
	});
	app.get('/ejs2',function(req, res){
		var sess = req.session;
		res.render('ejs2',{
			title: "MY HOMEPAGE2",
			tempVar: 10,
			username: sess==undefined?"":sess.username, // 세션값 사용하기
			name: sess==undefined?"":sess.name // 세션값 사용하기
		})
	});

	/*
	router 모듈은 router 폴더에 들어있으니, data 폴더에 접근하려면
	/../ 를 앞부분에 붙여서 먼저 상위폴더로 접근해야합니다.
	*/
	// list
	app.get('/users',function(req, res){
		fs.readFile(__dirname+"/../data/user.json", 'utf8', function(err, data){
			//console.log(data);
			res.end(data);
		});
	});

	// get one
	app.get('/getUser/:username',function(req, res){
		fs.readFile(__dirname+"/../data/user.json", 'utf8', function(err, data){
			var users = JSON.parse(data);
			res.json(users[req.params.username]);
		});
	});

	// post
	app.post('/addUser/:username',function(req, res){
		
        var result = {  };
        var username = req.params.username;

        // CHECK REQ VALIDITY
        if(!req.body["password"] || !req.body["name"]){
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
            var users = JSON.parse(data);
            if(users[username]){
                // DUPLICATION FOUND
                result["success"] = 0;
                result["error"] = "duplicate";
                res.json(result);
                return;
            }

            // ADD TO DATA
            users[username] = req.body;

            // SAVE DATA
            fs.writeFile(__dirname + "/../data/user.json",
                         JSON.stringify(users, null, '\t'), "utf8", function(err, data){
                result = {"success": 1};
                res.json(result);
            })
        })

	});

	// put
	app.put('/editUser/:username',function(req, res){
		
        var result = {  };
        var username = req.params.username;

        // CHECK REQ VALIDITY
        if(!req.body["password"] || !req.body["name"]){
            result["success"] = 0;
            result["error"] = "invalid request";
            res.json(result);
            return;
        }

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
            var users = JSON.parse(data);
            if(users[username]){

	            // EDIT TO DATA
	            users[username] = req.body;

	            // SAVE DATA
	            fs.writeFile(__dirname + "/../data/user.json",
	                         JSON.stringify(users, null, '\t'), "utf8", function(err, data){
	                result = {"success": 1};
	                res.json(result);
	            })
                return;
            }else{
                // DUPLICATION FOUND
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;            	
            }

        })

	});

	// delete
	app.delete('/delUser/:username',function(req, res){
		
        var result = {  };
        var username = req.params.username;

        // LOAD DATA & CHECK DUPLICATION
        fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
            var users = JSON.parse(data);
            if(users[username]){

	            // DELETE TO DATA
	            delete users[req.params.username];

	            // SAVE DATA
	            fs.writeFile(__dirname + "/../data/user.json",
	                         JSON.stringify(users, null, '\t'), "utf8", function(err, data){
	                result = {"success": 1};
	                res.json(result);
	            })
                return;
            }else{
                // DUPLICATION FOUND
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;            	
            }

        })

	});
	
	

	// 세션 변수 설정 ( sess.[키 이름]  = 값 으로 세션 변수를 설정 가능)
	app.get('/login/:username/:password', function(req, res){
		// 세션값 담기
		var sess = req.session;

		fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
            var users = JSON.parse(data);
            var username = req.params.username;
            var password = req.params.password;
            var result = {};
            if(!users[username]){
                // USERNAME NOT FOUND
                result["success"] = 0;
                result["error"] = "not found";
                res.json(result);
                return;
            }

            if(users[username]["password"] == password){
                result["success"] = 1;
                sess.username = username;
                sess.name = users[username]["name"];
                res.json(result);

            }else{
                result["success"] = 0;
                result["error"] = "incorrect";
                res.json(result);
            }


        })

	});


	// 세션 변수 사용
	app.get('/logout', function(req, res){
		var sess = req.session;
		if(sess.name){
			req.session.destroy(function(err){				
				if(err){
					console.log(err);
				}else{
					console.log(req.session);
					res.redirect('/');
				}
			});
		}else{
			res.redirect('/');
		}
		
	});

}
