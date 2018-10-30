const
  express = require('express'),
  app = express(),
  server = app.listen(process.env.PORT || 3000),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  { $server } = require('./services');

process.title = 'Express server';

app.use(express.static(__dirname + '/public')); // Keep if you want to serve files easily

app.use(require('./middlewares/requests'));
app.use(cors({
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/hello', require('./controllers/hello'));

$server.checkDatabase(); // Comment this line if you don't want to use postgresql