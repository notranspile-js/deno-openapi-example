import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req) {
    const resp = {
      foo: "bar",
      baz: 42,
    };

    return new Response(JSON.stringify(resp, null, 4), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
