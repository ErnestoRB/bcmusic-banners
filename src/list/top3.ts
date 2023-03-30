import { BannerProps } from "./typings";

export const Config: BannerConfig = {
  width: 1080,
  height: 1920,
  author: "Ernesto Ramírez",
  name: "Top 3",
  fonts: [
    { src: "BebasNeue.ttf", family: "Bebas" },
    { src: "NotoSans.ttf", family: "Noto" },
    { src: "Bungee-Regular.ttf", family: "Bungee" },
    { src: "BungeeShade-Regular.ttf", family: "BungeeShade" },
  ],
  min_items: 1,
  time_range: "long_term",
  images: ["top3.png"],
};

export default async function Top3({
  canvas,
  data,
  user,
  images,
  author,
  drawRoundedImage,
  fillMultilineText,
  description,
  drawImage,
  height,
  loadImage,
  measureText,
  registerFont,
  width,
}: BannerProps) {
  const context = canvas.getContext("2d");
  if (data.length < 3) {
    throw new BannerError(
      "No se tiene suficiente información de artistas para crear un banner!"
    );
  }
  if (!user.name) {
    throw new BannerError("Se requiere que el usuario tenga un nombre!");
  }
  if (!user.image) {
    throw new BannerError(
      "Se requiere que el usuario tenga una imágen de perfil!"
    );
  }
  const gap = 50; // espaciado entre borde de imagen e imagenes de artistas
  const userImage = 150;
  const titleFont = '"BungeeShade"';
  const bodyFont = '"Bungee"';
  // dibujar fondo
  context.drawImage(images[0], 0, 0);
  // dibujar rectangulo
  context.save();
  context.fillStyle = "white";
  context.globalAlpha = 0.65;
  context.roundRect(gap, gap, width - gap * 2, 300, 10);
  context.fill();
  context.lineWidth = 1;
  context.shadowBlur = 8;
  context.shadowColor = "black";
  context.shadowOffsetX = 1;
  context.shadowOffsetY = 1;
  context.stroke();
  context.restore();
  // dibujar imagen de usuario
  drawRoundedImage(user.image, gap * 2, 75 + gap, userImage, "#000", 10);
  // dibujar titulo
  context.save();
  const title = `${user.name.split(" ")[0]}\nTOP 3 Artistas`;
  context.font = `70px ${titleFont}`;
  context.fillStyle = "black";
  context.textBaseline = "middle";
  context.textAlign = "center";
  fillMultilineText(title, 300, 150 + gap, 1, "center", "middle");
  context.restore();
  // dibujar artistas
  let sY = 650; // Altura de inicio
  context.save();
  context.textBaseline = "middle";
  context.textAlign = "left";
  context.fillStyle = "#000";
  const textGap = 50; // espaciado entre borde de imagen y texto
  const size = 400; // tamaño para imagen de artista
  const shadowSettings = {
    shadowBlur: 25,
    shadowColor: "black",
    shadowOffsetX: 0,
    shadowOffsetY: 0,
  };
  context.font = `45px ${bodyFont}`;
  context.fillStyle = "white";
  context.strokeStyle = "black";
  context.lineWidth = 3;
  context.shadowBlur = 8;
  context.shadowColor = "black";
  context.shadowOffsetX = 1;
  context.shadowOffsetY = 1;
  for (let i = 0; i < 3; i++) {
    const artistaData = data[i];
    const impar = (i + 2) % 2 != 0;
    if (artistaData.images.length == 0) {
      throw new BannerError(`Artista ${artistaData.name} no tiene imágen`);
    }
    const image = await loadImage(artistaData.images[0].url);
    const textMeasurament = measureText(artistaData.name);

    if (impar) {
      context.fillText(artistaData.name, size + gap + textGap, sY);
      drawImage(gap, sY - size / 2, image, size, size, shadowSettings);
    } else {
      context.fillText(
        artistaData.name,
        canvas.width - size - textMeasurament.width - gap - textGap,
        sY
      );
      drawImage(
        canvas.width - gap - size,
        sY - size / 2,
        image,
        size,
        size,
        shadowSettings
      );
    }
    sY += -textMeasurament.height + size;
  }
  context.restore();
  return canvas.toBuffer("image/png");
}
