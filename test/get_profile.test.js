require('babel-register')

const server = require("../app.js").listen(8004);
let request = require("supertest")
let assert = require("assert");

const using_email = {
    email: "demo@demo.com"
}

const using_uid = {
    uid: 4
}

const wrong_email = {
    email: "z5301@ad.unsw.edu.au"
}

// test 1, aquire user profile using email
it('aquire user profile using email', function(done){
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/profile/getprofile')
            .send(using_email)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.uid, 4)
            })
            .expect(function(res) {
                assert.equal(res.body.email, "demo@demo.com")
            })
            .expect(function(res) {
                assert.equal(res.body.username, "demoaccount")
            })
            .end(done)
    }, 50, 'funky')
})

// test 2, aquire user profile using uid
it('aquire user profile using uid', function(done){
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/profile/getprofile')
            .send(using_uid)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.uid, 4)
            })
            .expect(function(res) {
                assert.equal(res.body.email, "demo@demo.com")
            })
            .expect(function(res) {
                assert.equal(res.body.username, "demoaccount")
            })
            .end(done)
    }, 100, 'funky')
})

// test 3, input wrong email
it('aquire user profile using email', function(done){
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/profile/getprofile')
            .send(wrong_email)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 201)
            })
            .end(done)
    }, 50, 'funky')
})