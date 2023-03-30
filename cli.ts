import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { exit } from "process";
import { executeBanner } from "./engine";

if (process.argv.length < 5) {
  console.log("Uso: npm start -- <nombre_banner> <data_sample> <user_sample>");
  console.log("Ejemplo: npm start -- synthwave first ernesto");
  exit(1);
}
const name = process.argv[2].toLowerCase();
const artistSample = process.argv[3].toLowerCase();
const userSample = process.argv[4].toLowerCase();

executeBanner(name, loadUserSample(userSample), loadArtistSample(artistSample))
  .then((buffer) => {
    if (!existsSync("out")) {
      mkdirSync("out");
    }
    const path = `out/${name}.png`;
    writeFileSync(path, buffer);
    console.log(`Banner guardado en ${path}`);
  })
  .catch((err) => {
    console.log(err);

    console.error(`Ha ocurrido un error: ${err}`);
  });

function loadArtistSample(name: string) {
  return JSON.parse(
    readFileSync(path.join("samples", "artist", name + ".json"), "utf-8")
  );
}

function loadUserSample(name: string) {
  return JSON.parse(
    readFileSync(path.join("samples", "user", name + ".json"), "utf-8")
  );
}
