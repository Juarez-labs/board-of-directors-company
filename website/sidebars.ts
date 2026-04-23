import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  playbookSidebar: [
    { type: 'doc', id: 'index', label: 'Overview' },
    'chapter-1-introduction',
    'chapter-2-setup',
    'chapter-3-roles-and-hiring',
    'chapter-4-directive-lifecycle',
    'chapter-5-a2a-protocol',
    'chapter-6-heartbeats',
    'chapter-7-quality-and-governance',
    'chapter-8-patterns',
    'chapter-9-lessons-learned',
  ],
};

export default sidebars;
