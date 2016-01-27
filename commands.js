var fs = require('fs');
var request = require('request');

module.exports = {
  pwd: function(argument) {
    //print working dir
    process.stdout.write(process.argv[1]);
  },
  date: function(argument) {
    var date = new Date();
    process.stdout.write(date.toString());
  },
  ls: function(argument){
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
        process.stdout.write(file.toString() + "\n");
      });
    });
  },
  echo: function(argument){
    process.stdout.write(argument);
  },
  cat: function(argument){
    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      process.stdout.write(file + "\n");
    });
  },
  head: function(argument){
    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      var lines = file.split('\n');

      var loopLength = 5;

      if(lines.length<5)
        loopLength = lines.length;

      for(var i = 0;i<loopLength;i++)
        process.stdout.write(lines[i] + "\n");

    });
  },
  tail: function(argument){
    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      var lines = file.split('\n');

      var loopStart = 0;

      if(lines.length>5)
        loopStart = lines.length - 5;

      for(var i = loopStart;i<lines.length;i++)
        process.stdout.write(lines[i] + "\n");

    });
  },
  sort: function(argument){
    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      var lines = file.split('\n');

      lines.sort();

      process.stdout.write(lines.join('\n'));

    });
  },
  wc: function(argument){
    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      var lines = file.split('\n');

      process.stdout.write(lines.length+'\n');
    });
  },
  uniq: function(argument){
    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      var result = [];
      var lines = file.split('\n');

      for(var i = 0;i < lines.length; i ++){
        if(result.indexOf(lines[i]) === -1)
          result.push(lines[i]);
      }

      process.stdout.write(result.join('\n'));

    });
  },
  curl: 
};
