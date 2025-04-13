const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();

const PORT = process.env.PORT || 3001;
const AUTH_HEADERS = {
    Authorization: "Token 4e15396f99ae10dd5c195d81fb6a3722c0a44a10",
    "Content-Type": "application/json",
};

app.use(cors());

// Endpoint para PDVs de GGPF
app.get("/api/ggpf/pdv", async (req, res) => {
    try {
        const response = await fetch(
            "https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119/GGPFPDVs",
            { headers: AUTH_HEADERS }
        );
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("Error en el proxy GGPF PDV:", err);
        res.status(500).json({ error: "Error al obtener datos de GGPF PDV" });
    }
});

// Endpoint para Productos de GGPF
app.get("/api/ggpf/producto", async (req, res) => {
    try {
        const response = await fetch(
            "https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119/GGPFProductos",
            { headers: AUTH_HEADERS }
        );
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("❌ Error en el proxy GGPF Producto:", err);
        res.status(500).json({ error: "Error al obtener datos de GGPF Productos" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Proxy GGPF activo en http://localhost:${PORT}`);
});
