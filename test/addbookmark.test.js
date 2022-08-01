// Test addbookmark and removebookmark at the same time.
require('babel-register');

const server = require("../app.js").listen(8006);
let request = require("supertest");
let assert = require("assert");

const addbookmark_success1 = {
    email: "unittest@unittest.com",
    rid: 1
}

const addbookmark_success2 = {
    email: "unittest@unittest.com",
    rid: 2
}

const addbookmark_duplicaterecipe = {
    email: "unittest@unittest.com",
    rid: 1
}

const removebookmark_success1 = {
    email: "unittest@unittest.com",
    rid: 2
}

const removebookmark_success2 = {
    email: "unittest@unittest.com",
    rid: 1
}

// test 1
it('add recipe 1 into bookmark', function(done){
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/recipe/addbookmark')
            .send(addbookmark_success1)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                console.log(res.body)
                assert.equal(res.body.bookmark, "0,1")
            })
            .end(done)
    }, 50, 'funky')
})

// test 2
it('add recipe 2 into bookmark', function(done){
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/recipe/addbookmark')
            .send(addbookmark_success2)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.bookmark, "0,1,2")
            })
            .end(done)
    }, 100, 'funky')
})

// test 3
it('add recipe and found duplicate in bookmark', function(done){
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/recipe/addbookmark')
            .send(addbookmark_duplicaterecipe)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.code, 201)
            })
            .end(done)
    }, 150, 'funky')
})

// test 4
it('remove recipe 2 from bookmark', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/recipe/removebookmark')
            .send(removebookmark_success1)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.bookmark, '0,1')
            })
            .end(done)
    }, 200, 'funky')
})

// test 5
it('remove recipe 1 from bookmark', function(done) {
    setTimeout(function() {
        request(server)
            .post('/reciperecommend/recipe/removebookmark')
            .send(removebookmark_success2)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                assert.equal(res.body.bookmark, '0')
            })
            .end(done)
    }, 250, 'funky')
})