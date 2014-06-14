var mocha = require('mocha');
var should = require('chai').should();
var redis = require('../../services/redis');

describe('redis service', function() {

    beforeEach(function(done) {

        // Make sure we're on the TEST db and flush it
        redis.select(redis.DB_INDEX_TEST);
        redis.flushdb(done);
    });

    it ('can set and retrieve string values', function(done) {

        var key = 'foo';
        var value = 'bar';

        redis.set(key, value, function(err, result) {
            'OK'.should.equal(result);
            redis.get(key, function(err, result) {
                value.should.equal(result);
                done();
            });
        });
    });

    it ('can set and retrieve object values', function(done) {

        var key = 'foo';
        var value = { bar: 'baz' };

        redis.hmset(key, value, function(err, result) {
            'OK'.should.equal(result);
            redis.hgetall(key, function(err, result) {
                value.should.deep.equal(result);
                done();
            }); 
        });
    });
});