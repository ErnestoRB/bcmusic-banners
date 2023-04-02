import { createCanvas, loadImage, registerFont } from "canvas";
import vm from "vm";
import path from "path";
import {
  bindDrawImage,
  bindDrawRoundedImage,
  bindMeasureText,
  bindMultilineSupport,
} from "./utils";
import { isPromise } from "util/types";
import { BannerConfig, SpotifyArtist } from "./src/types";

class BannerError extends Error {
  isBanner = true;
}

export async function executeBanner(
  name: string,
  userData: any,
  artistData: SpotifyArtist[]
) {
  const bannerModule = await import(`./src/list/${name}.ts`);
  const bannerFunc = bannerModule.default;
  const config: BannerConfig = bannerModule.Config;

  const { width, height, author, description, images, fonts } = config;
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
    props: {
      width,
      height,
      author,
      description,
      canvas,
      loadImage,
      registerFont,
      measureText: bindMeasureText(canvas),
      fillMultilineText: bindMultilineSupport(canvas),
      drawImage: bindDrawImage(canvas),
      drawRoundedImage: bindDrawRoundedImage(canvas),
      images: imagesArray,
      user: userData,
      data: artistData,
    },
    bannerFunc,

    BannerError,
  };
  const promise = vm.runInNewContext(`bannerFunc(props)`, context);
  if (!promise || !isPromise(promise)) return undefined;
  const buffer = await promise;

  if (!buffer || !(buffer instanceof Buffer)) return undefined;
  return buffer;
}
