/** Unsplash photo by id, e.g. unsplash("1585937421612-70a008356fbe"). Sizing is added by the image loader. */
export const unsplash = (id: string) => (id.startsWith("/") ? id : `https://images.unsplash.com/photo-${id}`);

/** Plain sized Unsplash URL for places that can't use next/image (CSS backgrounds, WebGL textures). */
export const unsplashSized = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`;

export type VideoSource = {
  /** Pexels video id, for credits */
  id: number;
  title: string;
  uhd: string;
  hd: string;
  sd: string;
  poster: string;
};

const pexels = (id: number, title: string, uhd: string, hd: string, sd: string): VideoSource => ({
  id,
  title,
  uhd: `https://videos.pexels.com/video-files/${id}/${uhd}.mp4`,
  hd: `https://videos.pexels.com/video-files/${id}/${hd}.mp4`,
  sd: `https://videos.pexels.com/video-files/${id}/${sd}.mp4`,
  poster: `https://images.pexels.com/videos/${id}/pexels-photo-${id}.jpeg`,
});

/** Free-licence Pexels clips (https://www.pexels.com/license/). Credits are listed in docs/ASSETS.md. */
export const videos = {
  tandoor: pexels(36099938, "Bread baking in a clay oven", "15309628_3840_2160_25fps", "15309621_1920_1080_25fps", "15309618_1280_720_25fps"),
  coastalSkyline: pexels(36783891, "Aerial view of a coastal skyline", "15587770_3840_2160_60fps", "15587763_1920_1080_60fps", "15587758_1280_720_60fps"),
  housingComplex: pexels(31973183, "Aerial view of a modern housing complex", "13624002_3840_2160_60fps", "13624000_1920_1080_60fps", "13623999_1280_720_60fps"),
  woodShaving: pexels(5972632, "Carpenter shaving wood", "5972632-uhd_3840_2160_25fps", "5972632-hd_1920_1080_25fps", "5972632-hd_1280_720_25fps"),
  moltenSteel: pexels(5121753, "Flowing molten steel", "5121753-uhd_3840_2160_25fps", "5121753-hd_1920_1080_25fps", "5121753-hd_1280_720_25fps"),
  sareeOutdoors: pexels(35764326, "Woman in a traditional outfit outdoors", "15163406_3840_2160_50fps", "15163400_1920_1080_50fps", "15163398_1280_720_50fps"),
  backstage: pexels(32210739, "Backstage at a fashion show", "13738097_3840_2160_60fps", "13738090_1920_1080_60fps", "13738088_1280_720_60fps"),
  weddingRitual: pexels(29766220, "Traditional Indian wedding ritual", "12791760_3840_2160_25fps", "12791758_1920_1080_25fps", "12791757_1280_720_25fps"),
  henna: pexels(29766214, "Wedding celebration with henna", "12791772_3840_2160_25fps", "12791770_1920_1080_25fps", "12791769_1280_720_25fps"),
} satisfies Record<string, VideoSource>;
