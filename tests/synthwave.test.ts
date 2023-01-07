import { executeBanner } from "../engine";
import { describe, expect, it } from "@jest/globals";
import { loadArtistSample } from "../utils";

const user = { name: "Ernesto", id: "123" };
const bannerName = "synthwave";

describe("Tests 'Synthwave' banner executing correctly", () => {
  it("Should return buffer instance for this banner", async () => {
    const response = await executeBanner(
      bannerName,
      {},
      loadArtistSample("second")
    );
    expect(response).toBeInstanceOf(Buffer);
  });

  it("Should throw when not enough artists are there", async () => {
    expect.assertions(1);
    try {
      await executeBanner(bannerName, {}, []);
    } catch (e) {
      expect(e.message).toMatch(/suficiente/);
    }
  });
});
