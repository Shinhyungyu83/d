const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000; // 환경 변수에서 포트 가져오기

app.use(cors());
app.use(express.json());

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL; // 환경 변수에서 URL 가져오기

app.get("/api/data", async (req, res) => {
  const { name, rrn } = req.query;

  if (!name || !rrn) {
    return res.status(400).json({ error: "이름과 주민번호 앞 6자리를 입력하세요." });
  }

  if (!/^\d{6}$/.test(rrn)) {
    return res.status(400).json({ error: "주민번호 앞 6자리는 6자리 숫자여야 합니다." });
  }

  try {
    const response = await axios.get(`${GOOGLE_SCRIPT_URL}?name=${name}&rrn=${rrn}`);
    res.json(response.data);
  } catch (error) {
    console.error("데이터 가져오기 오류:", error);
    if (error.response) {
      res.status(error.response.status).json({
        error: "데이터를 가져오는 중 오류 발생",
        details: error.response.data,
      });
    } else if (error.request) {
      res.status(500).json({ error: "데이터를 가져오는 중 오류 발생", details: "서버에 연결할 수 없습니다." });
    } else {
      res.status(500).json({ error: "데이터를 가져오는 중 오류 발생", details: error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
