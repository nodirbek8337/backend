import { Request, Response } from "express";
import pool from "../database";

export const getOverviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM overviews");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatosi" });
  }
};

export const getOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM overviews WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ message: "Overview topilmadi" });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatosi" });
  }
};

export const addOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, introduction, conclusion, research_focus, image_gallery } = req.body;

    const result = await pool.query(
      `INSERT INTO overviews (title, introduction, conclusion, research_focus, image_gallery) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, introduction, conclusion, research_focus, image_gallery]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatosi" });
  }
};

export const editOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, introduction, conclusion, research_focus, image_gallery } = req.body;

    const result = await pool.query(
      `UPDATE overviews SET title = $1, introduction = $2, conclusion = $3, research_focus = $4, image_gallery = $5 
       WHERE id = $6 RETURNING *`,
      [title, introduction, conclusion, research_focus, image_gallery, id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Overview topilmadi" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatosi" });
  }
};

export const removeOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM overviews WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Overview topilmadi" });
      return;
    }

    res.json({ message: "Overview o‘chirildi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server xatosi" });
  }
};
