import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

import { ArticleProps } from "../../utils/article";
import classes from "./article-content.module.css";

const ArticleContent: React.FC<ArticleProps> = (props) => {
  const { article } = props;

  const components: any = {
    p(paragraph: any) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        const alt = image.properties.alt?.replace(/ *\{[^)]*\} */g, "");

        // const metaWidth = image.properties.alt.match(/{([^}]+)x/);
        // const metaHeight = image.properties.alt.match(/x([^}]+)}/);
        // const width = metaWidth ? +metaWidth[1] : 768;
        // const height = metaHeight ? +metaHeight[1] : 432;

        const metaSize = image.properties.alt.match(/\d+x\d+/);
        let width;
        let height;
        if (metaSize) {
          const metaSizeArray = metaSize[0].split("x");
          width = +metaSizeArray[0];
          height = +metaSizeArray[1];
        } else {
          width = 768;
          height = 432;
        }

        return (
          <div className={classes.imageContent}>
            <Image
              src={image.properties.src}
              alt={alt}
              width={width}
              height={height}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    code(code: any) {
      // Need to see the actual objects because code block received different objects depending on types
      // console.log("code");
      // console.log(code);
      // console.log('node.properties');
      // console.log(code.node.properties);
      // console.log("node.children");
      // console.log(code.node.children);
      // console.log("node.position");
      // console.log(code.node.position);

      const { inline, node, children, className } = code;

      if (inline) {
        return <code className={classes.defaultCodeDisplay}>{children}</code>;
      } else if (!inline && !className) {
        return (
          <div className={classes.defaultCodeDisplay}>
            <code>{children}</code>
          </div>
        );
      } else if (className) {
        const language = className.split("-")[1];
        return (
          <SyntaxHighlighter style={a11yDark} language={language}>
            {children}
          </SyntaxHighlighter>
        );
      }
    },
  };

  return (
    <article className={classes.content}>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkMath]}
        // rehypePlugins={[rehypeKatex]}
        rehypePlugins={[rehypeMathjax]}
      >
        {article.content}
      </ReactMarkdown>
    </article>
  );
};

export default ArticleContent;