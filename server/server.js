const app = require('./app.js');


app.listen(app.get('port'), () => { 
    console.log(`App started on port ${app.get('port')}`) 
});