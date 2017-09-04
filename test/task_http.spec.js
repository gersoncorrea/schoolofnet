import sinon from 'sinon';
import chai from 'chai';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import Todo from '../models/task';

chai.use(chaiHttp);

require('sinon-mongoose');
const expect = chai.expect;
const request = chai.request;
const uri = 'http://localhost:3000';

describe('Task Request',()=>{
    it('should make a request and return a list of tasks',(done)=>{
        request(uri)
        .get('/tasks')
        .end((err,res)=>{
            if(!err){
                expect(res.body.status).to.be.true;
                expect(res.body.data).to.be.an('array');
                done();
            }
        })
    })
    
    it('should make a request and not send name form data',(done)=>{
        request(uri)
        .post('/tasks/add')
        .send()
        .end((err,res)=>{
            if(err){
                expect(res.body.status).to.be.false;
                expect(res).to.have.status(500);
                done();
            }
        })
    })

    it('should make a request and send name form data',(done)=>{
        request(uri)
        .post('/tasks/add')
        .send({
            name: 'Ruth'
        })
        .end((err,res)=>{
            if(!err){
                expect(res.body.status).to.be.true;
                expect(res).to.have.status(201);
                done();
            }
        })

    })

    it('should  return error find',(done)=>{
        let mock = sinon.mock(Todo);

        mock.expects('find').yields({
            status: false
        },null);

        Todo.find((err,result)=>{
            mock.verify();
            mock.restore();

            expect(err.status).to.be.false;
            expect(err.status).to.not.be.true;

            done();
        })
    })
})
