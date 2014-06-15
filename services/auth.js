var _ = require('lodash');
var crypto = require('crypto');
var provider = null;
var prime = null;
var defaults = {
    length: 512,
    encoding: 'hex'
};

var AuthService = function() {};

AuthService.prototype = Object.create(Object.prototype);
AuthService.prototype.constructor = AuthService;

AuthService.prototype.configure = function(length, encoding) {

    var length = length || defaults.length;
    var encoding = encoding || defaults.encoding;

    Object.defineProperties(this, {
        length:   { value: length,   writable: false },
        encoding: { value: encoding, writable: false }
    });

    provider = crypto.createDiffieHellman(length);
    prime = provider.getPrime();
    provider.generateKeys();

    return this;
};

AuthService.prototype.token = function() {

    var client = crypto.createDiffieHellman(prime);
    var key = client.generateKeys(this.encoding);
    var secret = provider.computeSecret(key, this.encoding, this.encoding);

    return {
        key: key,
        secret: secret
    };
};

AuthService.prototype.validateToken = function(key, secret) {

    try {
        return secret === provider.computeSecret(key, this.encoding, this.encoding);   
    }
    catch (err) {
        return false;
    }
};

module.exports = new AuthService();

