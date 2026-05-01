// Twitter card uses the same site OG card. Re-exports of route
// config aren't allowed (Next parses these statically), so we
// re-declare the constants and re-import the renderer.
import OG from "./opengraph-image";

export const runtime = "edge";
export const alt = "yinyan.news — for every hard headline, an equal-weight one that is hopeful";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OG;
