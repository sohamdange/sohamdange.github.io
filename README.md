# sohamdange.github.io

Source for my personal site — **[sohamdange.github.io](https://sohamdange.github.io)**.

I'm Soham Dange, a mechanical engineer working at the intersection of simulation and
engineering architecture. This site is where I keep my project write-ups and notes on
modeling, systems thinking, and how engineering work actually gets built. It's designed
to read like an engineering notebook rather than a landing page: plain typography,
generous whitespace, nothing that moves unless it needs to.

## Stack

- **Next.js 15** (App Router, `output: 'export'`) — fully static, no server
- **Tailwind CSS** — brand tokens defined in `tailwind.config.js`
- **MDX** via `next-mdx-remote` + `gray-matter` — content is plain files, not a CMS
- **GitHub Pages** — deployed by GitHub Actions on every push to `main`

## Structure

```
content/
  projects/     project write-ups (.mdx)
  writing/      posts (.mdx)
src/
  app/          routes — App Router only
  components/   Nav, Footer, ProjectCard, WritingList
  lib/          MDX parsing and frontmatter filtering
public/         static assets
```

## License

[MIT](LICENSE) — feel free to borrow the structure, the build setup, or the whole thing.
If you reuse the writing or project content, a link back is appreciated.
