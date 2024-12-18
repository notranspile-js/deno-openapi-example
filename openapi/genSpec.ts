
import * as path from "$std/path/mod.ts";
import * as yaml from "$std/yaml/mod.ts";

const filePath = path.fromFileUrl(import.meta.url)
const openapiDir = path.dirname(filePath);
const projectDir = path.dirname(openapiDir);

async function collectSchemasRecursive(rootPath: string, dirPath: string, schemas: Record<string, unknown>) {
  for await (const ch of Deno.readDir(dirPath)) {
    const chPath = path.join(dirPath, ch.name);
    if (ch.isDirectory) {
      await collectSchemasRecursive(
        rootPath,
        chPath,
        schemas,
      );
    } else if (ch.name.endsWith(".yaml")) {
      const text = await Deno.readTextFile(chPath);
      const relPath = path.relative(rootPath, chPath);
      const parsed = path.parse(relPath);
      const nameWithSlashes = path.join(parsed.dir, parsed.name);
      const name = nameWithSlashes.replaceAll(/(\/|\\)+/g, ".");
      const desc = yaml.parse(text);
      schemas[name] = desc;
    }
  }
}

function sortKeys(schemas: Record<string, unknown>): Record<string, unknown> {
  const sorted: Record<string, unknown> = {};
  const keys = Object.keys(schemas).sort();
  for (const key of keys) {
    sorted[key] = schemas[key];
  }
  return sorted;
}

async function collectPathsRecursive(rootPath: string, dirPath: string, paths: Record<string, unknown>) {
  for await (const ch of Deno.readDir(dirPath)) {
    const chPath = path.join(dirPath, ch.name);
    if (ch.isDirectory) {
      await collectPathsRecursive(
        rootPath,
        chPath,
        paths,
      );
    } else if (ch.name.endsWith(".yaml")) {
      const text = await Deno.readTextFile(chPath);
      const relPath = path.relative(rootPath, chPath);
      const parsed = path.parse(relPath);
      const fsPath = path.join(parsed.dir, parsed.name);
      const urlPath = "/" + fsPath.replaceAll(/(\/|\\)+/g, "/");
      const desc = yaml.parse(text);
      paths[urlPath] = desc;
    }
  }
}

const stubYaml = path.join(openapiDir, "openapi_spec_stub.yaml");
const specText = await Deno.readTextFile(stubYaml);
const spec: any = yaml.parse(specText);

const schemas: Record<string, unknown> = {};
const schemasRootDir = path.join(openapiDir, "schemas");
await collectSchemasRecursive(schemasRootDir, schemasRootDir, schemas);
const schemasSorted = sortKeys(schemas);

for (const schemaName of Object.keys(schemasSorted)) {
  console.log(`schema: ${schemaName}`);
  spec.components.schemas[schemaName] = schemasSorted[schemaName];
}

const paths: Record<string, unknown> = {};
const pathsRoot = path.join(projectDir, "routes", "api");
await collectPathsRecursive(pathsRoot, pathsRoot, paths);
const pathsSorted = sortKeys(paths);

for (const pathName of Object.keys(pathsSorted)) {
  console.log(`path: ${pathName}`);
  spec.paths[pathName] = pathsSorted[pathName];
}

const staticDir = path.join(projectDir, "static");
const openapiJson = path.join(staticDir, "openapi.json");
await Deno.writeTextFile(openapiJson, JSON.stringify(spec, null, 2));
console.log(`Spec file written: ${openapiJson}`);
