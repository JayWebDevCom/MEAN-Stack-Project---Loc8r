var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/Loc8r';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
  console.log('**Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(){
  console.log('Mongoose connection error ' + err);
});

mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});

var gracefulDBShutdown = function(msg, callback){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// for nodemon restars
process.once('SIGUSR2', function(){
  gracefulDBShutdown('nodemon restart', function(){
    process.kill(process.pid, 'SIGUSR2')
  });
});

//for app termination
process.on('SIGINT', function(){
  gracefulDBShutdown('app termination', function(){
    process.exit(0);
  });
});

//for Heroku app termination
process.on('SIGTERM', function(){
  gracefulDBShutdown('Heroku app termination', function(){
    process.exit(0);
  });
});

require('./locations')
