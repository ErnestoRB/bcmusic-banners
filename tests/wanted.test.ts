import { executeBanner } from "../engine";
import { describe, expect, it, jest } from "@jest/globals";
import { loadArtistSample } from "../utils";

const firstSample = loadArtistSample("first");

jest.mock("canvas", () => {
  const originalModule: any = jest.requireActual("canvas");
  const img = new originalModule.Image();
  img.src = "tests/react.png";
  return {
    __esModule: true,
    ...originalModule,
    loadImage: async () => img,
  };
});

const user = {
  name: "Ernesto",
  id: "123",
  image: "algo",
};
const bannerName = "wanted";

describe("Tests 'Wanted' banner executing correctly", () => {
  it("Should return buffer instance for this banner", async () => {
    const response = await executeBanner(bannerName, user, firstSample);
    expect(response).toBeInstanceOf(Buffer);
  });

  it("Should throw when not enough artists are there", async () => {
    expect.assertions(1);
    try {
      await executeBanner(bannerName, user, []);
    } catch (e) {
      expect(e.message).toMatch(/suficiente/);
    }
  });

  it("Should throw when no image is found", async () => {
    expect.assertions(1);
    try {
      await executeBanner(
        bannerName,
        {
          name: "Ernesto",
        },
        firstSample
      );
    } catch (e) {
      expect(e.message).toMatch(/im[áa]gen/);
    }
  });

  it("Should throw when no name is set", async () => {
    expect.assertions(1);
    try {
      await executeBanner(bannerName, {}, firstSample);
    } catch (e) {
      expect(e.message).toMatch(/nombre/);
    }
  });
});
