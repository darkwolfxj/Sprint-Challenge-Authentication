const server = require("../api/server")
const request = require("supertest")
const db = require("../database/dbConfig")

describe("server.js", () => {
    describe("POST /api/auth/register", () => {
        it("adds a user to the database", async () => {
            const user = {
                username: "test user 1",
                password: "test password"
            }
            const response = await request(server).post("/api/auth/register").send(user)
        })
        it("should return status 201", async () => {
            const user = {
                username: "test user 2",
                password: "test password"
            }
            const response = await request(server).post("/api/auth/register").send(user)
            expect(response.status).toBe(201)
        })
    })
    describe("POST /api/auth/login", () => {
        it("returns a token", async () => {
            const user = {
                username: "test user 1",
                password: "test password"
            }
            const response = await request(server).post("/api/auth/login").send(user) 
            expect(response.body.token).not.toBeUndefined()
        })
        it("should return status 200", async () => {
            const user = {
                username: "test user 1",
                password: "test password"
            }
            const response = await request(server).post("/api/auth/login").send(user)
            expect(response.status).toBe(200)
        })
    })
})