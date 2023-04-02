import { Canvas, Image, loadImage as li, registerFont as rf } from "canvas";
import {
  bindDrawImage,
  bindDrawRoundedImage,
  bindMeasureText,
  bindMultilineSupport,
} from "../utils";

export interface SpotifyArtist {
  name: string;

  images: {
    url: string;
    height: number;
    width: number;
  }[];
}
export interface BannerConfig {
  time_range: "long_term" | "medium_term" | "short_term"; // que rango de tiempo debe ser la información de la API de spotify, por defecto es "medium_term"
  min_items: number; // número minimo de items de datos, por defecto, 1.
  width: number; // ancho en px del banner
  height: number; // altura del banner
  description?: string; // descripción del banner
  example?: string; // url de imagen de ejemplo
  author: string; // tu nombre
  name: string; // nombre del banner
  images: string[]; // arreglo con imagenes a cargar
  fonts: {
    // arreglo de fuentes a cargar
    src: string; // nombre de la fuente (ver observaciones)
    family: string; // nombre con el que se accederá en el archivo js
  }[];
}

export interface BannerProps {
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
