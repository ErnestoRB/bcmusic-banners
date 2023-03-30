"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUserSample = exports.loadArtistSample = exports.bindDrawRoundedImage = exports.bindDrawImage = exports.bindMeasureText = exports.bindMultilineSupport = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function bindMultilineSupport(canvas) {
    const ctx = canvas.getContext("2d");
    const defaultLineHeight = 10;
    return function fillMultilineText(text, x, y, lineHeight = 1.0, textAlign = "left", textBaseline = "middle") {
        const lines = text.split("\n");
        const measuredLines = lines.map((line) => {
            const measure = ctx.measureText(line);
            return {
                text: line,
                width: measure.width,
                height: measure.actualBoundingBoxDescent + measure.actualBoundingBoxAscent,
            };
        });
        let accumHeight = 0;
        ctx.save();
        const finalLineHeight = Math.max(defaultLineHeight * lineHeight, defaultLineHeight);
        const maxX = Math.max(...measuredLines.map((line) => line.width));
        const boundingHeight = measuredLines
            .map((line) => line.height)
            .reduce((pre, cur) => (pre += cur)) +
            finalLineHeight * (lines.length - 1);
        ctx.textAlign = textAlign;
        ctx.textBaseline = "top";
        measuredLines.forEach((line) => {
            const rX = textAlign == "center" ? x + maxX / 2 : x;
            const rY = textBaseline == "middle" ? y - boundingHeight / 2 : x;
            ctx.fillText(line.text, rX, rY + accumHeight);
            accumHeight += line.height + finalLineHeight;
        });
        ctx.restore();
    };
}
exports.bindMultilineSupport = bindMultilineSupport;
function bindMeasureText(canvas) {
    const ctx = canvas.getContext("2d");
    return function measureText(text) {
        const measure = ctx.measureText(text);
        return {
            height: measure.actualBoundingBoxDescent + measure.actualBoundingBoxAscent,
            width: measure.actualBoundingBoxLeft + measure.actualBoundingBoxRight,
        };
    };
}
exports.bindMeasureText = bindMeasureText;
function bindDrawImage(canvas) {
    const ctx = canvas.getContext("2d");
    return function draw(x, y, image, width, height, shadow) {
        ctx.save();
        if (shadow) {
            const { shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY } = shadow;
            ctx.shadowBlur = shadowBlur;
            ctx.shadowColor = shadowColor;
            ctx.shadowOffsetX = shadowOffsetX;
            ctx.shadowOffsetY = shadowOffsetY;
        }
        ctx.translate(x, y);
        ctx.scale(width / image.width, height / image.height);
        ctx.drawImage(image, 0, 0);
        ctx.restore();
    };
}
exports.bindDrawImage = bindDrawImage;
function bindDrawRoundedImage(canvas) {
    const context = canvas.getContext("2d");
    return function drawRoundedImage(image, x, y, size, strokeStyle = "", lineWidth = 0) {
        context.save();
        // create clipping region which will display portion of image
        // The image will only be visible inside the circular clipping path
        if (strokeStyle) {
            context.strokeStyle = strokeStyle;
        }
        context.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
        context.beginPath();
        context.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
        context.lineWidth = lineWidth;
        context.stroke();
        context.closePath();
        context.clip();
        // draw the image into the clipping region
        bindDrawImage(canvas)(x, y, image, size, size);
        // restore the context to its unaltered state
        context.restore();
    };
}
exports.bindDrawRoundedImage = bindDrawRoundedImage;
function loadArtistSample(name) {
    return JSON.parse((0, fs_1.readFileSync)(path_1.default.join("samples", "artist", name + ".json"), "utf-8"));
}
exports.loadArtistSample = loadArtistSample;
function loadUserSample(name) {
    return JSON.parse((0, fs_1.readFileSync)(path_1.default.join("samples", "user", name + ".json"), "utf-8"));
}
exports.loadUserSample = loadUserSample;
