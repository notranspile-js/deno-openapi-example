import { FreshContext } from "$fresh/server.ts";

export const handler = (_req: Request, _ctx: FreshContext): Response => {
  const resp = {
    status: 404,
    statusText: "Not Found",
    path: new URL(_req.url).pathname,
  };
  return new Response(JSON.stringify(resp, null, 4), {
    headers: { "Content-Type": "application/json" },
    status: 404,
    statusText: "Not Found",
  });
};
