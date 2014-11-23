var signed = require('../lib/signed.js');


describe("Test signed", function () {

    it("Should signe an URL with default algo", function () {
        var signature = signed({secret: 'secret'});

        var newUrl = signature.sign('http://host:8080/anycontext');

        expect(newUrl).toMatch(new RegExp('http://host:8080/anycontext\\?signed=r:\\d+;\\w{32}'));


        expect(signature.verifyUrl({host:'localhost',port:'8080',url:newUrl.split('host:8080')[1]})).toBeTrue();
    });

    it("Should signe an URL with sha1 algo", function () {
        var signature = signed({secret: 'secret', algo: 'sha1'});

        var newUrl = signature.sign('http://host:8080/anycontext');

        expect(newUrl).toMatch(new RegExp('http://host:8080/anycontext\\?signed=r:\\d+;\\w{32}'));
    });
});