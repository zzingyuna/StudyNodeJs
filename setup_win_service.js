
var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name:'_test',
    description: '_test',
    script: 'C:\\Users\\yuna\\Desktop\\Source\\StudyNodeJs\\dist\\main.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function() {
    try {
        svc.start();
        
    } catch (error) {
        console.log(error);
    }
});

svc.install();