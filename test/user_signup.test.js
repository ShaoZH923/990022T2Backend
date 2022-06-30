require('babel-register');

const user_accounts = require('../application/model/user_accounts');
let server = require("../app.js").listen(8001);
let request = require("supertest");
let assert = require("assert");

const duplicate_email_1 = {
    email: 'sample_explorer1@sampleemail.com',
    username: 'duplicate_email_1',
    password: 'duplicate_email_1',
    passwordconfirm: 'duplicate_email_1',
    accounttype: 1
}

const duplicate_email_2 = {
    email: 'sample_explorer2@sampleemail.com',
    username: 'duplicate_email_2',
    password: 'duplicate_email_2',
    passwordconfirm: 'duplicate_email_2',
    accounttype: 1
}

const duplicate_username_1 = {
    email: 'duplicate_username_1@sampleemail.com',
    username: 'sampleexplorer1',
    password: 'duplicate_username_1',
    passwordconfirm: 'duplicate_username_1',
    accounttype: 1
}

const duplicate_username_2 = {
    email: 'duplicate_username_2@sampleemail.com',
    username: 'sampleexplorer2',
    password: 'duplicate_username_2',
    passwordconfirm: 'duplicate_username_2',
    accounttype: 1
}

const password_not_same_1 = {
    email: 'pass_not_same_1@sampleemail.com',
    username: 'pass_not_same_1',
    password: 'password_1',
    passwordconfirm: 'not_password_1',
    accounttype: 1
}

const password_not_same_2 = {
    email: 'pass_not_same_2@sampleemail.com',
    username: 'pass_not_same_2',
    password: 'password_2',
    passwordconfirm: 'not_password_2',
    accounttype: 1
}

const signup_success = {
    email: 'signup_test@sampleemail.com',
    username: 'signup_test',
    password: 'signup_test',
    passwordconfirm: 'signup_test',
    accounttype: 0
}

/**
 * Unit test for user_signup.js
 * 1. remove potential test user from database
 * 2. run the test
 * 3. remove the test user from database
*/

it('duplicate email', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/signup')
            .send(duplicate_email_1)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 201)
            })
            .end(done)
    }, 50, 'funky');
})

it('duplicate email', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/account/signup')
            .send(duplicate_email_2)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 201)
            })
            .end(done)
    }, 100, 'funky');
})