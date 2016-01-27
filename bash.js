var commands = require('./commands');

var cmdList = null;

// Output a prompt

process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {

  var cmdString = data.toString().trim();
  cmdList = cmdString.split(/\s*\|\s*/g);

  var userInput = cmdList[0].split(' ');


  var cmd = userInput.shift(); // remove the newline

  if(commands.hasOwnProperty(cmd)){
    cmdList.shift();
    commands[cmd](undefined,userInput.join(' '), done);
  }
  //process.stdout.write('\nprompt > ');

});

function done(argument){

  if(cmdList.length > 0){
    var nextCmd = cmdList.shift();
    commands[nextCmd](argument,null,done);

  } else {
    process.stdout.write(argument + '\n');
    process.stdout.write('\nprompt > ');
  }

}
