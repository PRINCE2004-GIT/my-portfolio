<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Single-page portfolio at `/`; sections are anchored (`#about`, `#projects`, ...) because the brief asked for one scrolling page with section navigation.
- Profile copy lives in `src/content/profile.ts`; links, domain and resume path live in `src/config/site.ts` so unknown values (GitHub, domain) stay configurable and are never hard-coded in components.
- Absolute canonical/og:image tags are emitted only when `site.siteUrl` is set; otherwise relative canonical and no share image, so no placeholder domain ships.
- Scroll reveals use CSS classes gated on `html.js` (set by an inline head script) so content stays visible if JavaScript fails; Motion is used only for parallax and the case-study expand.
- Custom cursor, magnetic and tilt effects run only on fine pointers without reduced motion (`useFinePointer`).
- The contact form validates with zod and hands off to the visitor's email app via mailto; there is no backend.
- Resume PDF is a real file in `public/` so the `download` filename works on any host.
