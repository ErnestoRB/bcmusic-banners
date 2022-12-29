import { createCanvas, loadImage, registerFont } from "canvas";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import vm from "vm";
import { exit } from "process";

if (process.argv.length < 4) {
  console.log("Uso: npm start -- <nombre_banner> <data_json>");
  console.log("Ejemplo: npm start -- synthwave first");
  exit(1);
}

class BannerError extends Error {
  isBanner = true;
}

const name = process.argv[2].toLowerCase();
const jsonName = process.argv[3].toLowerCase();
const data = JSON.parse(
  readFileSync(path.join("samples", jsonName + ".json"), "utf-8")
);
const configFile = readFileSync(path.join("list", name + ".json"), "utf8");
const json = JSON.parse(configFile);
const { width, height, author, description, images, fonts } = json;
const script = readFileSync(path.join("list", name + ".js"), "utf8");
fonts.forEach(({ src, family }) => {
  registerFont(path.join("fonts", src), { family });
});
const promises = images.map((element) => {
  return loadImage(path.join("images", element));
});
Promise.all(promises).then((imagesArray) => {
  const canvas = createCanvas(width, height);
  const context: any = {
    width,
    height,
    author,
    description,
    canvas,
    loadImage,
    registerFont,
    BannerError,
    images: imagesArray,
    data,
  };
  const buffer = vm.runInNewContext(script, context);
  try {
    mkdirSync("out");
  } catch (e) {}
  writeFileSync(path.join("out", name + ".png"), buffer, { flag: "w+" });
  console.log("Banner guardado en carpeta out/");
});
