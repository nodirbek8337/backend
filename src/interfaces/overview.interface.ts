export interface IOverview {
  id?: number;
  title: string;
  introduction: string[];
  conclusion: string[];
  research_focus: {
    category: string;
    details: string[];
  }[];
  image_gallery: string[];
}
