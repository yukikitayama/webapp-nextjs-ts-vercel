import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import ArticleContent from "../../components/article/article-content";
import { getArticlesFilenames, ArticleProps } from "../../utils/article";

const ArticleContentPage: React.FC<ArticleProps> = (props) => {
  const { article } = props;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" component="div">
          {article.title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          component="div"
          color="text.secondary"
        >
          {`${article.category} | ${article.date} | ${article.view} views | ${article.like} likes`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ArticleContent article={article} />
      </Grid>
    </Grid>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { slug } = params!;

  // Find article markdown file
  const articlesDirectory = path.join(process.cwd(), "articles");
  const markdownPath = path.join(articlesDirectory, `${slug}.md`);
  const markdownFile = fs.readFileSync(markdownPath, "utf-8");

  // Extract article ID
  const { content, data } = matter(markdownFile);
  const { id } = data;

  // Get article metadata
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/articles?id=${id}`
  );
  const fetchedData = await response.json();
  const { date, title, category, image, like, view } = fetchedData;

  // Make artcile object
  const article = {
    content: content,
    slug: slug,
    date: date,
    title: title,
    category: category,
    image: image,
    like: like,
    view: view,
  };

  return {
    props: {
      article: article,
    },
  };
};

export const getStaticPaths = () => {
  // To make getStaticProps() work, pre-generate all the dynamic path segments "slug"
  const articleFilenames = getArticlesFilenames();
  const slugs = articleFilenames.map((filename) =>
    filename.replace(/\.md$/, "")
  );

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
};

export default ArticleContentPage;