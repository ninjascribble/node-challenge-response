var mocha = require('mocha');
var should = require('chai').should();
var kvstore = require('../../services/kvstore');

describe('KVStore', function() {

    it ('can set values', function(done) {

        var key = 'foo';
        var value = 'bar';

        kvstore.set.should.not.Throw(Error);
        kvstore.get.should.not.Throw(Error);

        kvstore.set(key, value);
        kvstore.get(key, function(err, result) {
            value.should.equal(result);
            done();
        });
    });
});