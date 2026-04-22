# The AI Agent Company Playbook

> **Run a real company where the workforce is AI.**
> A practitioner's guide to building, governing, and scaling multi-agent organizations with Paperclip and Claude.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with Paperclip](https://img.shields.io/badge/Built%20with-Paperclip-6366f1)](https://paperclip.ing)
[![Powered by Claude](https://img.shields.io/badge/Powered%20by-Claude-orange)](https://anthropic.com)

---

## What This Is

Most AI tooling treats agents as fancy autocomplete — one assistant, one task, then done.

This playbook is for something different: a **structured multi-agent company** where AI agents hold named roles, receive assignments, run concurrently, communicate through a formal protocol, and self-govern through QC gates — while humans participate as board members setting strategy.

Everything in this guide was built and battle-tested running four real directives to produce this very document. The agents wrote the code. The agents reviewed the output. The agents escalated blockers and handed off work. Humans approved the plan and reviewed the final result.

This is not theory. It is a working blueprint.

---

## Who This Is For

| If you are… | You will get… |
|---|---|
| An engineer exploring multi-agent systems | A concrete architectural pattern with working governance primitives |
| A founder or team lead evaluating AI-native workflows | A realistic picture of what autonomous agent execution actually looks like |
| A Paperclip user building your first company | Step-by-step setup, role definitions, and operational patterns you can copy directly |
| An AI researcher studying agent coordination | A documented case study of a real multi-agent organization running real work |

**Prerequisites:** Comfort with a terminal and JSON config files. No prior multi-agent experience assumed — the playbook builds from first principles.

---

## What You Will Learn

By the end of this playbook you will be able to:

- Stand up a multi-agent company from scratch using Paperclip and Claude
- Define agent roles with clear scopes, chain of command, and AGENTS.md instructions
- Decompose directives into tasks, assign them, and track execution across heartbeat windows
- Implement the A2A protocol for structured agent-to-agent handoffs
- Build QC gates that catch errors before they compound
- Recognize and avoid the most common failure modes in multi-agent systems

---

## Chapters

| # | Chapter | Audience |
|---|---|---|
| 1 | [Introduction to AI Agent Companies](chapters/01-introduction.md) | Beginner |
| 2 | [Setting Up Your Paperclip Company](chapters/02-setup.md) | Beginner–Intermediate |
| 3 | [Agent Roles and Hiring](chapters/03-agent-roles.md) | Intermediate |
| 4 | [The Directive Lifecycle](chapters/04-directive-lifecycle.md) | Intermediate |
| 5 | [A2A Protocol and Agent Communication](chapters/05-a2a-protocol.md) | Intermediate |
| 6 | [Heartbeat System and Task Management](chapters/06-heartbeat-system.md) | Intermediate–Advanced |
| 7 | [Quality Control and Governance](chapters/07-quality-control-governance.md) | Intermediate |
| 8 | [Advanced Patterns and Anti-Patterns](chapters/08-advanced-patterns.md) | Advanced |
| 9 | [Lessons Learned — Building with D1–D4](chapters/09-lessons-learned.md) | All levels |

Read sequentially for the full journey, or jump directly to the chapter that matches your current challenge.

---

## The Stack

This playbook was built using:

- **[Paperclip](https://paperclip.ing)** — The multi-agent operating system. Handles task assignment, checkout, heartbeat runs, approval flows, and the A2A protocol.
- **[Claude](https://anthropic.com)** (Sonnet 4.6) — The AI model powering every agent role in the company.
- **GitHub** — Version control and delivery surface for all playbook chapters.

Every chapter in this playbook was written, reviewed, and QC-scored by agents running inside a live Paperclip company — the Board of Directors Company — using the exact patterns described here.

---

## Read Online

📖 **[juarez-labs.github.io/board-of-directors-company](https://juarez-labs.github.io/board-of-directors-company)**

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to suggest improvements, report issues, or propose new chapters.

---

## License

MIT — use freely, attribute generously.
