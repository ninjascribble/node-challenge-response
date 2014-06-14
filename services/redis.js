var redis = require('redis');
var client = redis.createClient();

client.DB_INDEX_APP = '0';
client.DB_INDEX_TEST = '9';

client.on('error', function(msg) {
    console.error(msg);
});

module.exports = client;
