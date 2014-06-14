var redis = require('redis');
var client = redis.createClient();

client.on('error', function(msg) {
    // console.error(msg);
});

function KVStore() {};

KVStore.prototype = Object.create(Object);
KVStore.prototype.constructor = KVStore;

KVStore.prototype.set = function(key, value) {
    client.set(key, value);
}

KVStore.prototype.get = function(key, callback) {
    client.get(key, callback);
}

module.exports = new KVStore();
