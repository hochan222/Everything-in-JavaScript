var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');
var pushButton = new Gpio(17, 'in', 'both');

pushButton.watch(function (err, value) {

    if (err) {
        console.error('There was an error', err);
        return ;
    }
    LED.writeSync(value);
});

function unexportOnClose() {
    LED.writeSync(0);
    LED.unexport();
    pushButton.unexport();
}

// SIGINT === ctrl + c
process.on('SIGINT', unexportOnClose);