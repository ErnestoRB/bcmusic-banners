(async function () {
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
  const titleFont = '"Bebas"';
  // dibujar fondo
  context.drawImage(images[0], 0, 0);
  // dibujar rectangulo
  context.save();
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, 300);
  context.restore();
  // dibujar imagen de usuario
  drawRoundedImage(user.image, gap, 75, userImage, "#fff", 20);
  // dibujar titulo
  context.save();
  const title = `${user.name}\nTOP 3 Artistas`;
  context.font = `75px ${titleFont}`;
  context.fillStyle = "#fff";
  context.textBaseline = "middle";
  context.textAlign = "center";
  fillMultilineText(title, 350, 150, 1, "center", "middle");
  context.restore();
  // dibujar artistas
  let sY = 600; // Altura de inicio
  context.save();
  context.textBaseline = "middle";
  context.textAlign = "left";
  context.font = `80px ${titleFont}`;
  context.fillStyle = "#000";
  const textGap = 50; // espaciado entre borde de imagen y texto
  const size = 400; // tamaño para imagen de artista
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
      drawImage(gap, sY - size / 2, image, size, size);
    } else {
      context.fillText(
        artistaData.name,
        canvas.width - size - textMeasurament.width - gap - textGap,
        sY
      );
      drawImage(canvas.width - gap - size, sY - size / 2, image, size, size);
    }

    sY += textMeasurament.height + 300;
  }
  context.restore();

  return canvas.toBuffer("image/png");
})();
