import pool from "./database"; // Sizning database.js faylingiz
import dotenv from "dotenv";

dotenv.config();

const createTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS overviews (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      introduction TEXT,
      conclusion TEXT,
      research_focus JSONB,
      image_gallery JSONB
    );
  `;

  try {
    console.log("Creating table if it doesn't exist...");
    await pool.query(createTableQuery);
    console.log("Table created successfully (if not already existing).");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

// Server ishga tushganda jadvalni yaratish
createTable();
