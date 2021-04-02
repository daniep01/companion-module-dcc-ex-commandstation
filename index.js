var instance_skel = require('../../instance_skel');
var tcp           = require('../../tcp');
var udp           = require('../../udp');

// var feedback      = require('./feedback');

var debug;
var log;

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);
	// export actions
	self.actions(); 
	// presets
	// self.init_presets();

	return self;
}

instance.prototype.updateConfig = function (config) {
	var self = this;
	self.init_presets();

	if (self.socket !== undefined) {
		self.socket.destroy();
		delete self.socket;
	}

	self.config = config;

	self.init_tcp();
	
};

instance.prototype.init = function () {
	var self = this;

	debug = self.debug;
	log = self.log;
	self.init_presets();

	self.init_tcp();

};

instance.prototype.init_tcp = function() {
	var self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
		delete self.socket;
	}

	self.status(self.STATE_WARNING, 'Connecting');

	if (self.config.host) {
		self.socket = new tcp(self.config.host, self.config.port);

		self.socket.on('status_change', function (status, message) {
			self.status(status, message);
		});

		self.socket.on('error', function (err) {
			debug("Network error", err);
			self.status(self.STATE_ERROR, err);
			self.log('error',"Network error: " + err.message);
		});

		self.socket.on('connect', function () {
			self.status(self.STATE_OK);
			debug("Connected");
		})

		self.socket.on('data', function (data) {});
	}
};



// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module is for DCC++EX Command Station version 3'
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Device IP',
			width: 6,
			regex: self.REGEX_IP
		},{
			type: 'textinput',
			id: 'port',
			label: 'Control port',
			width: 6,
			default: '2560',
			regex: self.REGEX_PORT
		}
	]
};

// When module gets deleted
instance.prototype.destroy = function () {
	var self = this;

	if (self.socket !== undefined) {
		self.socket.destroy();
	}

	debug("destroy", self.id);;
};

instance.prototype.init_presets = function () {
	var self = this;
	var presets = [];

	self.setPresetDefinitions(presets);
}

instance.prototype.actions = function (system) {
	var self = this;

	self.setActions({
		'power': {
			label: 'Power Control',
			options: [
				{
					type: 'dropdown',
					label: 'function',
					id: 'selectedFunction',
					choices: [
					{ id: '<1 MAIN>', label: 'On Main'}, 
					{ id: '<1 PROG>', label: 'On Prog'},
					{ id: '<1 JOIN>', label: 'On Join'},
					{ id: '<1>', label: 'On Both'},
					{ id: '<!>', label: 'All Stop'},
					{ id: '<0>', label: 'Off'}
					]
				}
			]
		},
		'throttle': {
			label: 'Throttle',
			options: [
				{
					type: 'number',
					label: 'Address',
					id: 'dccAddress',
					min: 1,
					max: 10293,
					default: 3
				},
				{
					type: 'number',
					label: 'Speed',
					id: 'speed',
					min: -1,
					max: 126,
					default: 0
				},
				{
					type: 'dropdown',
					label: 'Direction',
					id: 'direction',
					default: '1',
					choices: [
					{ id: '1', label: 'Forward'},
					{ id: '0', label: 'Reverse'}]
				}
			]
		},
		'functions': {
			label: 'Functions',
			options: [
				{
					type: 'number',
					label: 'Address',
					id: 'dccAddress',
					min: 1,
					max: 10293,
					default: 3
				},			
				{
					type: 'number',
					label: 'Function',
					id: 'f',
					min: 0,
					max: 28,
					default: 0
				},
				{
					type: 'checkbox',
					label: 'State',
					id: 'state',
					default: false
				}				
			]
		},
		'accessory': {
			label: 'Accessory',
			options: [
				{
					type: 'number',
					label: 'Address',
					id: 'acAddress',
					min: 0,
					max: 511,
					default: 0
				},
				{
					type: 'number',
					label: 'Sub Address',
					id: 'acSubAddress',
					min: 0,
					max: 3,
					default: 0
				},
				{
					type: 'checkbox',
					label: 'State',
					id: 'acState',
					default: false
				}			
			]
		},
		'custom': {
			label: 'Custom',
			options: [
				{
					type: 'textinput',
					label: 'Custom command string excluding start and end brackets',
					id: 'customCommand'
				}
			]
		}
	});
};

instance.prototype.action = function (action) {
	var self = this;
	const opt = action.options;
	self.log('info','action: ' + action.action);
	
	switch (action.action) {
		
		case 'power': {
		
			self.log('info','power: ' + opt.selectedFunction);
			self.sendCmd(opt.selectedFunction);
			break;		
		}
		case 'throttle': {
		
			self.log('info', 'throttle: ' + opt.dccAddress + ' ' + opt.speed + ' ' + opt.direction);
			self.sendCmd('<t 1 ' + opt.dccAddress + ' ' + opt.speed + ' ' + opt.direction + '>');
			break;	
		}	
		case 'functions': {
			
			var fnCmd = opt.dccAddress + ' ' + opt.f + ' ' + Number(opt.state);
			self.log('info','function: ' + fnCmd);
			self.sendCmd('<F ' + fnCmd + '>');
			break;	
		}
		case 'accessory': {
			
			var acCmd = opt.acAddress + ' ' + opt.acSubAddress + ' ' + Number(opt.acState);
			self.log('info', acCmd);
			self.sendCmd('<a ' + acCmd + '>');
			break;	
		}		
		case 'custom': {
		
			self.log('info', 'custom: ' + opt.customCommand);
			self.sendCmd('<' + opt.customCommand + '>');
			break;	
		}		
		default:
			break;
	}

};

instance.prototype.sendCmd = function(cmdStr) {
	var self = this;
	var cmd;
	var end;

	cmd = unescape(cmdStr);
	end = '\r';
	
	console.log(cmd);

	/* 
	 * create a binary buffer pre-encoded 'latin1' (8bit no change bytes)
	 * sending a string assumes 'utf8' encoding 
	 * which then escapes character values over 0x7F
	 * and destroys the 'binary' content
	 */
	var sendBuf = Buffer.from(cmd + end, 'latin1');
	
	console.log(sendBuf);

	if (sendBuf != '') {

		if (self.config.prot == 'tcp') {

			// self.log('info','sending ',sendBuf,"to",self.config.host);

			if (self.socket !== undefined && self.socket.connected) {
				self.socket.send(sendBuf);
			}
			else {
				self.log('error','Socket not connected :(');
			}
		}

		if (self.config.prot == 'udp') {

			if (self.udp !== undefined ) {
				// self.log('info','sending',sendBuf,"to",self.config.host);

				self.udp.send(sendBuf);
			}
		}
	}
}


instance_skel.extendedBy(instance);
exports = module.exports = instance;