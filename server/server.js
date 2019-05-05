const app = require('./app.js.js');


app.listen(app.get('port'), () => { 
    console.log(`App started on port ${app.get('port')}`) 
});