var handler = require('./handler/index.js');

module.exports = function(topic, message) {
	try{
		// Owntracks topic
		if(topic.indexOf('domotech/couloir/alarme/mesure') >= 0) {
			var obj = JSON.parse(message);
			return handler.alarm(topic, obj);
		}

	} catch(e) {
		sails.log.warn(`MQTT : handler : fail to handle incoming message on topic ${topic}`);
		sails.log.warn(e);
	};
};
