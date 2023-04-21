import Link from "next/link";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import classes from "./article-card.module.css";
import { Article } from "../../types/types";

const ArticleCard: React.FC<Article> = (props) => {
  const { id, title, date, image, excerpt, slug, category, view, like } =
    props.article;

  const cardClickHandler = () => {
    // Show linear progress?
  };

  return (
    <Link href={`/article/${slug}`} passHref>
      <Card onClick={cardClickHandler}>
        <CardMedia>
          <div className={classes.imageContainer}>
            <Image
              src={`/images/article/${slug}/${image}`}
              alt=""
              fill={true}
              sizes="50vw"
              // priority={true}
              style={{ objectFit: "cover" }}
            />
          </div>
        </CardMedia>
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary" noWrap>
            {excerpt}
          </Typography> */}
          <Typography
            variant="body2"
            color="text.secondary"
            pt={1}
            align="inherit"
          >
            {`${category} | ${date} | ${view} views | ${like} likes`}
          </Typography>
        </CardContent>
        {/* {isLoading && <LinearProgress />} */}
      </Card>
    </Link>
  );
};

export default ArticleCard;