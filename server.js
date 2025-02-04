const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

// CORS 설정
app.use(cors());
app.use(express.json());

// Google Apps Script API URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyc2tFfAyK4q6uhkBElXN3NL0cMF6GY8cdso5QN4U9HKjxb4YxOaV6ZP_N4s_4DijAF/exec";

// 프록시 엔드포인트
app.get("/api/data", async (req, res) => {
  try {
    const { name, rrn } = req.query;

    if (!name || !rrn) {
      return res.status(400).json({ error: "이름과 주민번호 앞 6자리를 입력하세요." });
    }

    const response = await axios.get(`${GOOGLE_SCRIPT_URL}?name=${encodeURIComponent(name)}&rrn=${encodeURIComponent(rrn)}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "데이터를 가져오는 중 오류 발생", details: error.message });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
