import { createCanvas, loadImage, registerFont } from "canvas";
import vm from "vm";
import { readFileSync } from "fs";
import path from "path";
import {
  bindDrawImage,
  bindDrawRoundedImage,
  bindMeasureText,
  bindMultilineSupport,
} from "./utils";
import { isPromise } from "util/types";
import { SpotifyArtist } from ".";

class BannerError extends Error {
  isBanner = true;
}

export async function executeBanner(
  name: string,
  userData: any,
  artistData: SpotifyArtist[]
) {
  const configFile = readFileSync(path.join("list", name + ".json"), "utf8");
  const json = JSON.parse(configFile);
  const { width, height, author, description, images, fonts } = json;
  const script = readFileSync(path.join("list", name + ".js"), "utf8");
  fonts.forEach(({ src, family }) => {
    registerFont(path.join(process.cwd(), "fonts", src), { family });
  });

  const promises = images.map((element) => {
    return loadImage(path.join("images", element));
  });
  if (userData.image) {
    const userImage = await loadImage(userData.image);
    userData.image = userImage;
  }
  const imagesArray = await Promise.all(promises);
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
    measureText: bindMeasureText(canvas),
    fillMultilineText: bindMultilineSupport(canvas),
    drawImage: bindDrawImage(canvas),
    drawRoundedImage: bindDrawRoundedImage(canvas),
    images: imagesArray,
    user: userData,
    data: artistData,
  };
  const promise = vm.runInNewContext(script, context);
  if (!promise || !isPromise(promise)) return undefined;
  const buffer = await promise;

  if (!buffer || !(buffer instanceof Buffer)) return undefined;
  return buffer;
}
