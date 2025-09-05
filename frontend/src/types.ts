import type { ReactNode } from "react";

export interface Book {
  _id: string; // changed to string since MongoDB _id is usually an ObjectId
  title: string;
  author?: string; // optional because scraper doesn't fetch author
  desc?: string;   // optional because scraper doesn’t fetch description
  gradient?: string;
  icon?: ReactNode;
  button?: string;
  thumbnail: string;
  price?: number;
  rating?: number;
  availability?: string; // availability is text ("In stock"), not boolean
}
