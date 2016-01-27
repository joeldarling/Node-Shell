var commands = require('./commands');

var cmdList = null;

process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {

  var cmdString = data.toString().trim();
  cmdList = cmdString.split(/\s*\|\s*/g);

  var userInput = cmdList[0].split(' ');//get the first command and passed argument


  var cmd = userInput.shift(); // remove the first command

  if(commands.hasOwnProperty(cmd)){
    cmdList.shift();
    //call first command
    commands[cmd](undefined,userInput.join(' '), done);
  } else {
    process.stdout.write('Not a valid command');
    process.stdout.write('\nprompt > ');
  }
});

function done(argument){

  if(cmdList.length > 0){
    var nextCmd = cmdList.shift();
    var newCmdArg = nextCmd.split(' ');

    var nextCommand = newCmdArg.shift();
    var nextArg = null;

    if(newCmdArg.length!==0)
      nextArg = newCmdArg.join(' ');


    commands[nextCommand](argument,nextArg,done);

  } else {
    process.stdout.write(argument + '\n');
    process.stdout.write('prompt > ');
  }

}
