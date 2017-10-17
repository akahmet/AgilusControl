/* 
	JOpenShowVar Socket Example For NodeJs 
	By Ahmet AK @ GIBIRTech
	15.10.2017
*/
var rl = require('readline');
var JOpenShowVar = require('./JOpenShowVar');

/* API
	var robot = new JOpenShowVar(IP, PORT, EVENT_FUNCTION);
	robot.writeRequest(VARIABLENAME, DATA);
	robot.readRequest(VARIABLENAME);
	robot.disconnet();
*/

var robot = new JOpenShowVar('172.31.1.147' /* IP */, 7000 /* PORT */, function(event, data) {
	switch(event){
		case JOpenShowVar.EVENT_CONNECTED:
			console.log('robot connected');
			break;
		case JOpenShowVar.EVENT_CLOSED:
			console.log('Connection Closed');
			break;
		case JOpenShowVar.EVENT_NEWDATA:
			console.log('incoming data: ', data);
			break;
	}
});

rl = rl.createInterface(process.stdin, process.stdout)
rl.on('line', function (cmd) {
	cmd = cmd.split(" ");
	console.log(cmd);
	switch(cmd[0]){
		case '1':
			robot.writeRequest('MYPOS', '{FRAME: X 700, Y 30, Z 687, A -90, B 0, C -45}');
			break;
		case '2':
			robot.writeRequest('MYPOS', '{FRAME: X 700, Y 2, Z 887, A -90, B 0, C -90}');
			break;
		case '3':
			robot.writeRequest('MYPOS', '{FRAME: X 800, Y 2, Z 887, A -90, B 0, C -90}');
			break;
		case '4':
			robot.writeRequest('MYPOS', '{FRAME: X 750, Y 50, Z 900, A -45, B 0, C -90}');
			break;
		case '5':
			robot.writeRequest('MYPOS', '{FRAME: X -709, Y -415, Z 890, A -64, B 0, C 63}');
			break;
	}
});