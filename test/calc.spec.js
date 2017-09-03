const calc = require('./../calc.js');
const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
const sinon = require('sinon')
// import sinon from 'sinon';



describe('calc test', function(){
    it('should sum return 5', (done)=>{
        // let result = calc.sum(2,3);
        // expect(result).to.equal(5);
        // done();
       
        let mock = sinon.mock(calc);
        mock.expects('sum').yields(null,5);
        calc.sum(2,3,(err,result)=>{
            mock.verify();
            mock.restore();

            expect(result).to.be.equal(5);
            
            done();
        });
        
    })

    it('stue func',(done) => {
        let stub = sinon.stub(calc,'sum');

        stub.returns(7)

        var result = calc.calc(4,3)
        
        //expect(calc.sum).to.have.been.called();

        expect(result).to.equal(7)

        stub.restore()
        done();
  
    })
})