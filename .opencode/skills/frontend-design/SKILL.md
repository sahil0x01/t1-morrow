---
name: frontend-design
description: Use for Next.js UI, layout, typography, color, task-first shell, computer view, approvals, accessibility, motion, responsive design, and avoiding a templated dashboard look.
---

# Frontend design

Morrow is task-first, not a chat clone and not a bot roster.

## Direction

- The sidebar is a task inbox: running, needs you, done.
- The main pane is the selected task: plan, steps, activity, computer, approvals.
- Chat is one way to create a task, not the whole product.
- The computer view is a first-class surface, not a hidden debug panel.
- The state chip on the assistant shows what it is doing.
- The tone is quiet, precise, and calm. The product is busy; the interface should not be.

## Visual system

- Strong typography, generous whitespace, clear hierarchy.
- Restrained color. One accent, one success, one warning, one danger.
- Design tokens as CSS variables. Use them everywhere.
- Avoid generic dashboard cards, purple gradients, glassmorphism, and icon soup.
- Use real content, not placeholder lorem ipsum, in design reviews.
- Prefer a few well-crafted components over a large UI kit.

## Layout

- Three panes on desktop: navigation, task list, task detail.
- Two panes on tablet: task list and detail.
- One pane on mobile, with a bottom bar or drawer.
- Keep the primary action visible without scrolling.
- Do not hide the task status or the approval request.

## Accessibility

- Semantic HTML first.
- Every form control has a label.
- Keyboard navigation works for every action.
- Visible focus rings. Do not remove them.
- Color contrast meets WCAG AA.
- Do not rely on color alone for status.
- Respect `prefers-reduced-motion`.
- Error messages are announced and linked to the field.
- Dialogs trap focus and restore it on close.

## Motion

- Use motion to explain state, not to decorate.
- Keep transitions short, around 120 to 200 ms.
- No parallax, no bouncing, no infinite animation.
- Respect reduced motion.

## Implementation

- Next.js App Router.
- Server Components by default; client components only for interaction.
- Radix primitives for dialogs, menus, tabs, tooltips, and popovers.
- Lucide icons.
- Tailwind if chosen, with a small token layer. If not, CSS modules with the same tokens.
- No `dangerouslySetInnerHTML` without sanitization.
- Images have alt text. Decorative images are hidden from assistive tech.

## Review checklist

- [ ] The task status is obvious at a glance.
- [ ] The next action is obvious.
- [ ] The approval request is impossible to miss.
- [ ] Empty, loading, error, and success states exist.
- [ ] Keyboard and screen reader paths work.
- [ ] Mobile layout is usable.
- [ ] Reduced motion is respected.
- [ ] The screen does not look like a generic admin template.
