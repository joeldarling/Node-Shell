var fs = require('fs');
var request = require('request');

module.exports = {
  pwd: function(stdin, argument, outputFunc) {
    //print working dir
    if(stdin)
      argument = stdin;

    outputFunc(process.argv[1]);
  },
  date: function(stdin, argument, outputFunc) {
    if(stdin)
      argument = stdin;

    var date = new Date();
    outputFunc(date.toString());
  },
  ls: function(stdin, argument, outputFunc){
    if(stdin)
      argument = stdin;

    fs.readdir('.', function(err, files) {
      if (err) throw err;
      files.forEach(function(file) {
        outputFunc(file.toString() + "\n");
      });
    });
  },
  echo: function(stdin, argument, outputFunc){
    if(stdin)
      argument = stdin;

    outputFunc(argument);
  },
  cat: function(stdin, argument, outputFunc){
    if(stdin)
      argument = stdin;

    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      outputFunc(file + "\n");
    });
  },

/*
wc: function(stdin, argument, outputFunc){
  var lines = [];
  console.log('arg:',argument,' stdin:',stdin);
  if(stdin) {
    lines = stdin.split('\n');
    outputFunc("Number of lines: "+lines.length+'\n');
  } else {
    console.log('reading');
    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      lines = file.split('\n');
      outputFunc("Number of lines: "+lines.length+'\n');
      });
  }
},
*/

  head: function(stdin, argument, outputFunc){
    var lines = [];
    if(stdin) {
      lines = stdin.split('\n');
      var loopLength = 5;

      if(lines.length<5)
        loopLength = lines.length;
        var toReturn = "";

      for(var i = 0;i<loopLength;i++)
        toReturn = toReturn + lines[i] + "\n";

        outputFunc(toReturn);

    } else {
      fs.readFile(argument,'utf8',function(err,file){
        if(err) throw err;

        lines = file.split('\n');
        var loopLength = 5;

        if(lines.length<5)
          loopLength = lines.length;
          var toReturn = "";

        for(var i = 0;i<loopLength;i++)
          toReturn = toReturn + lines[i] + "\n";

          outputFunc(toReturn);

        });
    }



  },
  tail: function(stdin, argument, outputFunc){
    if(stdin)
      argument = stdin;

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
  sort: function(stdin, argument, outputFunc){
    if(stdin)
      argument = stdin;

    fs.readFile(argument,'utf8',function(err,file){
      if(err) throw err;

      var lines = file.split('\n');

      lines.sort();

      outputFunc(lines.join('\n'));

    });
  },
  wc: function(stdin, argument, outputFunc){
    var lines = [];

    if(stdin) {
      lines = stdin.split('\n');
      outputFunc("Number of lines: "+lines.length+'\n');
    } else {
      
      fs.readFile(argument,'utf8',function(err,file){
        if(err) throw err;

        lines = file.split('\n');
        outputFunc("Number of lines: "+lines.length+'\n');
        });
    }
  },
  uniq: function(stdin, argument, outputFunc){
    if(stdin)
      argument = stdin;

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
  curl: function(stdin, argument, outputFunc){
    if(stdin)
      argument = stdin;

    request(argument, function (err, response, body) {
      if(err) throw err;

      if (!err && response.statusCode == 200) {
          outputFunc(body + '\n'); // Show the HTML for the Modulus homepage.
      }
    });
  }
};
