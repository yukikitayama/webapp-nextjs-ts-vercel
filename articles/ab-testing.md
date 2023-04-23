---
id: "63aba1ec6baea2a0e70bf15e"
---

## Contents

- Background
- Hypothesis test
- Random permutation test
- Multiple A/B tests
- Compute sample size
- Experimental design
- Terminology
- Reference

## Background

Data scientists sometimes need to do experiments about user interface in web design and product marketing. A/B testing is a common approach to test the hypothesis. For example, whether a new interface B is better than the existing interface A.

**Control group** is a standard, existing, without-new-things group.

**Treatment group (Test group)** is a group with a new feature or a specific thing we want to test. 

A/B testing typically measures, for example

- Number of clicks
- Number of purchases
- Duration of seeing web apges

## Hypothesis test (Significance test)

Something that A/B testing usually establishes. When we see difference between A and B, the hypothesis test will tell us *whether it's due to random chance or true difference*. 

A/B testing typically uses **one-way** hypothesis test (**one-tail** hypothesis test). One-way hypothesis test treats one group as default and test whether the other group is better.

**Z-test** and **t-test** are hypothesis test. Both are the *same* in the following points.

- Decide if the **mean** from the sample is different from a certain value (or more than a value, or less than a value)
- Assume the samples follow a **normal distribution**.
- Use the same test statistic below. $s$ is the standard deviation. $n$ is the sample size

$$
\frac{\hat{\mu} - \mu_0}{\frac{s}{\sqrt{n}}}
$$

But they are *different* in the following.

Z-test uses **standard normal distribution**.

t-test uses **t-distribution**. It has **degrees of freedom**. As it gets large, t-distribution gets closer to standard normal distribution. When the sample size is small, t-test is more appropriate than Z-test.

In hypothesis test, 2 types of error can occur

### Type I error

Incorrectly conclude that an effect is real when it's actually just due to chance.

Reject the null hypothesis when the null hypothesis is true.

For example, the hypothesis test is about whether a drug has an effect on a patient. Null hypothesis is that the drug has no effect. The alternative hypothesis is that the drug has an effect. Type I error in this hypothesis test is to conclude that the drug has an effect (when the drug has no effect).

It's also called **false positive rate**.

In the hypothesis test, we typically don't wanna be fooled by the random chance, so we try to minimize this Type I error more than the following Type II error.

### Type II error

Incorrectly conclude that an effect is not real, so the effect is just due to chance, but it's actually real.

Fail to reject the null hypothesis when the null hypothesis is false.

For example, in the same testing a drug, Type II error is to conclude that the drug has no effect, when the drug actually has effect.

It's also called **false negative rate**.

### p-value

Given a null hypothesis model, the probability that results as extreme as the observed results might occur.

Given a chance model, p-value is the probability that a result is this extreme.

In random permutation test, the proportion of times that the test produces a difference equal to or greater than the observed difference.

The wrong interpretation of p-value is the probability that the result is due to chance.

## Random permutation test

Also called, **randomization test**, **resampling permutation procedure**, **bootstrap permutation test**.

**Permute** means to change the order of a set of values.

Different way from Z-test and t-test to test whether an observed test statistic is significant or not. I describe the methodology here, but I think looking at the below code is easier to understand.

1. Combine group A and B, shuffle and draw sample with the same size as the number of data in group A.
2. The remaining data is group B.
3. Compute a test statistic and save it
4. Repeat above steps many times to create a distribution
5. The distribution works as the reference null hypothesis distribution.
6. Compare the original observed test statistic with this distribution to compare p-value.

*Useful when samples don't follow a normal distribution*. So when we can't use Z-test or t-test, we can use random permutation test instead.

```python
import pandas as pd


df = pd.DataFrame('web_page_data.csv')
```

![Web page data {597x500}](/images/article/ab-testing/web_page_data.png)

```python
mean_a = df.loc[df['Page'] == 'Page A', 'Time'].mean()
mean_b = df.loc[df['Page'] == 'Page B', 'Time'].mean()
observed_difference = mean_b - mean_a
print(f'Observed difference: {observed_difference}')


def permute_and_compute_difference(df, n_a, n_b):
    # Assumes dataframe has index from 0 to n - 1
    indices = [i for i in range(n_a + n_b)]
    index_b = set(random.sample(indices, n_b))
    index_a = set(indices) - index_b
    mean_a = df.loc[index_a, 'Time'].mean()
    mean_b = df.loc[index_b, 'Time'].mean()
    return mean_b - mean_a


n_a = len(df.loc[df['Page'] == 'Page A'])
n_b = len(df.loc[df['Page'] == 'Page B'])
num_sampling = 1000
permuted_differences = []

for _ in range(num_sampling):
    difference = permute_and_compute_difference(df, n_a, n_b)
    permuted_differences.append(difference)

p_value = np.mean(observed_difference < permuted_differences)
```

