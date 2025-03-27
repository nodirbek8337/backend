export interface IOverview {
  title: string;
  introduction: string[];
  conclusion: string[];
  researchFocus: {
    category: string;
    details: string[];
  }[];
  imageGallery: string[];
}
