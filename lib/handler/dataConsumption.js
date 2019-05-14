
module.exports = function(topic, param){

		//Creation du nouvel etat du Capteur
		return gladys.deviceState.createByDeviceTypeIdentifier(topic, 'mqtt_hook', param);

};
