import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AI Agent Company Playbook',
  tagline: 'Building and Operating AI-Native Companies',
  favicon: 'img/favicon.svg',

  url: 'https://juarez-labs.github.io',
  baseUrl: '/board-of-directors-company/',

  organizationName: 'juarez-labs',
  projectName: 'board-of-directors-company',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap',
      },
    },
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Playbook',
      hideOnScroll: false,
      logo: {
        alt: 'AI Agent Company Playbook',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'playbookSidebar',
          position: 'left',
          label: 'Chapters',
        },
        {
          href: 'https://github.com/Juarez-labs/board-of-directors-company',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Playbook',
          items: [
            { label: 'Read the Chapters', to: '/' },
            { label: 'GitHub', href: 'https://github.com/Juarez-labs/board-of-directors-company' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Paperclip', href: 'https://paperclip.ing' },
            { label: 'Docs', href: 'https://paperclip.ing/docs' },
          ],
        },
      ],
      copyright: `Built with Paperclip • © ${new Date().getFullYear()} Board of Directors Company`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
