export const Config: BannerConfig = {
  width: 1296,
  height: 1920,
  author: "Iker Jiménez",
  name: "Synthwave",
  time_range: "long_term",
  min_items: 1,
  example: "https://i.imgur.com/aD4WkXl.png",
  fonts: [
    { src: "SF Movie Poster.ttf", family: "SF Movie Poster" },
    { src: "BLADRMF.ttf", family: "Blade Runner Movie Font" },
  ],
  images: ["background_text.jpg", "background.jpg"],
};

export default async function Synthwave() {
  const context = canvas.getContext("2d");
  if (data.length < 1) {
    throw new BannerError(
      "No se tiene suficiente información de artistas para crear un banner!"
    );
  }
  const titleFont = '"Blade Runner Movie Font"';
  const creditsFont = '"SF Movie Poster"';
  context.drawImage(images[0], 0, 0);
  let fontSize = 84;
  let dynamicY = 313;
  if (data[0].name.length >= 20) {
    fontSize = 50;
    dynamicY = 330;
  }
  const [title, ...credits] = data;
  context.font = `${fontSize}pt ${titleFont}`;
  context.textBaseline = "top";
  context.textAlign = "center";
  context.fillStyle = "#ffffff";
  context.fillText(title.name.toLowerCase(), 648, dynamicY);
  const defaultCreditsFont = (context.font = `60pt ${creditsFont}`);

  let y = 1610;
  let names = [];

  const lines = 3;
  const namesNumber = Math.ceil(credits.length / lines);

  for (let i = 0; i < lines; i++) {
    let string = "",
      font = defaultCreditsFont;
    for (let j = 0; j < namesNumber; j++) {
      const offset = i * namesNumber;
      const index = offset + j;
      if (index > credits.length - 1) {
        break;
      }
      const element = credits[index];
      string += ` ${element.name} `;
    }
    const measurement = context.measureText(string);
    const textWidth =
      measurement.actualBoundingBoxLeft + measurement.actualBoundingBoxRight;
    const textHeight =
      measurement.actualBoundingBoxAscent +
      measurement.actualBoundingBoxDescent;
    if (textWidth > width) {
      font = `50pt ${creditsFont}`;
    }
    names[i] = { string, font, textWidth, textHeight };
  }

  for (const line of names) {
    context.font = line.font;
    context.fillText(line.string, width / 2, y);
    y += line.textHeight + 10;
  }
  return canvas.toBuffer("image/png");
}
