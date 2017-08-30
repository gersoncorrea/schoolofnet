var calc = require('./../calc.js');
var chai = require('chai');
var expect = chai.expect;

describe('calc test', function(){
    it('should sum return 5', function(done){
        var result = calc.sum(2,3);
        expect(result).to.equal(5);
        done();
    })
})