var fs = require('fs');
var request = require('request');

module.exports = {
  pwd: function(argument, outputFunc) {
    //print working dir
    outputFunc(process.argv[1]);
  },
  date: function(argument, outputFunc) {
    var date = new Date();
    outputFunc(date.toString());
  },
  ls: function(argument, outputFunc){
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
        outputFunc(file.toString() + "\n");
      });
    });
  },
  echo: function(argument, outputFunc){
    outputFunc(argument);
  },
  cat: function(argument, outputFunc){
    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      outputFunc(file + "\n");
    });
  },
  head: function(argument, outputFunc){
    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      var lines = file.split('\n');

      var loopLength = 5;

      if(lines.length<5)
        loopLength = lines.length;

      for(var i = 0;i<loopLength;i++)
        outputFunc(lines[i] + "\n");

    });
  },
  tail: function(argument, outputFunc){
    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      var lines = file.split('\n');

      var loopStart = 0;

      if(lines.length>5)
        loopStart = lines.length - 5;

      for(var i = loopStart;i<lines.length;i++)
        outputFunc(lines[i] + "\n");

    });
  },
  sort: function(argument, outputFunc){
    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      var lines = file.split('\n');

      lines.sort();

      outputFunc(lines.join('\n'));

    });
  },
  wc: function(argument, outputFunc){
    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      var lines = file.split('\n');

      outputFunc(lines.length+'\n');
    });
  },
  uniq: function(argument, outputFunc){
    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      var result = [];
      var lines = file.split('\n');

      for(var i = 0;i < lines.length; i ++){
        if(result.indexOf(lines[i]) === -1)
          result.push(lines[i]);
      }

      outputFunc(result.join('\n'));

    });
  },
  curl: function(argument, outputFunc){
    request(argument, function (err, response, body) {
      if(err) throw err;

      if (!err && response.statusCode == 200) {
          outputFunc(body + '\n'); // Show the HTML for the Modulus homepage.
      }
    });
  }
};
