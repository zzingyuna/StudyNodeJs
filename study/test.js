var fs = require('fs'); 
var file = 'test1.txt'; 
fs.open(file,'w',
function(err,fd){ 
    if (err) throw err;
     console.log('file open complete'); 
    });
    const testFolder = './';

    fs.readdir(testFolder, (err, files) => {
        // files.forEach(file => {
        //   console.log(file);
        // });
        
    fs.appendFile('test1.txt', 'data to append\n'+files.length, function (err) { if (err) throw err;  })

        
      });