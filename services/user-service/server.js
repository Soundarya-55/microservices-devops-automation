const express = require("express");
const client = require("prom-client");

const app = express();

app.use(express.json());

const register = new client.Registry();

client.collectDefaultMetrics({ register });

const requests = new client.Counter({
    name: "http_requests_total",
    help: "Total HTTP requests",
    labelNames: ["service", "method", "status"]
});

register.registerMetric(requests);

app.use((req, res, next) => {
    res.on("finish", () => {
        requests.inc({
            service: "user-service",
            method: req.method,
            status: String(res.statusCode)
        });
    });
    next();
});

let users = [
    { id: 1, name: "Soundarya", email: "soundarya@example.com" },
    { id: 2, name: "Alex", email: "alex@example.com" }
];

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        service: "user-service"
    });
});

// Prometheus metrics
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

// Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// Get user by ID
app.get("/users/:id", (req, res) => {
    const user = users.find(
        u => u.id === Number(req.params.id)
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

// Create user
app.post("/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    const user = {
        id: users.length + 1,
        name,
        email
    };

    users.push(user);

    res.status(201).json(user);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`User Service running on port ${PORT}`);
});
