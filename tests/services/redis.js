var mocha = require('mocha');
var should = require('chai').should();
var redis = require('../../services/redis').configure();

describe('redis service', function() {

    it('can set and retrieve string values', function(done) {

        var key = 'foo';
        var value = 'bar';
        var client = redis.client;

        client.set(key, value, function(err, result) {
            'OK'.should.equal(result);
            client.get(key, function(err, result) {
                value.should.equal(result);
                done();
            });
        });
    });
});