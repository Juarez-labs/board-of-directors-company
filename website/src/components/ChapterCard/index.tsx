import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface ChapterCardProps {
  number: number;
  title: string;
  description: string;
  to: string;
  icon?: React.ReactNode;
}

/**
 * ChapterCard — homepage tile. Hover behavior is themed per chapter via
 * .card--ch-N class (see styles.module.css) per BOAA-281 §7.
 */
export default function ChapterCard({
  number,
  title,
  description,
  to,
  icon,
}: ChapterCardProps): JSX.Element {
  const themeClass = styles[`card--ch${number}`] ?? '';
  return (
    <Link
      to={to}
      className={clsx(styles.card, 'chapter-card', themeClass)}
    >
      <div className={styles.cardIcon} aria-hidden="true">
        {icon ?? <span className={styles.cardNumber}>{number}</span>}
      </div>
      <h3 className={styles.cardTitle}>
        Chapter {number} · {title}
      </h3>
      <p className={styles.cardDescription}>{description}</p>
      <span className={styles.cardArrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}
