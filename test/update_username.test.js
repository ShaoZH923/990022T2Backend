require('babel-register');

let server = require("../app.js").listen(8005);
let request = require("supertest");
let assert = require("assert");

let user_login_model = require("../application/model/user_accounts")

const correct_combo_1 = {
    "email": "z5300919@ad.unsw.edu.au",
    "newusername": "changedUsername"
}

const corr_username_1 = "changgedUsername"

const correct_combo_2 = {
    "email": "z5300919@ad.unsw.edu.au",
    "newusername": "originalUsername"
}

const corr_username_2 = "originalUsername"

const wrong_email = {
    "email": "unittest@unitttttest.com",
    "newusername": "unittest"
}

// test 1, change username successfully
it('change username successfully 1', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/profile/updateusername')
            .send(correct_combo_1)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            // .expect(function(res) {
            //     assert.equal(user_login_model.get_username(user_login_model.get_uid(correct_combo_1.email)),
            //         correct_combo_1.newusername)
            // })
            .end(done)
    }, 50, 'funky');
})

// test 2, change username but wrong email
it('change username successfully 2', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/profile/updateusername')
            .send(wrong_email)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 201)
            })
            .end(done)
    }, 100, 'funky');
})


// test 3, change username successfully
it('change username successfully 2', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/profile/updateusername')
            .send(correct_combo_2)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            // .expect(function(res) {
            //     assert.equal(user_login_model.get_username(user_login_model.get_uid(correct_combo_1.email)),
            //         correct_combo_1.newusername)
            // })
            .end(done)
    }, 150, 'funky');
})