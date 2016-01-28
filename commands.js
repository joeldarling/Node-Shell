var fs = require('fs');
var request = require('request');
var chalk = require('chalk');

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

    function process(data){
      //this will return the first 5 lines of file
      return data.split('\n').slice(0,5).join('\n');
    }
    //print the first 5 lines of input
    if(stdin){
      outputFunc(process(stdin));
    } else {
      fs.readFile(argument,'utf8',function(err,file){
        if(!err)
          outputFunc(process(file));
        });
    }
  },
  tail: function(stdin, argument, outputFunc){

    function process(data){
      return data.split('\n').slice(-5).join('\n');
    }
    //print last 5 lines of input
    var lines = [];

    if(stdin){
      outputFunc(process(stdin));

    } else {
      fs.readFile(argument,'utf8',function(err,file){
        if(!err)
          outputFunc(process(file));
      });
    }
  },
  sort: function(stdin, argument, outputFunc){

    function process(data){
      return data.split('\n').sort().join('\n');
    }

    //sort input
    if(stdin){
      outputFunc(process(stdin));
    } else {
      fs.readFile(argument,'utf8',function(err,file){
        if(!err)
          outputFunc(process(file));
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
    //query http address
    request(argument, function (err, response, body) {
      if(err) throw err;

      if (!err && response.statusCode == 200) {
          outputFunc(body + '\n'); //return the body of the webpage
      }
    });
  },
  grep: function(stdin, argument, outputFunc){
    var lines = [];
    var result = "";

    if(stdin) {

      lines = stdin.split('\n');

      for(var i = 0; i < lines.length; i++){
        if(lines[i].indexOf(argument)!= -1){

          var newString = lines[i].toString().replace(argument, chalk.bgWhite(argument));
          result+=newString + '\n';
        }
      }
    }

    outputFunc(result);

  }
};
