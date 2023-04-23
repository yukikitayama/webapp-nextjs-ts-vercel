import classes from "./explanation.module.css";

const Explanation = () => {
  return (
    <div className={classes.paragraph}>
    <p>I&apos;m using <b>Stackoverflow</b> data as a proxy for knowing what tech stuff people are interested in. The questions in Stackoverflow are attached with a <b>tag</b>, which indicates the keywords of the question, and tags are typically programming languages, certain sofware or some technical skills. I consider that the more questions with a certain tag are posted in Stackoverflow, the more people are interested in the technical stuff of the tag. This data is stored in <b>Google Cloud BigQuery</b> public dataset. When you visit this page, my API gets the latest data from the BigQuery, though BigQuery has several months lag to update their database. This data analysis is using the following concept.</p>
      <ul>
        <li>Count the monthly number of questions, and the monthly number of each tag attached to the questions.</li>
        <li>Compute proportion as the monthly number of each tag divided by the monthly number of questions, because the number of Stackoverflow questions is not constant over time.</li>
        <li>Think of this proportion as <b>popularity</b>.</li>
        <li>Track this proportion over the last 5 years, use the monthly index as x, and the proportion as y to do simple linear regressions for each tag.</li>
        <li>Consider the slope from the regression as <b>growth</b>.</li>
        <li>To make the plots look nice, I limit each group to be 5 tags by <b>my arbitrary choice</b> lol.</li>
        <li>Currently, I ignore the view count of questions.</li>
        <li>Simply, data aggregation and visualization, no statistical prediction.</li>
      </ul>
      <p>I consider that a tech stuff with a high popularity and high growth is a good choice to learn or good to use at work. But, if something has a high popularity but the growth is negative, I&apos;m not motivated to use it lol. Frontend tools, backend tools, are databases as followed.</p>
    </div>
  );
};

export default Explanation;