# Deno OpenAPI example

Example of the [Deno](https://deno.com/) HTTP API setup that can generate (collect from snippets) an [OpenAPI](https://www.openapis.org/what-is-openapi) specification. Uses [Fresh](https://fresh.deno.dev/docs/introduction) and [ReDoc](https://github.com/Redocly/redoc).

### Usage

Generate the static `openapi.json` file:

```
deno run -A ./openapi/genSpec.ts
```

Start the server in development mode with a watcher:

```
./dev.ts
```

Start the server normally:

```
deno run -A main.ts
```

ReDoc web page will be available at `http://localhost:8000/apidoc.html`.

### License information

This project is released under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).

