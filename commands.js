var fs = require('fs');
var request = require('request');

module.exports = {
  pwd: function(stdin, argument, outputFunc) {
    //print working dir

    outputFunc(process.argv[1]);
  },
  date: function(stdin, argument, outputFunc) {
    //print current date
    var date = new Date();
    outputFunc(date.toString());
  },
  ls: function(stdin, argument, outputFunc){
    //list files in directory
    fs.readdir('.', function(err, files) {
      if (err) throw err;

      outputFunc(files.join('\n'));

    });
  },
  echo: function(stdin, argument, outputFunc){
    //echo the input
    if(stdin)
      argument = stdin;

    outputFunc(argument);
  },
  cat: function(stdin, argument, outputFunc){
    //concat files
    if(stdin)
      outputFunc(stdin + "\n");
    else {
      fs.readFile(argument,'utf8',function(err,file){
        if(err) throw err;

        outputFunc(file + "\n");
      });
    }
  },

  head: function(stdin, argument, outputFunc){
    //print the first 5 lines of input
    var lines = [];
    if(stdin) {
      lines = stdin.split('\n');
      var loopLength = 5;

      if(lines.length<5)
        loopLength = lines.length;
        var toReturn = "";

      for(var i = 0;i<loopLength;i++)
        toReturn += "\n"+i+": "+ lines[i];

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
          toReturn += "\n"+i+": "+ lines[i];

        outputFunc(toReturn);

        });
    }
  },
  tail: function(stdin, argument, outputFunc){
    //print last 5 lines of input
    var lines = [];

    if(stdin){

        lines = stdin.split('\n');

        var loopStart = 0;

        if(lines.length>5)
          loopStart = lines.length - 5;

        var toReturn = "";
        for(var i = loopStart;i<lines.length;i++){
          toReturn+="\n"+i+": "+lines[i];
        }
          outputFunc(toReturn);

    } else {
      fs.readFile(argument,'utf8',function(err,file){
        if(err) throw err;

        lines = file.split('\n');

        var loopStart = 0;

        if(lines.length>5)
          loopStart = lines.length - 5;

        var toReturn = "";
        for(var i = loopStart;i<lines.length;i++){
          toReturn+="\n"+i+": "+lines[i];
        }
          outputFunc(toReturn);

      });
    }
  },
  sort: function(stdin, argument, outputFunc){

    //sort input
    if(stdin){

      var lines = stdin.split('\n');

      lines.sort();

      outputFunc(lines.join('\n'));

    } else {
      fs.readFile(argument,'utf8',function(err,file){
        if(err) throw err;

        var lines = file.split('\n');

        lines.sort();

        outputFunc(lines.join('\n'));

      });
    }
  },
  wc: function(stdin, argument, outputFunc){
    //print linecount for input
    var lines = [];

    if(stdin) {
      lines = stdin.split('\n');
      outputFunc(lines.length+'\n');
    } else {
      if(!argument){
        outputFunc('Not a valid file');
        return;
      }

      fs.readFile(argument,'utf8',function(err,file){
        if(err) throw err;

        lines = file.split('\n');
        outputFunc(lines.length+'\n');
        });
    }
  },
  uniq: function(stdin, argument, outputFunc){
    //strip out any duplicate lines
    if(stdin){
      var result = [];
      var lines = stdin.split('\n');

      for(var i = 0;i < lines.length; i ++){
        if(result.indexOf(lines[i]) === -1)
          result.push(lines[i]);
      }

      outputFunc(result.join('\n'));

    } else {

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
    }
  },
  curl: function(stdin, argument, outputFunc){
    //query http address and log out 
    request(argument, function (err, response, body) {
      if(err) throw err;

      if (!err && response.statusCode == 200) {
          outputFunc(body + '\n'); // Show the HTML for the Modulus homepage.
      }
    });
  }
};
