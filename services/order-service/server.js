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
            service: "order-service",
            method: req.method,
            status: String(res.statusCode)
        });
    });
    next();
});

let orders = [
    {
        id: 1,
        userId: 1,
        productId: 1,
        quantity: 1,
        status: "CREATED"
    }
];

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        service: "order-service"
    });
});

// Metrics
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

// Get all orders
app.get("/orders", (req, res) => {
    res.json(orders);
});

// Get order by ID
app.get("/orders/:id", (req, res) => {
    const order = orders.find(
        o => o.id === Number(req.params.id)
    );

    if (!order) {
        return res.status(404).json({
            message: "Order not found"
        });
    }

    res.json(order);
});

// Create order
app.post("/orders", (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (
        !Number.isInteger(Number(userId)) ||
        Number(userId) <= 0 ||
        !Number.isInteger(Number(productId)) ||
        Number(productId) <= 0 ||
        !Number.isInteger(Number(quantity)) ||
        Number(quantity) <= 0
    ) {
        return res.status(400).json({
            message: "Valid userId, productId and quantity are required"
        });
    }

    const order = {
        id: orders.length + 1,
        userId: Number(userId),
        productId: Number(productId),
        quantity: Number(quantity),
        status: "CREATED"
    };

    orders.push(order);

    res.status(201).json(order);
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Order Service running on port ${PORT}`);
});
