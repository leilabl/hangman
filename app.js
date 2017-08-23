'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var exphbs = require('express-handlebars');
module.exports = app; // for testing

const bodyParser = require('body-parser');

const hbs = exphbs.create({
    helpers: {
        json: (context) => JSON.stringify(context)
    }
});

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  
  app.all('/', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
      res.header("Access-Control-Allow-Methods", "GET POST");
      next();
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.post('/restart', function (req, res) {
      res.redirect('/');
  });

  swaggerExpress.register(app);

  const port = 4000;
  app.listen(port, () => console.log(`Listening on port ${port}`));
});
