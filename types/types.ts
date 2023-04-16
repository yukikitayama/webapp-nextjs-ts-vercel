export interface Article {
  article: {
    id: string;
    title: string;
    category: string;
    date: string;
    image: string;
    slug: string;
    view?: number;
    like?: number;
  };
}