const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

// CORS 허용 설정
app.use(cors());

// Google Sheet 데이터 가져오는 API
app.get("/api/sheet", async (req, res) => {
    try {
        const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSh9swdx4Mh0TlTcJGcZJibM8-Y7mFKjgxOopvrCVuQ-pvagWgwbLpJeBzVKM5mlpLstZwsFtQ4hIFY/pub?gid=499769709&single=true&output=csv";
        const response = await fetch(sheetUrl);
        const data = await response.text();
        res.send(data);
    } catch (error) {
        console.error("Error fetching Google Sheet:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
