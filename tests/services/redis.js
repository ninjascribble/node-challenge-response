var mocha = require('mocha');
var expect = require('chai').expect;
var redis = require('../../services/redis').configure();

describe('redis service', function() {

    it('can set and retrieve string values', function(done) {

        var key = 'foo';
        var value = 'bar';
        var client = redis.client;

        client.set(key, value, function(err, result) {
            expect(result).to.equal('OK');
            client.get(key, function(err, result) {
                expect(result).to.equal(value);
                done();
            });
        });
    });
});