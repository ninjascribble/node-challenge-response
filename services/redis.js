var _ = require('lodash');
var redis = require('redis');
var defaults = {
    port: 6379,
    host: '127.0.0.1',
    options: {}
};

var RedisService = function() {};

RedisService.prototype = Object.create(Object.prototype);
RedisService.prototype.constructor = RedisService;

RedisService.prototype.configure = function(port, host, options) {

    var port = port || defaults.port;
    var host = host || defaults.host;
    var options = _.defaults({}, options, defaults.options);
    var client = null;

    if (this.client) {
        this.client.quit();
    }

    client = redis.createClient(port, host, options);
    client.on('error', console.error);

    Object.defineProperties(this, {
        port:    { value: port,    writable: false },
        host:    { value: host,    writable: false },
        options: { value: options, writable: false },
        client:  { value: client,  writable: false }
    });

    return this;
};

module.exports = new RedisService();

