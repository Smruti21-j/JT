

export interface LifeCategory {
  slug: string;
  folder: string; // must match the folder name under assets/life-at-jarvis/
  title: string;
  shortTitle: string;
  date: string; // display string, e.g. "26 Jan 2026"
  description: string;
  accent: string; // hex accent used for this category's chip/glow
}

export const CATEGORY_META: LifeCategory[] = [
  {
    slug: "republic-day-celebration",
    folder: "republic-day-celebration",
    title: "Republic Day Celebration",
    shortTitle: "Republic Day",
    date: "26 Jan 2026",
    description:
      "Tricolor attire, desk-side flags, and the whole floor pausing together to mark the day — snacks included.",
    accent: "#F57C2B",
  },
];

// Eagerly import every image file inside every category folder.
// Vite resolves this at build time into a map of path -> url.
const allImages = import.meta.glob<{ default: string }>(
  "/src/assets/life-at-jarvis/*/*.{jpg,jpeg,png,JPG,JPEG,PNG}",
  { eager: true }
);

function imagesForFolder(folder: string): string[] {
  const prefix = `/src/assets/life-at-jarvis/${folder}/`;
  return Object.keys(allImages)
    .filter((path) => path.startsWith(prefix))
    .sort()
    .map((path) => allImages[path].default);
}

export interface LifeCategoryWithImages extends LifeCategory {
  images: string[];
  cover: string;
  count: number;
}

export const LIFE_CATEGORIES: LifeCategoryWithImages[] = CATEGORY_META.map(
  (cat) => {
    const images = imagesForFolder(cat.folder);
    return {
      ...cat,
      images,
      cover: images[0] ?? "",
      count: images.length,
    };
  }
).filter((cat) => cat.count > 0);

export function getCategoryBySlug(slug: string) {
  return LIFE_CATEGORIES.find((c) => c.slug === slug);
}