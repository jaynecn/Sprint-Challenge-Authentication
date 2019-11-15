const server = require('./server');
const request = require('supertest');

describe('server', () => {
  describe('[GET] / endpoint', () => {

    test('the db env is testing', () => {
      expect(process.env.DB_ENV).toBe('testing')
    })

    test(' GET should return 200', async () => {
      const response = await request(server).get('/')
      expect(response.status).toBe(200)
    })

    test('test server ', () => {
      return request(server)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
    })

  })

  describe('[POST] / endpoint', () => {
    let goodData = {"username": "shaun", "password": "testing"}

    let duplicateData = {"username": "shaun", "password": "testing"}

    let wrongData = {"name": "chioma", "password": "testing"}

    test(' POST REGISTER new member 201 ', () => {

     request('http://localhost:3300/api/auth/register')
        .post('/register')
        .send(goodData)
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/)
    })

    test(' POST REGISTER duplicate data 500 ', () => {

      request('http://localhost:3300/api/auth/register')
         .post('/register')
         .send(duplicateData)
         .set('Accept', 'application/json')
         .expect(500)
         .expect('Content-Type', /json/)
     })

     test(' POST REGISTER wrong data 500 ', () => {

      request('http://localhost:3300/api/auth/register')
         .post('/register')
         .send(wrongData)
         .set('Accept', 'application/json')
         .expect(500)
         .expect('Content-Type', /json/)
     })

     test(' POST LOGIN 200 ', () => {

      request('http://localhost:3300/api/auth/login')
         .post('/login')
         .send(goodData)
         .set('Accept', 'application/json')
         .expect(200)
         .expect('Content-Type', /json/)
     })

     test(' POST LOGIN wrong data 500 ', () => {

      request('http://localhost:3300/api/auth/login')
         .post('/login')
         .send(wrongData)
         .set('Accept', 'application/json')
         .expect(500)
         .expect('Content-Type', /json/)
     })

     test(' POST LOGIN no data 500 ', () => {

      request('http://localhost:3300/api/auth/login')
         .post('/login')
         .set('Accept', 'application/json')
         .expect(500)
         .expect('Content-Type', /json/)
     })
  })

  describe('[GET] / api/jokes', () => {
    let token = { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6Im1hdHQiLCJpYXQiOjE1NzM4MTA4NjksImV4cCI6MTU3MzgzOTY2OX0.oCxQHJBEIjzc2VA1qwZeSLWOoUNDXFQaGVxoQgNwjkk"}

    let badToken = { Authorization: "eyJhbGciOiJ"}

    test(' GET JOKES 200 ', () => {

     request('http://localhost:3300/api/jokes')
        .post('/jokes')
        .send(token)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
    })

    test(' GET JOKES no token 500 ', () => {

      request('http://localhost:3300/api/jokes')
         .post('/jokes')
        //  .send(token)
         .set('Accept', 'application/json')
         .expect(500)
         .expect('Content-Type', /json/)
     })

     test(' GET JOKES bad token 500 ', () => {

      request('http://localhost:3300/api/jokes')
         .post('/jokes')
         .send(badToken)
         .set('Accept', 'application/json')
         .expect(500)
         .expect('Content-Type', /json/)
     })
  })
})
