const app = require('./app.js');


// start the express server
app.listen(app.get('port'), () => { 
    console.log(`App started on port ${app.get('port')}`) 
});