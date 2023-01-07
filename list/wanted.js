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
  const bottomFont = '"Noto"';
  context.drawImage(images[0], 0, 0);
  context.font = `150px ${titleFont}`;
  context.textBaseline = "top";
  context.textAlign = "center";
  context.fillStyle = "#000";
  const title = `¿Has visto a ${user.name}?`;
  let accumHeight = 300;
  context.fillText(title, width / 2, accumHeight);
  accumHeight += measureText(title).height * 2;
  // context.drawImage(user.image, width / 2 - 256, accumHeight, 512, 512);
  drawImage(width / 2 - 256, accumHeight, user.image, 512, 512);
  accumHeight += 512;
  context.font = `80px ${bottomFont}`;
  context.fillStyle = "#000";
  const formatter = new Intl.ListFormat("es", {
    style: "long",
    type: "conjunction",
  });
  const artistas = formatter.format(
    data.slice(0, 3).map((artista) => artista.name)
  );
  const l1 = `La última vez se le vió escuchando a sus artistas favoritos:\n ${artistas}`;
  fillMultilineText(l1, width / 2, accumHeight, 5);
  return canvas.toBuffer("image/png");
})();
