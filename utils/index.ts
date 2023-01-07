import { Canvas, Image } from "canvas";
import { readFileSync } from "fs";
import path from "path";

export function bindMultilineSupport(canvas: Canvas) {
  const ctx = canvas.getContext("2d");
  const minLineHeight = 10;
  return function fillMultilineText(
    text: string,
    x: number,
    y: number,
    lineHeight: number = 1.0
  ) {
    const lines = text.split("\n");
    const measuredLines = lines.map((line) => {
      const measure = ctx.measureText(line);
      return {
        text: line,
        height:
          measure.actualBoundingBoxDescent + measure.actualBoundingBoxAscent,
      };
    });
    let accumHeight = 0;
    measuredLines.forEach((line) => {
      ctx.fillText(line.text, x, y + accumHeight);
      accumHeight +=
        line.height + Math.max(minLineHeight * lineHeight, minLineHeight);
    });
  };
}

export function bindMeasureText(canvas: Canvas) {
  const ctx = canvas.getContext("2d");

  return function measureText(text: string) {
    const measure = ctx.measureText(text);
    return {
      height:
        measure.actualBoundingBoxDescent + measure.actualBoundingBoxAscent,
      width: measure.actualBoundingBoxLeft + measure.actualBoundingBoxRight,
    };
  };
}

export function bindDrawImage(canvas: Canvas) {
  const ctx = canvas.getContext("2d");
  return function draw(
    x: number,
    y: number,
    image: Image,
    width: number,
    height: number
  ) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(width / image.width, height / image.height);
    ctx.drawImage(image, 0, 0);
    ctx.restore();
  };
}

export function loadArtistSample(name: string) {
  return JSON.parse(
    readFileSync(path.join("samples", "artist", name + ".json"), "utf-8")
  );
}

export function loadUserSample(name: string) {
  return JSON.parse(
    readFileSync(path.join("samples", "user", name + ".json"), "utf-8")
  );
}
