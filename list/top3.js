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
  const titleFont = '"Bebas"';
  // dibujar fondo
  context.drawImage(images[0], 0, 0);
  // dibujar rectangulo
  context.save();
  context.globalAlpha = 0.5;
  context.fillStyle = "#fff";
  context.fillRect(50, 50, width - 100, 400);
  context.restore();
  // dibujar imagen de usuario
  drawRoundedImage(user.image, 100, 200, 100);
  // dibujar titulo
  context.save();
  const title = `${user.name}\nTOP 3\nArtistas`;
  context.font = `100px ${titleFont}`;
  context.textBaseline = "middle";
  context.textAlign = "center";
  fillMultilineText(title, 250, 250, 1, "center", "middle");
  context.restore();
  // dibujar artistas
  let sY = 750;
  context.save();
  context.textBaseline = "middle";
  context.textAlign = "left";
  context.font = `80px ${titleFont}`;
  context.fillStyle = "#000";
  for (let i = 0; i < 3; i++) {
    const artistaData = data[i];
    const impar = (i + 2) % 2 != 0;
    if (artistaData.images.length == 0) {
      throw new BannerError(`Artista ${artistaData.name} no tiene imágen`);
    }
    const image = await loadImage(artistaData.images[0].url);
    const textMeasurament = measureText(artistaData.name);
    if (impar) {
      context.fillText(artistaData.name, 400, sY, 700);
      drawImage(50, sY - 150, image, 300, 300);
    } else {
      context.fillText(
        artistaData.name,
        canvas.width - 400 - textMeasurament.width,
        sY,
        700
      );
      drawImage(canvas.width - 50 - 300, sY - 150, image, 300, 300);
    }

    sY += textMeasurament.height + 300;
  }
  context.restore();

  return canvas.toBuffer("image/png");
})();
