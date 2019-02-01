const readline = require('readline');
const processHost = require('./process-host');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('(short) host? ', (answer) => {
    processHost.processHost(answer);
    rl.close();
});
