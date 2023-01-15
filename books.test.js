process.env.NODE_ENV='test'
const { response } = require('express');
const request = require('supertest');
const app = require('../app')
const db = require("../db")


let book;

beforeEach (async () => {
    let res = await db.query(
        `INSERT INTO books (isb, amazon_url, author, language, pages, publisher, title, year VALUES ("0691161518", "http://a.co/eobPtX2", "http://a.co/eobPtX2", "english", 264, "Princeton University Press", "Power-Up: Unlocking Hidden Math in Video Games", 2017`);

    book = results.rows[0]
    }
)

describe('POST /books', () => {
    test('Creates a new book', async () => {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn:'12346549564',
                amazon_url:'amazon.com', 
                author:'me',
                language: 'english',
                pages:4000000, 
                publisher:'Springboard publishing services', 
                title:'how to succeed ina  coding bookcamnp', 
                year:2023
            })
        expect(response.statusCode).toBe(201);
    })
    test('Get rejected from an invalid book', async () => {
        const response = await request(app)
            .post(`/books`)
            .send({
                isbn:'21231644654', 
                amazong_url:'amazon.com'
            })
        expect(response.statusCode).toBe(400);
    })
})

describe('PUT /books/:id', function () {
    test('Update the example book', async () => {
        const response  = await response(app)
            .put(`/books/${book.isbn}`)
            .send({
                amazon_url: 'amazong.com', 
                author: 'me', 
                language: 'english',
                pages:4000000, 
                publisher:'Springboard publishing services', 
                title:'how to succeed ina  coding bookcamnp', 
                year:2023
            })
        expect(response.body.book.title).toBe('how to succeed ina  coding bookcamnp')
    })
})