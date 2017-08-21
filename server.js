var app = require('app');

app.get('/game').then(function(req, res) {
    console.log('************')
    res.render('home', req.data)
})

