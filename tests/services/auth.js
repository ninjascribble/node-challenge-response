var mocha = require('mocha');
var expect = require('chai').expect;
var auth = require('../../services/auth').configure();

describe('auth service', function() {

    it('can provide a random token', function() {

        var token1 = auth.token();
        var token2 = auth.token();

        expect(token1).to.be.an('Object');
        expect(token2).to.be.an('Object');
        expect(token1).to.not.deep.equal(token2);
    });

    it('can validate a provided token', function() {

        var token = auth.token();
        var result = auth.validateToken(token.key, token.secret);

        expect(result).to.be.true;
    });

    it('does not validate an invalid token', function() {

        var result = auth.validateToken('foo', 'bar');

        expect(result).to.be.false;
    });
});