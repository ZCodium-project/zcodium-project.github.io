export interface ReleaseAsset {
  name?: string;
  browser_download_url?: string;
  size?: number;
}

interface ReleaseInfo {
  tag_name?: string;
  html_url?: string;
  assets?: ReleaseAsset[];
}

export interface ReleaseBundle {
  version: string;
  htmlUrl: string;
  assets: ReleaseAsset[];
}

export const RELEASES_URL = "https://github.com/ZCodium-project/ZCodium/releases";

// 我们的版本目前都以 Pre-release 发布，/releases/latest 会 404，因此取列表里的第一个带发行包的版本。
const RELEASES_API = "https://api.github.com/repos/ZCodium-project/ZCodium/releases?per_page=5";

export async function fetchLatestRelease(): Promise<ReleaseBundle | null> {
  try {
    const res = await fetch(RELEASES_API, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) return null;
    const list = (await res.json()) as ReleaseInfo[];
    if (!Array.isArray(list)) return null;
    const release = list.find((item) => (item.assets ?? []).length > 0);
    if (!release) return null;
    return {
      version: release.tag_name ?? "",
      htmlUrl: release.html_url ?? RELEASES_URL,
      assets: release.assets ?? [],
    };
  } catch {
    return null;
  }
}

export function formatSize(bytes?: number): string {
  if (!bytes || bytes <= 0) return "";
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** 从文件名里挑出人类可读的变体名，例如 -mac-arm64.dmg → "Apple Silicon (.dmg)"。 */
export function describeAsset(name: string): string {
  const lower = name.toLowerCase();
  if (lower.endsWith(".dmg")) {
    if (lower.includes("arm64")) return "Apple Silicon (.dmg)";
    if (lower.includes("x64") || lower.includes("intel")) return "Intel (.dmg)";
    return ".dmg";
  }
  if (lower.endsWith(".exe")) return "x64 (.exe)";
  if (lower.endsWith(".appimage")) return "x86_64 (.AppImage)";
  if (lower.endsWith(".tar.gz")) return "CLI (.tar.gz)";
  return name;
}

export interface DownloadGroup {
  id: "macos" | "windows" | "linux" | "cli";
  assets: ReleaseAsset[];
}

const GROUP_PATTERNS: Array<[DownloadGroup["id"], RegExp]> = [
  ["macos", /\.dmg$/i],
  ["windows", /\.exe$/i],
  ["linux", /\.AppImage$/i],
  ["cli", /\.tar\.gz$/i],
];

export function groupAssets(assets: ReleaseAsset[]): DownloadGroup[] {
  const groups: DownloadGroup[] = [];
  for (const [id, pattern] of GROUP_PATTERNS) {
    const matched = assets.filter((asset) => asset.name && pattern.test(asset.name));
    if (matched.length > 0) groups.push({ id, assets: matched });
  }
  return groups;
}
