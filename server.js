const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000; // Render는 자동으로 포트 할당

// CORS 허용 설정
app.use(cors());

// Google Sheet 데이터를 가져오는 API 엔드포인트
app.get("/api/sheet", async (req, res) => {
    try {
        const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSh9swdx4Mh0TlTcJGcZJibM8-Y7mFKjgxOopvrCVuQ-pvagWgwbLpJeBzVKM5mlpLstZwsFtQ4hIFY/pub?gid=499769709&single=true&output=csv";
        
        // `node-fetch` 대신 `axios` 사용 (더 안정적)
        const response = await axios.get(sheetUrl, {
            headers: { "Content-Type": "text/csv" }, 
            responseType: "text"
        });

        // 응답을 그대로 클라이언트에게 전달
        res.setHeader("Content-Type", "text/csv");  
        res.send(response.data);
    } catch (error) {
        console.error("Error fetching Google Sheet:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
