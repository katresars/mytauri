# Tauri + Next.js Template

## Caveats

### Static Site Generation / Pre-rendering

Next.js is a great React frontend framework which supports server-side rendering (SSR)
as well as static site generation (SSG or pre-rendering). For the purposes of creating a
Tauri frontend, only SSG can be used since SSR requires an active Node.js server.

Using Next.js and SSG helps to provide a quick and performant single-page-application
(SPA) frontend experience. More information regarding this can be found here:
https://nextjs.org/docs/basic-features/pages#pre-rendering

### `next/image`

The [`next/image` component](https://nextjs.org/docs/basic-features/image-optimization)
is an enhancement over the regular `<img>` HTML element with additional optimizations
built in. However, because we are not deploying the frontend onto Vercel directly, some
optimizations must be disabled to properly build and export the frontend via SSG.
As such, the
[`unoptimized` property](https://nextjs.org/docs/api-reference/next/image#unoptimized)
is set to true for the `next/image` component in the `next.config.js` configuration.
This will allow the image to be served as-is from source, without
changes to its quality, size, or format.

### error[E0554]: `#![feature]` may not be used on the stable release channel

If you are getting this issue when trying to run `pnpm tauri dev`, it may be that you
have a newer version of a Rust dependency that uses an unstable feature.
`pnpm tauri build` should still work for production builds, but to get the dev command
working, either downgrade the dependency or use Rust nightly via
`rustup override set nightly`.

Then, instead of importing `import { invoke } from "@tauri-apps/api/tauri"`, use invoke
from `import { invoke } from "@/lib/tauri"`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and
  API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

And to learn more about Tauri, take a look at the following resources:

- [Tauri Documentation - Guides](https://tauri.app/v1/guides/) - learn about the Tauri
  toolkit.
