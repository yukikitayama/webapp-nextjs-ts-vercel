import fs from "fs";
import path from "path";

const articlesDirectory = path.join(process.cwd(), "articles");

export const getArticlesFilenames = () => {
  return fs.readdirSync(articlesDirectory);
};

export interface ArticleProps {
  article: {
    content: string;
    slug: string;
    date: string;
    title: string;
    category: string;
    image: string;
    like: number;
    view: number;
  }
}