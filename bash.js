var commands = require('./commands');

// Output a prompt

process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
  var userInput = data.toString().trim().split(" ");

  var cmd = userInput.shift(); // remove the newline

  if(commands.hasOwnProperty(cmd))
    commands[cmd](userInput.join(' '));

  process.stdout.write('\nprompt > ');

});
