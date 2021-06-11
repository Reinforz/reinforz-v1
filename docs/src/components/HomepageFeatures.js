import clsx from 'clsx';
import React from 'react';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Feature Rich',
    Svg: require('../../static/img/feature_rich.svg').default,
    description: (
      <>
        Everything you can possible think of while using the product, is most
        likely already integrated.
      </>
    )
  },
  {
    title: 'Detailed Reports',
    Svg: require('../../static/img/detailed_reports.svg').default,
    description: (
      <>
        Get detailed reports of your performance and gain insights of your
        strengths and weaknesses.
      </>
    )
  },
  {
    title: 'Easy to use',
    Svg: require('../../static/img/easy_to_use.svg').default,
    description: (
      <>
        Despite providing countless features, all of them are easy to use and
        intuitive.
      </>
    )
  }
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
