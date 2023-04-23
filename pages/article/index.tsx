import { Fragment } from "react";
import Grid from "@mui/material/Grid";

import ArticleCard from "../../components/article/article-card";

interface ArticlePageProps {
  articles: {
    id: string;
    title: string;
    category: string;
    date: string;
    image: string;
    slug: string;
    view?: number;
    like?: number;
  }[];
}

const ArticlePage: React.FC<ArticlePageProps> = (props) => {
  
  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        {props.articles.map((article) => (
          <Grid item xs={12} md={4} lg={3} key={article.id}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/articles`
  );
  const articles = await response.json();

  return {
    props: {
      articles: articles,
    },
  };
}

export default ArticlePage;