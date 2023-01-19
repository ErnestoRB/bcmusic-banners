import { existsSync, mkdirSync, writeFileSync } from "fs";
import { exit } from "process";
import { executeBanner } from "./engine";
import { loadArtistSample, loadUserSample } from "./utils";

export interface SpotifyArtist {
  name: string;

  images: {
    url: string;
    height: number;
    width: number;
  }[];
}

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
    console.error(`Ha ocurrido un error: ${err}`);
  });
