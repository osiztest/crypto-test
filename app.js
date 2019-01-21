var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var mongoose     = require('mongoose');
mongoose.Promise = global.Promise;

let usersays=[];
let respon=[];
let result=[];
let arr=[];

var db = mongoose.connection.openUri('mongodb://localhost/upload',{ useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  // console.log("MongoDb connected");
})

app.post('/cryptovalue',function(req, res) {

console.log(req)


})

// const rp = require('request-promise');
// const requestOptions = {
//   method: 'GET',
//   uri: 'https://api.cryptonator.com/api/ticker/usd-btc',
 
// };

// rp(requestOptions).then(response => {
//   var data=JSON.parse(response)
//   var value={
//     "firstcoin":data.ticker.base,
//     "secondcoin":data.ticker.target,
//     "value":data.ticker.price
//   }
//     console.log(value)

// }).catch((err) => {
//   console.log('API call error:', err.message);
// });




function groupBy(key, array) {
  var result = [];
  for (var s = 0; s < array.length; s++) {
    var added = false;
    for (var j = 0; j < result.length; j++) {
      if (result[j][key] == array[s][key]) {
        result[j].items.push(array[s]);
        added = true;
        break;
      }
    }
    if (!added) {
      var entry = {items: []};
      entry[key] = array[s][key];
      entry.items.push(array[s]);
      result.push(entry);
    }
  }
  return result;
}

const csvFilePath='/home/devel-venkat/Desktop/venkat/main task/chat/csv to json/second_Sheet1.csv'
const csv=require('csvtojson')

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
  arr = groupBy('IntentName',jsonObj);

  for(var i=0; i<arr.length; i++) {
    for(var a=0; a<arr[i].items.length; a++) {
      usersays.push({
              "data": [
                {
                  "text": arr[i].items[a].UserSays
                }
              ]
            });
      respon.push(arr[i].items[a].TextResponse)
    }
      result.push({
          "userSays": usersays,
          "name": arr[i].IntentName,
          "responses": [
            {
              "messages": [
                {
                  "type": 0,
                  "speech": respon                  
                }
              ]
            }
          ]
        })
      respon = [];
      usersays = [];
  }
  for (var k=0; k<result.length; k++) {
    let data = JSON.stringify(result[k])
    fs.writeFile('intents/'+result[k].name+'.json', data, (err) => {  
        if (err) throw err;
        console.log('Data written to file');
    });
  }
});


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
