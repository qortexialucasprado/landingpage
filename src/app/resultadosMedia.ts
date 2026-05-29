export type ResultadoItem = {
  src: string;
  title: string;
  type: "image" | "video";
  poster?: string;
};

const mediaGlob = import.meta.glob(
  "../imports/Html→Body/AntesDepois/*.{webp,jpg,jpeg,png,mp4}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const posterGlob = import.meta.glob(
  "../imports/Html→Body/AntesDepois/*-{thumbnail,poster}.{webp,jpg,jpeg,png}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

function isPosterOrThumbnailFile(filename: string): boolean {
  return /-(thumbnail|poster)\.(webp|jpe?g|png)$/i.test(filename);
}

function getTitleFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  return base.replace(/\d+$/, "");
}

function getVideoBaseKey(filename: string): string {
  return filename.replace(/\.(mp4|webm|mov)$/i, "");
}

function buildPosterMap(): Map<string, string> {
  const map = new Map<string, string>();

  for (const [path, src] of Object.entries(posterGlob)) {
    const filename = path.split("/").pop() ?? path;
    const match = filename.match(/^(.+?)-(thumbnail|poster)\./i);
    if (match) {
      map.set(match[1], src);
    }
  }

  return map;
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const posterByVideoBase = buildPosterMap();

const items: ResultadoItem[] = Object.entries(mediaGlob)
  .filter(([path]) => {
    const filename = path.split("/").pop() ?? path;
    return !isPosterOrThumbnailFile(filename);
  })
  .map(([path, src]) => {
    const filename = path.split("/").pop() ?? path;
    const isVideo = /\.(mp4|webm|mov)$/i.test(filename);

    if (!isVideo) {
      return {
        src,
        title: getTitleFromFilename(filename),
        type: "image",
      };
    }

    const videoBase = getVideoBaseKey(filename);

    return {
      src,
      title: getTitleFromFilename(filename),
      type: "video",
      poster: posterByVideoBase.get(videoBase),
    };
  },
);

export const resultadosItems = shuffle(items);
