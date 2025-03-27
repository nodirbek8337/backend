import pool from "./database"; // Sizning database.js faylingiz
import dotenv from "dotenv";

dotenv.config();

const createTableIfNotExists = async () => {
  const checkTableQuery = `
    SELECT * 
    FROM information_schema.tables 
    WHERE table_name = 'overviews';
  `;

  try {
    // Jadval mavjudligini tekshirish
    const result = await pool.query(checkTableQuery);

    if (result.rows.length > 0) {
      console.log("Jadval mavjud.");
    } else {
      // Jadval mavjud bo'lmasa, uni yaratish
      const createTableQuery = `
        CREATE TABLE overviews (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          introduction TEXT,
          conclusion TEXT,
          research_focus JSONB,
          image_gallery JSONB
        );
      `;
      
      await pool.query(createTableQuery);
      console.log("Jadval yaratildi.");
    }
  } catch (error) {
    console.error("Jadvalni tekshirishda xato:", error);
  }
};

// Jadvalni yaratish
createTableIfNotExists();
