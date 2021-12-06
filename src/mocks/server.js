const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('src/mocks/db.json')
const middlewares = jsonServer.defaults()

const PORT = 3001;

const randomStr =
    () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Login route
server.post('/login', (req, res) => {
    if (req.body?.email !== 'john@doe.com' || req.body?.password !== 'password')
        return res.status(401).send({ success: false, msg: 'Invalid credentials' });

    res.status(200).send({ success: true, data: { token:  randomStr() } });
})

// Json-server middleware
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

// Use default router
server.use(router)
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`)
})