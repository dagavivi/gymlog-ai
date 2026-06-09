const SHEETS_URL = "https://script.google.com/macros/s/AKfycbxYLlNKyQc_1QjpfN2WGxGE7AJivb2lAqBdFKrKjchr5_3Ka2KSWSza5RyD86nT1HbQ/exec";
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const action = req.query.action;
      const response = await fetch(`${SHEETS_URL}?action=${action}`);
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const response = await fetch(SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      return res.status(200).json(data);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
