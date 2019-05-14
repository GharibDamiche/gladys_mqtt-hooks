
var handler = require('./handler/index.js');

module.exports = function(topic, message) {
	try{

		sails.log.info(`Gladys MQTT : Received message on topic ${topic}`);

		if(topic=='Home/Cuisine/CapteurGCourant'){
			var obj = JSON.parse(message);
			return handler.dataConsumption(topic, obj);
		}

		// Owntracks topic
		if(topic=='Home/Cuisine/CapteurPCourant'){
			var obj = JSON.parse(message);
			return handler.dataConsumption(topic, obj);
		}

	} catch(e) {
		sails.log.warn(`MQTT : handler : fail to handle incoming message on topic ${topic}`);
		sails.log.warn(e);
	};
};
