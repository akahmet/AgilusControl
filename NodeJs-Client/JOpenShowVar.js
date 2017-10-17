/* 
	JOpenShowVar Socket Ported For NodeJs 
	By Ahmet AK @ GIBIRTech
	15.10.2017
*/
var net = require('net');

!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.JOpenShowVar=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
exports = module.exports = JOpenShowVar;

function JOpenShowVar(ip, port, event){
	var self = this;
	this.EVENT_CONNECTED = 'CONNECTED';
	this.EVENT_CLOSED = 'CLOSED';
	this.EVENT_NEWDATA = 'NEWDATA';
	this.client = new net.Socket();
	this.client.connect(port, ip, function() {
		event(self.EVENT_CONNECTED);
	});
	
	this.client.on('data', function(data) {
		data = self.unPackData(data);
		event(self.EVENT_NEWDATA, data);
	});
	
	this.client.on('close', function() {
		event(self.EVENT_CLOSED);
	});
}

JOpenShowVar.prototype.	 = function (name, data) {
	this.client.write(this.packData(name, data, true));
}

JOpenShowVar.prototype.readRequest = function (name) {
	this.client.write(this.packData(name, '', false));
}

JOpenShowVar.prototype.packData = function (cmd, value, write) {
	var id = 99;
	cmd = new Buffer(cmd);
	value =  new Buffer(value);
	var header = [];
	var block = [];
	
	//cmd length 16BİT İNT -> 2BYTE
    var hbyte = ((cmd.length & 0xff00)>>8); 
    var lbyte = (cmd.length & 0x00ff);
	
	//cmd string
    block.push(write ? 1 : 0); //command type: ? reading || writing 
    block.push(hbyte);
    block.push(lbyte);
    for (var i = 0; i < cmd.length; i++) {
        block.push(cmd[i]);
    }
	
	if (write) { //only in writing request
		//value length
		hbyte = ((value.length & 0xff00)>>8); 
		lbyte = (value.length & 0x00ff);
		
		//value string
		block.push(hbyte);
		block.push(lbyte);
		for (i = 0; i < value.length; i++) {
			block.push(value[i]);
		}
	}
	
	//header packing
	//block length
    hbyte = ((block.length & 0xff00)>>8); 
    lbyte = (block.length & 0x00ff);
	
	//msg id length ???? did not use
    var hbytemsg = ((id & 0xff00)>>8);
    var lbytemsg = (id & 0x00ff);

    header.push(hbytemsg);
    header.push(lbytemsg);
    header.push(hbyte);
    header.push(lbyte);
	
	//concat header with body
	var data = Buffer.concat([new Buffer(header), new Buffer(block)]);
	return data;
}

JOpenShowVar.prototype.unPackData = function(data){
	/*
		2 BYTE -> INT ID ??? 99
		2 BYTE -> INT LENGTH BLOCK
		1 BYTE -> BYTE MESSAGE TYPE
		_________HEADER_END__________
		2 BYTE -> INT COMMAND LENGTH
		N BYTE -> STRING COMMAND VALUE
		2 BYTE -> INT DATA LENGTH
		N BYTE -> STRING DATA VALUE
	*/
	//data = new Buffer(data);
	//buffer.readUIntBE(2, 1);
	return 'Received: ' + data;
}

JOpenShowVar.prototype.disconnet = function(){
	this.client.destroy();
}

},{}]},{},[1]) //DO NOT CHANGE
(1)
});