```python
import matplotlib.pyplot as plt


plt.hist(
    permuted_differences, 
    bins=30,
    label='Permuted differences'
)
plt.axvline(
    observed_difference,
    color='tab:orange',
    linestyle='--',
    label='Observed difference'
)
plt.legend()
plt.show()
```

![Random permutation test {640x480}](/images/article/ab-testing/random_permutation_test.png)

## Multiple A/B tests

We can run multiple A/B tests, but as we run multiple testing, it increases the probability of making Type I error. This is called **alpha inflation**.

When $\alpha$ is the probability that falsely test is significant, $(1 - \alpha)$ is the probability that correctly test is not significant. When we run $n$ tests and all are correctly tested as non-significant, the probability is $(1 - \alpha)^n$. So the probability that at least one test will falsely test significant is $1 - (1 - \alpha)^n$. When $\alpha = 0.05$ and $n = 20$, 

$$
1 - (1 - 0.05)^{20}
$$
$$
= 1 - 0.95^{20}
$$
$$
= 1 - 0.36
$$
$$
= 0.64
$$

So the probability of making at least one type 1 error in multiple testing is high.

For multiple A/B testing, we can try **Bonferroni correction**, **F-test**, and **multi-arm bandit**. 

### Bonferroni correction (adjustment)

Divide significance level $\alpha$ by the number of multiple test $n$, so $\frac{\alpha}{n}$.

In Bonferroni correction, when we run $n$ tests with significance level $\alpha$, we use a significance level $\frac{\alpha}{n}$ instead. Even if all the hypotheses are false positive, the significance level is $\alpha$.

The disadvantage is to increase false negative. It's type II error. It's problematic if false positive is preferable to false negative. For example, in healthcare, false positive result of detecting disease gives concern and more tests might be required, but false negative means ignoring a potentially fetal disease.

For example, with significance level 0.05 and number of variants is 20, Bonferroni correction give us,

$$
\frac{0.05}{20}
$$
$$
= 0.0025
$$

The probability that one significant result by chance (**Type I error**) is,

$$
1 - (1 - 0.0025)^{20}
$$
$$
1 - 0.9975^{20}
$$
$$
1 - 0.95116...
$$
$$
= 0.04883...
$$

We have about 5% probability that we get one significant result by chance, so we can have a standard 0.05 threshold for statistical tests.

### F-test

F-test can run hypothesis tests at once. But F-test only tests us whether there is a difference in mean between at least 2 groups, and it doesn't tell us how much differ, which groups, how many groups.

The disadvantage is the same as above Bonferroni correction.

### Multi-arm bandit algorithm

As we proceed making tests, suppose we have variant A, B, and C, if we find A is better, we start using A in production more often, but by random manner, sometimes we are still use B and C. Continuously doing this try and error.

**Epsilon-greedy algorithm for A/B test**

1. Set epsilon somewhere between 0 and 1, but to be a small number.
2. Get a random number between 0 and 1.
3. If the random number < epsilon, flip a coin. If head, use A. If tail, use B.
4. If the random number $\ge$ epsilon, use an option which gives us the better result so far.

When epsilon is 1, it's a regular A/B testing, random allocation. When epsilon is 0, it's a greedy algorithm. Always choose the best variant so far, no more experiment.

## Compute sample size

We can compute sample size if we have **effect size**, **power**, and **significance level**.

The **effect size** is the amount of change we hope to have with a new feature. For example, with a new feature, if we want the click rate to increase by 10%, the 10% is the effect size.

The **power** is the probability of detecting the effect size in A/B testing.

The **significance level** is the probability of incorrectly saying we have the effect when the effect actually doesn't exist.

## Experimental design

### Multiple variables

Suppose currently there is a red button at the top of a web page. To increase the click rate of this button, we are considering if we should change the color into blue and should change the location to the bottom of a web page.

In typical A/B testing, we only have 2 variants, but having 2 variables (color and location) gives us the following 4 variants.

- Red button at the top
- Red button at the bottom
- Blue button at the top
- Blue button at the bottom

Because a user experience more specific situations, more variants increase the variance of the results. We should take a **long duration of time of running tests** to reduce variance. We can run multiple A/B testing and correct the significance level by **Boferroni correction**. In this way, we can observe the **interaction effect** of color and button.

