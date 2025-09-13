/**
 * **DESCRIPTION:**
 *
 * Union type that defines which UI parts (elements) can be rendered
 * inside a card. You can combine them to include/exclude sections.
 *
 * Order of rendering is fixed and follows common card layout:
 * `media` → `content(title, subtitle, body)` → `footer(actions)`.
 */
export type ElementsType = "media" | "title" | "subtitle" | "body" | "footer" | "actions";
