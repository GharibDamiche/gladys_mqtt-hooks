
var util = require('util');
var mqtt = require('mqtt');
var handler = require('./handler.js');

module.exports = function() {

	return gladys.param.getValues(['MQTT_URL'])
		.spread(function(url){

			var client = mqtt.connect(url);

			client.on('connect', function () {

				// Gladys multi instances
				client.subscribe('Home/Cuisine/CapteurGCourant');

				// Capteur PC topic
				client.subscribe('Home/Cuisine/CapteurPCourant');


				sails.log.info(`Successfully connected to MQTT : ${url}`);
			});

			client.on('error', function(err) {
				sails.log.warn(`Fail to connect to MQTT : ${url}`);
			});

			client.on('message', function (topic, message) {
				sails.log.info(`MQTT : New message in topic ${topic}`);
				handler(topic, message.toString());
			});

			// forward events to other Gladys machine

			return client;
	  });

};
