
import * as path from "$std/path/mod.ts";
import swaggerJsdoc from "npm:swagger-jsdoc@6.2.8";

const filePath = path.fromFileUrl(import.meta.url)
const projectDir = path.dirname(filePath);

const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: [`${projectDir}/routes/**/*.yaml`],
};

const openapiSpec = swaggerJsdoc(options);
const openapiJson = path.join(projectDir, "static", "openapi.json");

await Deno.writeTextFile(openapiJson, JSON.stringify(openapiSpec, null, 4));
