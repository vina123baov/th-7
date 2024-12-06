// Import necessary modules
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware2');

// Initialize the server
const server = restify.createServer({
    name: 'MyRestifyServer'
});

// Configure CORS settings
const cors = corsMiddleware({
    origins: ['*'], // Specify allowed origins, e.g., ['http://localhost:3000']
    allowHeaders: ['API-Token', 'Authorization'], // Specify allowed headers
    exposeHeaders: ['API-Token-Expiry']
});

// Apply CORS middleware
server.pre(cors.preflight);
server.use(cors.actual);

// Apply body and query parsers for handling request payloads
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

// Import routes
const root = require('./routes/root');

// Apply routes
root.applyRoutes(server);

// Set up server to listen on specified port
const PORT = 8080;
server.listen(PORT, function () {
    console.log('%s listening at %s', server.name, server.url);
});

// const index = require('./routes/index');
const room = require('./routes/room');
const login = require('./routes/login');
const manager = require('./routes/manager');
const customer = require('./routes/customer');
const images = require('./routes/images');
const booking = require('./routes/booking');

// index.applyRoutes(server);
login.applyRoutes(server);
room.applyRoutes(server);
manager.applyRoutes(server);
customer.applyRoutes(server);
images.applyRoutes(server);
booking.applyRoutes(server);