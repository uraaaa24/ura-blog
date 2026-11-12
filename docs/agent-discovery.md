# Agent discovery

Implemented in the application:

- Homepage Link response header: API catalog, OpenAPI description, documentation, llms.txt, and ARD.
- Markdown negotiation on `/`, `/posts`, and `/posts/{slug}`. Explicit `Accept: text/markdown` with positive quality, at least as preferred as HTML, selects Markdown. Wildcards retain HTML. Markdown responses include `Vary: Accept`. Next.js can replace Vary on HTML responses, so negotiated HTML pages use dynamic rendering and both representations disable shared caching. No estimated token count is advertised as an exact count.
- robots.txt Content-Signal: `ai-train=no, search=yes, ai-input=yes`. This expresses usage preferences; it does not enforce them.
- RFC 9727 API catalog describing the actual public content interface, with OpenAPI and Markdown documentation. There is no dedicated health endpoint to advertise.
- Skills discovery index with a SHA-256 digest of the served SKILL.md bytes. Update the digest whenever the skill changes.
- ARD manifest advertising the public content interface and reading skill, with permissive CORS.
- WebMCP `search_articles` registered at page load in supporting browsers, with document-first detection, navigator fallback, and abort on unmount. This searches titles, excerpts, and tags and returns up to 20 URLs. Unsupported browsers retain the regular UI.

OAuth/OIDC discovery, OAuth protected resource metadata, Auth.md registration, and an MCP server card are intentionally absent: this blog has no protected API, authorization server, registration service, or remote MCP endpoint. Publishing invented endpoints would mislead agents. These checks are not applicable until such services exist.

## DNS-AID

DNS records and DNSSEC must be configured at the authoritative DNS provider and registrar. Repository changes cannot publish them. DNS-AID is an evolving Internet-Draft; do not advertise A2A or MCP ALPN values unless that protocol is actually served.

This site currently exposes HTTP content and catalogs, rather than a DNS-AID agent service. Before publishing `_index._agents.urarara.me` records, choose an index service supported by the current DNS-AID draft and verify its actual endpoint and SVCB parameters. Then publish ServiceMode SVCB/HTTPS records with priority greater than zero, the real service target, ALPN and required endpoint parameters. Experimental parameters require numeric `keyNNNNN` names. Enable DNSSEC at the DNS provider and publish the corresponding DS record at the registrar; verify an authenticated answer through a validating resolver.

An independent ARD discovery TXT record can point to the actual deployed manifest:

```dns
_catalog._agents.urarara.me. 3600 IN TXT "url=https://urarara.me/.well-known/ai-catalog.json"
```

This TXT record does not implement DNS-AID. DNS changes and production deployment have not been performed by this change.

## Verification after deployment

```sh
curl -I https://urarara.me/
curl -i -H 'Accept: text/markdown' https://urarara.me/
curl -i -H 'Accept: text/html' https://urarara.me/
curl -i https://urarara.me/.well-known/api-catalog
curl -i https://urarara.me/.well-known/ai-catalog.json
curl https://urarara.me/robots.txt
```

Also check a published local post and a missing slug with Markdown negotiation. Use a browser with WebMCP enabled to inspect and invoke `search_articles`; API availability varies by browser version.

References: [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288), [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727), [DNS-AID draft](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/), [WebMCP draft](https://webmachinelearning.github.io/webmcp/).
