import { Canvas, Image, loadImage as li, registerFont as rf } from "canvas";
import {
  bindDrawImage,
  bindDrawRoundedImage,
  bindMeasureText,
  bindMultilineSupport,
} from "../../../utils";

export interface SpotifyArtist {
  name: string;

  images: {
    url: string;
    height: number;
    width: number;
  }[];
}

interface BannerProps {
  width: number;
  height: number;
  user: {
    name: string;
    image?: Image;
  };
  fillMultilineText: ReturnType<typeof bindMultilineSupport>;
  measureText: ReturnType<typeof bindMeasureText>;
  drawImage: ReturnType<typeof bindDrawImage>;
  drawRoundedImage: ReturnType<typeof bindDrawRoundedImage>;

  author: string;
  description: string;
  canvas: Canvas;
  loadImage: typeof li;
  registerFont: typeof rf;

  images: Image[];
  data: SpotifyArtist[];
}
