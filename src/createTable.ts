import pool from "./database"; // Sizning database.js faylingiz
import dotenv from "dotenv";

dotenv.config();

const checkTableExists = async () => {
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
      console.log("Jadval mavjud emas.");
    }
  } catch (error) {
    console.error("Jadvalni tekshirishda xato:", error);
  }
};

// Jadvalni tekshirish
checkTableExists();
