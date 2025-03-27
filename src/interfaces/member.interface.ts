export interface IMember {
  id: string;
  fullName: string;
  nationality: string;
  year: number;
  major: string;
  email: string;
  imageUrl: string;
  academicStatus:
    | "alumni"
    | "undergraduate"
    | "master-candidate"
    | "phd-candidate"
    | "post-doc";
}
