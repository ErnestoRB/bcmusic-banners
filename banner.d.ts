declare global {
  interface BannerConfig {
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
  class BannerError extends Error {
    isError: boolean;
  }
}

export {};
