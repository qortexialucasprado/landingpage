export type ResultadoItem = {
  src: string;
  title: string;
  type: "image" | "video";
};

const mediaGlob = import.meta.glob(
  "../imports/Html→Body/AntesDepois/*.{webp,jpg,jpeg,png,mp4}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

function getTitleFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  return base.replace(/\d+$/, "");
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const items: ResultadoItem[] = Object.entries(mediaGlob).map(
  ([path, src]) => {
    const filename = path.split("/").pop() ?? path;
    const isVideo = /\.(mp4|webm|mov)$/i.test(filename);
    return {
      src,
      title: getTitleFromFilename(filename),
      type: isVideo ? "video" : "image",
    };
  },
);

export const resultadosItems = shuffle(items);
