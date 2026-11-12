---
name: nextjs-react
description: Use for Next.js App Router, React Server Components, client components, routing, data fetching, caching, forms, loading and error states, and UI performance.
---

# Next.js and React

## Rendering

- Use the App Router.
- Server Components by default.
- Use a client component only when you need state, effects, event handlers, or browser APIs.
- Keep secrets and privileged data on the server.
- Do not import server-only modules into client components.
- Use `next/font` for fonts and `next/image` when images are added.

## Data fetching

- The Hono API is the source of business logic.
- Next.js calls the API through Caddy at `/api/*` in production.
- In local development, use a rewrite or an explicit API URL.
- Do not duplicate business rules in Next.js route handlers.
- Cache deliberately. Do not cache user-specific data without a key.
- Use `revalidatePath` or tags only when the data really changes.
- Pending decision: TanStack Query for client-side task updates or Server Components plus refresh.

## Forms

- Use semantic forms with labels and error messages.
- Server Actions are allowed for simple UI mutations, but they must call the same API or service boundary.
- React Hook Form plus Zod is the default for complex forms.
- Disable submit while pending. Show a clear error. Do not lose user input.

## States

Every screen has:

- Loading.
- Empty.
- Error.
- Success.
- Unauthorized or forbidden, where relevant.

Use error boundaries for unexpected failures. Do not show a blank screen.

## Accessibility

- Semantic HTML.
- Labels for every input.
- Visible focus.
- Keyboard paths for every action.
- Dialogs trap and restore focus.
- Respect reduced motion.
- Color contrast meets WCAG AA.

## Performance

- Avoid large client bundles.
- Keep client components small.
- Lazy-load heavy views such as the computer and code highlighting.
- Use `Suspense` for slow server data.
- Measure before optimizing.
