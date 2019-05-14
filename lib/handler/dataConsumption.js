
module.exports = function(topic, param){

		return gladys.deviceState.createByDeviceTypeIdentifier('domotech/couloir/alarme/mesure', 'mqtt-hook', param);
	} else {
		return Promise.resolve();
	}

};
