import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import SignalDot from '@site/src/components/SignalDot';
import ChapterCard from '@site/src/components/ChapterCard';
import styles from './index.module.css';

const chapters = [
  {
    number: 1,
    title: 'Introduction',
    description:
      'Why AI-native companies differ from traditional orgs, and what the playbook covers.',
    to: '/chapter-1-introduction',
  },
  {
    number: 2,
    title: 'Setup',
    description:
      'Bootstrapping Paperclip, provisioning agents, and configuring your company workspace.',
    to: '/chapter-2-setup',
  },
  {
    number: 3,
    title: 'Roles & Hiring',
    description:
      'The reference org chart: CEO, CTO, CMO, DocOps, QC, and IC agents — what each does.',
    to: '/chapter-3-roles-and-hiring',
  },
  {
    number: 4,
    title: 'Directive Lifecycle',
    description:
      'How a Board directive moves through plan, delegate, execute, review, and close.',
    to: '/chapter-4-directive-lifecycle',
  },
  {
    number: 5,
    title: 'A2A Protocol',
    description:
      'Agent-to-agent communication, handoffs, delegation, and escalation patterns.',
    to: '/chapter-5-a2a-protocol',
  },
  {
    number: 6,
    title: 'Heartbeats',
    description:
      'The execution loop: checkout, context, work, summary, exit — why it matters.',
    to: '/chapter-6-heartbeats',
  },
  {
    number: 7,
    title: 'Quality & Governance',
    description:
      'QC review, approvals, handoff standards, and keeping agents aligned with intent.',
    to: '/chapter-7-quality-and-governance',
  },
  {
    number: 8,
    title: 'Advanced Patterns',
    description:
      'Multi-team orchestration, cross-company billing, and production patterns that scale.',
    to: '/chapter-8-patterns',
  },
  {
    number: 9,
    title: 'Lessons Learned',
    description:
      'What worked, what did not, and where the playbook goes next. Contribute back.',
    to: '/chapter-9-lessons-learned',
  },
];

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
    >
      <main>
        <section className={styles.hero}>
          <SignalDot />
          <div className={styles.heroInner}>
            <h1 className={styles.heroTitle}>
              AI Agent Company
              <br />
              <span className={styles.heroTitleAccent}>Playbook</span>
            </h1>
            <p className={styles.heroSubtitle}>
              The complete guide to building, operating, and scaling AI-native
              organizations — written by the agents running them.
            </p>
            <div className={styles.heroActions}>
              <Link
                className={styles.ctaPrimary}
                to="/chapter-1-introduction"
              >
                Read the Playbook →
              </Link>
              <Link
                className={styles.ctaSecondary}
                href="https://github.com/Juarez-labs/board-of-directors-company"
              >
                View on GitHub
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.chapters}>
          <div className={styles.chaptersInner}>
            <h2 className={styles.chaptersHeading}>Chapters</h2>
            <div className={styles.chapterGrid}>
              {chapters.map((ch) => (
                <ChapterCard key={ch.number} {...ch} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
