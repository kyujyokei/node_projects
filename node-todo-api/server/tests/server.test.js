const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


// array of dummy todos
const todos = [{
    text: 'First test todo'
},{
    text: 'Second test todo'
}];



// this funtion will run everytime (every if) before the test case
beforeEach((done) => {
    // // wipes out db
    // Todo.remove({}).then(() => {done()});

    // insert the todo dummy array
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());

});

describe('POST / todos', () => {

    // test case for the number of todos
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err));
            })
    });

    // test case for validation of todos
    it('should not create todo with invalid body data', (done) => {
        var text = '';

        request (app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => done(err));
            });
    });
});

describe('GET /todos', () => {
    it('Should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
})