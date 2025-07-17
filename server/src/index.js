import express from "express";
import pool from './db.js'
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4004;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hola desde server");
});

app.get("/api/clients", async (req, res) => {  
  const { dniruc, nombrers } = req.query;
  try {
    let query = 'SELECT * FROM clients WHERE 1=1';
    const params = [];

    if (dniruc) {
      query += ' AND dniruc LIKE ?';
      params.push(`%${dniruc}%`);
    }

    if (nombrers) {
      query += ' AND nombrers LIKE ?';
      params.push(`%${nombrers}%`);
    }

    const [rows] = await pool.query(query, params);    
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving clients' });
  }
});

app.listen(PORT, () => {
  console.log("Server on port: ", PORT);
});