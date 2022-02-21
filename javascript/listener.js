const serialport = require('serialport');
const axios = require('axios');

const { PORT_NAME, BAUD_RATE, KEY, WEBHOOK_URL} = require('./Constants');

const SerialPort = serialport.SerialPort;
const { ReadlineParser } = require('@serialport/parser-readline')

const port = new SerialPort({
    path: PORT_NAME,
    baudRate: BAUD_RATE,
    autoOpen: false,
    parser: new ReadlineParser(),
});

// Try to open the port.
port.open(function (err) {
    if (err){
        return console.log('Error opening port: ', err.message);
    }
});

// The event 'open' is fired
port.on('open', function(){
    console.log(`port ${PORT_NAME} opened successfully.`);
    
    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    // when the data event is fired.
    parser.on('data', (data) => {
        console.log(`Data: ${data}`)
        sendNoticationToMaker(data);
    });

});

/**
 * Send the notification to IFTTT.
 * 
 * @param {string} information: The new moisture
 */
const sendNoticationToMaker = (information) => {
    let payload = {[KEY]: information}

    axios
        .post(WEBHOOK_URL, payload)
        .then(res => console.log(res.data))
        .catch(err => console.log("There was an error | ", err))
}