We can also do a **chain of A/B tests**. For example, first we run A/B test about color to decide which color is better. Suppose blue was better, then we can run another A/B test about the location to decide whether top or bottom is better. Suppose top is better. Then our conclusion will be that we should use a blue button at the top. But in this case, we will not see what will happen if we use a red button at a specific location. So we won't be able to measure the interaction effect.

### Interpret A/B testing result

Suppose we run A/B testing to increase a conversion rate on the landing page.

When the test variant **wins by 5% on the metric**,

Check what was the **duration of the test**. If the test was only during in weekends, the user bahavior might gonna be different during the other times of the week.

Check the **confidence interval** of the test statistic. If the interval is narrow, it's good. But if the interval contains the effect side, it's not good.

Check **significance level**. Even if it wins by 5%, the p-value is large so that the result can be interpreted as due to random chance.

Check whether the sample in each group was a **good representative of the whole**. If the control group was old users and if the test group was new users, we cannot expect the same result if we apply the test result to both groups in production.

Check if there was **external factors** to increase the conversion rate regardless of the effect of A/B testing.

Check what is the **effect size** that we need to observe at least. If the effect size was 10%, 5% increase doesn't satisfy our requirement.

When the test **p-value is below 5%**,

Check the validity of the test first. 
- Whether the distributions of the attributes of each group look similar and we had 2 random groups.
- Whether the equal experiment was applied to both groups. For example, only weekend for A group, and only working days for B group is not valid.

Check the sample size. If the sample size was small, we can't trust the test statistic because it would change a lot with additional samples.

Check the effect size. If the sample size was big, the large number of sample helps us get a small p-value. But the increase of the conversion rate could be small.

Check how many times the A/B testing was done before seeing the p-value below 5%. The more we do, we are more likely to see false positive.

### Apply A/B testing to price

People argue that using different prices for the same product and apply A/B testing causes unfairness, but the price of the product, for example B2B SAAS company, might not be explict to everyone. Maybe the pricing page of the company website says ask for Sales, so this company always tailermade the pricing for each company. There is possibility that customers might talk about the prices with another customer, so when making contract, the contract should say that the price of the product should not be public.

If the company webpage has pricing page, the control group will see the existing pricing and the test group will see the new price. It will cause unfairness, but we could risk our reputation and still conduct the A/B test.

With the risk of unfairness, we can still run A/B test. Provide the one-week free trial period to customers with randomly several options of prices. And if customers want to keep using the product, they enter the second week as subscription. We try to find the highest price that gives us the highest number of customers to stay. This cares about the conversion rate, but we expect that lower-prices would have higher conversion rate, but we also measure revenue.

### Randomization

In A/B testing, variants need to be random. To check if the randomization is valid, we can find out no huge difference in distributions between the 2 groups for the features that are not related to A/B testing.

For example, if we are testing a click rate of a landing page, we can check the traffic origin distribution. If variant A mainly come from search engine, but if variant B mainly come from some ads, probably not randomized.

For example, if we are testing a new feature in chat app, we can check the distribution of user attributions. If we have a feature gender containing either man or woman, in random assignment, we expect to have approximately 50% men 50% women distribution, but if variant A contains 80% men, we can doubt randomization. Other user attributions that we can check are user device types, geolocation, etc.

We can also check metrics which are not related to the effect that the A/B testing tests. If we are testing a conversion rate in A/B testing, we can compare distribution of time a user spends in a web page, number of purchases between variant A and variant B.

### Non-normal distribution

When we are making A/B test, we find that the distribution is not normal.

- We cannot run t-test because it assumes the distribution is normal. We can run **Mann-Whiteny U-test** instead. 
- We can apply **resampling permutation test** because it also doesn't assume the normal distribution. It creates the distribution from the randomly sampled data.
- We can also collect more data. Maybe the distribution doesn't look normal because the data is not enough. If time and budget are allowed, collecting mode data could gives use a better distribution.

## Terminology

- **Variant** is group.
- **Churn rate** is the rate at which a customer stops doing business with a company, or stops subscribing to a service.
- **Researcher bias** is selecting a test statistic after an experiment, but the test statistic needs to be established beforehand. 

## Reference

- O'REILLY Practical Statistics for Data Scientist, 50+ Essential Concepts Using R and Python
- [How to A/B Test Your Pricing (And Why It Might Be a Bad Idea)](https://blog.hubspot.com/marketing/price-testing)
- [Common Mistakes During A/B Testing](https://towardsdatascience.com/common-mistakes-during-a-b-testing-bdb9eefdc7f0)
- [Type I & Type II Errors | Differences, Examples, Visualizations](https://www.scribbr.com/statistics/type-i-and-type-ii-errors/)