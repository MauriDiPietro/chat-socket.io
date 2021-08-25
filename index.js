const express = require('express');
const app = express();
const path = require('path');

//settings
app.set('port', process.env.PORT || 3000);

//static files
console.log(__dirname)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
})