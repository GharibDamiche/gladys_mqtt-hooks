var util = require('util');
var mqtt = require('mqtt');
//var handler = require('./handler.js');
var shared = require('./shared.js');

module.exports = function() {

	return gladys.param.getValues(['MQTT_URL'])
		.spread(function(url){

			var client = mqtt.connect(url);

			client.on('connect', function () {
				// Owntracks topic
				client.subscribe('domotech/couloir/alarme/mesure');

			});

			client.on('error', function(err) {
				sails.log.warn(`Fail to connect to MQTT : ${url}`);
			});

			client.on('message', function (topic, message) {
				sails.log.info(`MQTT : New message in topic ${topic}`);
				//handler(topic, message.toString());
			});

			shared.setClient(client);

			return client;
	  });

};
