import { Canvas, Image, loadImage as li, registerFont as rf } from "canvas";
import {
  bindDrawImage,
  bindMeasureText,
  bindMultilineSupport,
} from "../../utils";

import { SpotifyArtist } from "../../";

declare global {
  var width: number;
  var height: number;
  var user: {
    name: string;
    image?: Image;
  };
  var fillMultilineText: ReturnType<typeof bindMultilineSupport>;
  var measureText: ReturnType<typeof bindMeasureText>;
  var drawImage: ReturnType<typeof bindDrawImage>;
  var author: string;
  var description: string;
  var canvas: Canvas;
  var loadImage: typeof li;
  var registerFont: typeof rf;

  class BannerError extends Error {
    isBanner: true;
  }
  var images: Image[];
  var data: SpotifyArtist[];
}
