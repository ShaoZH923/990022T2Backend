require('babel-register');

const user_accounts = require('../application/model/user_accounts');
let server = require("../app.js").listen(8003);
let request = require("supertest");
let assert = require("assert");

const incorrect_email1 = {
    email: "z5300918@ad.unsw.edu.au",
    oldpassword: "12345678",
    newpassword: "whatever"
}

const incorrect_email2 = {
    email: "z530091@ad.unsw.edu.au",
    oldpassword: "12345678",
    newpassword: "whatever"
}

const incorrect_oldpassword1 = {
    email: "z5300917@ad.unsw.edu.au",
    oldpassword: "wrongpass1",
    newpassword: "whatever"
}

const incorrect_oldpassword2 = {
    email: "z5300917@ad.unsw.edu.au",
    oldpassword: "wrongpass2",
    newpassword: "whatever"
}

const correct_combo_1 = {
    email: "z5300917@ad.unsw.edu.au",
    oldpassword: "123456789",
    newpassword: "changedpass"
}

const correct_combo_2 = {
    email: "z5300917@ad.unsw.edu.au",
    oldpassword: "changedpass",
    newpassword: "123456789"
}

// test 1, change password using correct combo
it('change password with correct combo 1', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/changepassword')
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

// test 2, using incorrect email 1
it('change password with incorrect email 1', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/changepassword')
            .send(incorrect_email1)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 201)
            })
            .end(done)
    }, 100, 'funky');
})

// test 3, using incorrect email 2
it('change password with incorrect email 2', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/changepassword')
            .send(incorrect_email2)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 201)
            })
            .end(done)
    }, 150, 'funky');
})

// test 4, using incorrect oldpassword 1
it('change password with incorrect oldpassword 1', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/changepassword')
            .send(incorrect_oldpassword1)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 202)
            })
            .end(done)
    }, 200, 'funky');
})

// test 5, using incorrect oldpassword 2
it('change password with incorrect oldpassword 2', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/changepassword')
            .send(incorrect_oldpassword2)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 202)
            })
            .end(done)
    }, 250, 'funky');
})

// test 6, change password using correct combo 2
it('change password with correct combo 1', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/changepassword')
            .send(correct_combo_2)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 200)
            })
            .end(done)
    }, 50, 'funky');
})