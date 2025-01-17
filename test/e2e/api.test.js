import {
  jest,
  expect,
  test,
  describe,
} from '@jest/globals'

import superTest from 'supertest'
import Server from '../../src/server.js'
import Database from '../../src/database'

//  flaky
/*
DESAFIO PARA QUEM ASSISTIU:

Fazer com que Rodar o POST primeiro, não suge o GET
https://youtu.be/hQB139HP3GE
*/
describe('API E2E Test Suite', () => {

  afterEach(() => {
    Database.clear()
  })

  test('POST /  - should save an item and return ok', async () => {
    const response = await superTest(Server)
      .post('/')
      .send({
        nome: 'erickwendel',
        age: 27
      })
    const expectedResponse = { ok: 1 }
    expect(JSON.parse(response.text)).toStrictEqual(expectedResponse)
  })

  test('GET /  - should return an array', async () => {
    const response = await superTest(Server)
      .get('/')

    const data = JSON.parse(response.text)
    expect(data).toBeInstanceOf(Array)
    expect(data.length).toEqual(0)
  })

  test('DELETE /  - should save an item, delete and return ok', async () => {
    // Create data new on the server
    await superTest(Server)
      .post('/')
      .send({
        nome: 'erickwendel',
        age: 27
      })

    // Delete data on the server
    const deleteRequest = await superTest(Server).delete('/');
    const responseDelete = { ok: 1 }
    expect(JSON.parse(deleteRequest.text)).toStrictEqual(responseDelete)

    // Check if there isn't data on the server
    const response = await superTest(Server)
      .get('/')
    const data = JSON.parse(response.text)
    expect(data).toBeInstanceOf(Array)
    expect(data.length).toEqual(0)
  })
})
