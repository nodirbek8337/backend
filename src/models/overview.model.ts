import pool from "../database";
import { IOverview } from "../interfaces/overview.interface";

export const getAllOverviews = async (): Promise<IOverview[]> => {
  const { rows } = await pool.query("SELECT * FROM overviews");
  return rows;
};

export const getOverviewById = async (id: number): Promise<IOverview | null> => {
  const { rows } = await pool.query("SELECT * FROM overviews WHERE id = $1", [id]);
  return rows.length ? rows[0] : null;
};

export const createOverview = async (overview: IOverview): Promise<IOverview> => {
  const { title, introduction, conclusion, research_focus, imageGallery } = overview;
  const { rows } = await pool.query(
    `INSERT INTO overviews (title, introduction, conclusion, research_focus, image_gallery)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, JSON.stringify(introduction), JSON.stringify(conclusion), JSON.stringify(research_focus), JSON.stringify(imageGallery)]
  );
  return rows[0];
};

export const updateOverview = async (id: number, overview: IOverview): Promise<IOverview | null> => {
  const { title, introduction, conclusion, research_focus, imageGallery } = overview;
  const { rows } = await pool.query(
    `UPDATE overviews SET title = $1, introduction = $2, conclusion = $3, research_focus = $4, image_gallery = $5 WHERE id = $6 RETURNING *`,
    [title, JSON.stringify(introduction), JSON.stringify(conclusion), JSON.stringify(research_focus), JSON.stringify(imageGallery), id]
  );
  return rows.length ? rows[0] : null;
};

export const deleteOverview = async (id: number): Promise<boolean> => {
  const { rowCount } = await pool.query("DELETE FROM overviews WHERE id = $1", [id]);
  return (rowCount || 0) > 0;
};
