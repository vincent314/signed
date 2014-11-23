


describe("Test signed", function () {
    var URL = 'http://host:8080/anycontext';

    it("Should signe an URL with default algo", function () {
        var signed = require('../lib/signed.js');
        var signature = signed({secret: 'secret'});

        var newUrl = signature.sign(URL);

        expect(newUrl).toMatch(new RegExp('http://host:8080/anycontext\\?signed=r:\\d+;\\w{32}'));
        expect(signature.verifyUrl({
            protocol: 'http',
            get: function () {
                return 'host:8080'
            },
            url: newUrl.substring(16)
        })).toBe(true);
    });

    it("Should sign an URL with sha1 algo", function () {
        var signed = require('../lib/signed.js');
        var signature = signed({secret: 'secret', algo: 'sha1'});

        var newUrl = signature.sign(URL);

        expect(newUrl).toMatch(new RegExp('http://host:8080/anycontext\\?signed=r:\\d+;\\w{32}'));
        expect(signature.verifyUrl({
            protocol: 'http',
            get: function () {
                return 'host:8080'
            },
            url: newUrl.substring(16)
        })).toBe(true);
    });

    it("Should not allow invalid algo", function (done) {
        var signed = require('../lib/signed.js');
        var signature = signed({secret: 'secret', algo: 'foo'});

        try {
            signature.sign(URL);
        } catch (e) {
            expect(e.message).toBe('Digest method not supported');
            done();
        }
    });
});