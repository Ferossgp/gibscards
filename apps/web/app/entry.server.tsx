import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { EntryContext } from "@remix-run/cloudflare";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {

  let html = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );
  if (html.startsWith("<html")) {
    html = "<!DOCTYPE html>\n" + html;
  }
  return new Response(html, {
    headers: { "Content-Type": "text/html" },
    status: responseStatusCode,
  });
}
