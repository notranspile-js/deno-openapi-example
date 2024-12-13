# Example of Deno HTTP API setup that can generate OpenAPI spec

Uses the following:
 - [Fresh](https://fresh.deno.dev/docs/introduction) for HTTP routing/handling
 - [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) for generating OpenAPI spec from YAML snippets ([example](https://github.com/notranspile-js/deno-openapi-example/blob/master/routes/api/test1.yaml)])
 - [ReDoc](https://github.com/Redocly/redoc) to display the OpenAPI spec

### Usage

Generate the static `openapi.json` file:

```
deno run -A ./openapi.ts
```

Start the server in development mode with a watcher:

```
./dev.ts
```


Start the server normally:

```
deno run -A main.ts
```

ReDoc web page will be available at `http://localhost:8000/doc.html`.

### License information

This project is released under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).

