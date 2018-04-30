
var mqtt = require('mqtt');


module.exports = function exec(params) {

      if(params.deviceType.protocol==='mqtt'){

                  if(params.deviceType.type === 'binary') {
                    var topic = params.deviceType.identifier;
                    return sendMqttMsg(topic, params.state.value);
                  }
                  else {console.log(`MQTT Device - DeviceType type invalid or unknown: ${params.deviceType.type}`);}

      }
      else {console.log(`MQTT Device - DeviceType protocol invalid or unknown: ${params.deviceType.protocol}`);}

    return false;
};


function sendMqttMsg(topic, value) {

    return gladys.param.getValues(['MQTT_URL', 'MQTT_USERNAME', 'MQTT_PASSWORD'])
        .spread(function (url, username, password) {
            var client = mqtt.connect(url, {
                username: username,
                password: password
            });

            client.on('connect', function () {
                console.log(`Gladys hooks successful conected : ${url}`);

                var state = value === 1 ? 'on' : 'off';
                console.log(`MQTT hooks - Sending ${topic} ${state}`);
                client.publish(topic, state);
            });

            client.on('message', function (topic, message) {
                    var state = message === 'ON' ? 1 : 0;
                    console.log(`MQTT hooks catch new another message ${message} on topic  ${topic}`);
                    client.end();

                    return state;

            });

            client.on('error', function (error) {
                console.log(`MQTT hooks - Error: ${error}`);
                client.end();

                return false;
            });
        });
}
