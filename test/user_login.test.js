require('babel-register');

const user_accounts = require('../application/model/user_accounts');
let server = require("../app.js").listen(8002);
let request = require("supertest");
let assert = require("assert");

const correct_combo_1 = {
    email: 'unittest@unittest.com',
    password: 'unittest'
}

const correct_combo_2 = {
    email: 'anonymous1@gmail.com',
    password: '12345678'
}

const correct_combo_3 = {
    email: 'sample_explorer1@sampleemail.com',
    password: 'samplepassword'
}

const wrong_password_1 = {
    email: 'sample_explorer1@sampleemail.com',
    password: 'wrongpassword_1'
}

const wrong_password_2 = {
    email: 'sample_contributor1@sampleemail.com',
    password: 'wrongpassword_2'
}

const wrong_password_3 = {
    email: 'unittest@unittest.com',
    password: 'wrongpassword_3'
}

const wrong_email_1 = {
    email: 'email_1@wrong.com',
    password: 'doesnt_matter'
}

const wrong_email_2 = {
    email: 'email_2@wrong.com',
    password: 'also_doesnt_matter'
}

// test 1, login with correct credential
it('login with correct credential 1', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/login')
            .send(correct_combo_1)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 200)
            })
            .end(done)
    }, 50, 'funky');
})

// test 2, login with correct credential
it('login with correct credential 2', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/login')
            .send(correct_combo_2)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 200)
            })
            .end(done)
    }, 100, 'funky');
})

// test 3, login with correct credential
it('login with correct credential 3', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/login')
            .send(correct_combo_3)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 200)
            })
            .end(done)
    }, 150, 'funky');
})

// test 4, login with wrong password
it('login with wrong password', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/login')
            .send(wrong_password_1)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 202)
            })
            .end(done)
    }, 200, 'funky');
})

// test 5, login with wrong password
it('login with wrong password', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/login')
            .send(wrong_password_2)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 202)
            })
            .end(done)
    }, 250, 'funky');
})

// test 6, login with wrong password
it('login with wrong password', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/login')
            .send(wrong_password_3)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 202)
            })
            .end(done)
    }, 300, 'funky');
})

// test 7, login with wrong email
it('login with wrong password', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/login')
            .send(wrong_email_1)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 201)
            })
            .end(done)
    }, 350, 'funky');
})

// test 8, login with wrong email
it('login with wrong password', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/login')
            .send(wrong_email_2)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 201)
            })
            .end(done)
    }, 400, 'funky');
})