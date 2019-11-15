const db = require('../database/dbConfig');
const Members = require('./auth-model');

beforeEach(() => {
  return db('users').truncate()
})

describe('Members model', () => {
  describe('insert function', () => {
    let users
    it('should register a user', async () => {
      await Members.add({ "username": "chico", "password": "meow" })
      await Members.add({ "username": "bob", "password": "bob" })

      users = await db('users')
      expect(users).toHaveLength(2)
    })

    it('should register another user', async () => {
      await Members.add({ "username": "fiona", "password": "fiona" })

      users = await db('users')
      expect(users).toHaveLength(1)
    })

    // it('should NOT register user', async () => {
    //   await Members.add({"name": "chioma", "password": "testing"})
    // })
  })
})

// describe('hobbits model', () => {
//   beforeEach(async () => {
//     await db('hobbits').truncate();
//   });

//   describe('insert function', () => {
//     it('inserts hobbits into the db', async () => {
//       let hobbitsNumber;
//       hobbitsNumber = await db('hobbits');
//       expect(hobbitsNumber).toHaveLength(0);
//       await Hobbits.insert({ name: 'Gaffer' });
//       hobbitsNumber = await db('hobbits');
//       expect(hobbitsNumber).toHaveLength(1);
//     })
//   })
// })