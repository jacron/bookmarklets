const readline = require('readline');
const processHost = require('./process-host');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('(short) host? ', (answer) => {
    // console.log(answer.length);
    if (answer.length > 0) {
        processHost.processHost(answer);
        rl.close();
        // process.exit(0);
    } else {
        rl.close();
        process.exit(0);
    }
    // rl.close();
    // process.exit(0);
});
