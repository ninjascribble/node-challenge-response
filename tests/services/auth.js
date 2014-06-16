var mocha = require('mocha');
var expect = require('chai').expect;
var auth = require('../../services/auth').configure();

describe('auth service', function() {

    it('provides tokens', function() {

        var token = auth.token();

        expect(token).to.be.an('Object');
        expect(token.key).to.exist;
        expect(token.secret).to.exist;
    });

    it('validates tokens', function() {

        var token = auth.token();
        var result = auth.validateToken(token.key, token.secret);

        expect(result).to.be.true;
    });

    it('does not validate invalid tokens', function() {

        var result = auth.validateToken('foo', 'bar');

        expect(result).to.be.false;
    });

    it('creates a unique token every time', function() {

        var token1 = auth.token();
        var token2 = auth.token();
        var result1 = auth.validateToken(token1.key, token1.secret);
        var result2 = auth.validateToken(token2.key, token2.secret);
        var result3 = auth.validateToken(token1.key, token2.secret);
        var result4 = auth.validateToken(token2.key, token1.secret);

        expect(result1).to.be.true;
        expect(result2).to.be.true;
        expect(result3).to.be.false;
        expect(result4).to.be.false;
    });
});