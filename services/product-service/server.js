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
            service: "product-service",
            method: req.method,
            status: String(res.statusCode)
        });
    });
    next();
});

let products = [
    { id: 1, name: "Laptop", price: 55000 },
    { id: 2, name: "Headphones", price: 2500 },
    { id: 3, name: "Keyboard", price: 1500 }
];

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        service: "product-service"
    });
});

// Metrics
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

// Get products
app.get("/products", (req, res) => {
    res.json(products);
});

// Get product by ID
app.get("/products/:id", (req, res) => {
    const product = products.find(
        p => p.id === Number(req.params.id)
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

// Add product
app.post("/products", (req, res) => {
    const { name, price } = req.body;

    if (!name || !Number.isFinite(Number(price))) {
        return res.status(400).json({
            message: "Valid name and price are required"
        });
    }

    const product = {
        id: products.length + 1,
        name,
        price: Number(price)
    };

    products.push(product);

    res.status(201).json(product);
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Product Service running on port ${PORT}`);
});
