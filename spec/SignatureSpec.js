var signed = require('../lib/signed.js');

var signature = signed({secret:'secret'});

describe("Test signed", function () {

    it("Should signe an URL",function(){
        var newUrl = signature.sign('http://host:8080/anycontext');

        expect(newUrl).toMatch(new RegExp('http://host:8080/anycontext\\?signed=r:\\d+;\\w{32}'));

    });
});