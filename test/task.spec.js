import sinon from 'sinon';
import chai from 'chai';
import mongoose from 'mongoose';
import Todo from './../models/task';
const expect = chai.expect;
require('sinon-mongoose');

describe('Tasks',()=>{
    it('should create a new task',(done)=>{
        let mock = sinon.mock(
            new Todo({
                name: 'Task Test'
            })
        );

        let todo = mock.object;
        mock
            .expects('save')
            .yields(null,{
                status: true,
                data: {
                    name: 'Task test',
                    completed: false,
                }
            });

        todo.save((err,result)=>{
            mock.verify();
            mock.restore();

            expect(result.status).to.equal(true);
            expect(result.data).to.be.an('object');
            done();
        })
    })

    it('should remove one task by id',(done)=>{
        let mock = sinon.mock(Todo);
        mock.expects('findOneAndRemove').withArgs ({
            _id: '59ac44e258047379712ea972'
        }).yields(null,{
            status: true,
            _id: '59ac44e258047379712ea972'
        });
        Todo.findOneAndRemove({
            _id:'59ac44e258047379712ea972'
        },(err,result)=>{
            mock.verify();
            mock.restore();

            expect(result.status).to.be.equal(true);
            done();
        })
    })

    it('should return all tasks',(done)=>{
        let mock = sinon.mock(Todo);
        mock.expects('find').yields(null,{
            status: true,
            data: []
        })

        Todo.find((err,result)=>{
            mock.verify();
            mock.restore();

            expect(result.status).to.be.true;
            expect(result.data).to.be.an('array');
            done();
        })
    })
})