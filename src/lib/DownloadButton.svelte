<script lang="ts">
  import { onMount } from "svelte";
  import GithubIcon from "./GithubIcon.svelte";
  import { copy, releasesUrl, repoUrl } from "../data/content";
  import { i18n } from "./i18n.svelte";
  import { fetchLatestRelease, formatSize, type ReleaseAsset } from "../data/releases";

  type OsKind = "macos" | "windows" | "linux" | "unknown";

  const OS_ASSET_PATTERNS: Record<OsKind, RegExp> = {
    macos: /\.dmg$/i,
    windows: /\.exe$/i,
    linux: /\.AppImage$/i,
    unknown: /\.tar\.gz$/i,
  };

  const EXT_LABEL: Record<OsKind, string> = {
    macos: ".dmg",
    windows: ".exe",
    linux: ".AppImage",
    unknown: ".tar.gz",
  };

  const t = $derived(copy[i18n.lang]);
  let os = $state<OsKind>("unknown");
  let version = $state("");
  let asset = $state<ReleaseAsset | null>(null);
  let downloadUrl = $state(releasesUrl);

  onMount(() => {
    const ua = navigator.userAgent;
    os = /Mac/i.test(ua) ? "macos" : /Win/i.test(ua) ? "windows" : /Linux/i.test(ua) ? "linux" : "unknown";
    void loadLatestRelease();
  });

  async function loadLatestRelease() {
    const release = await fetchLatestRelease();
    if (!release) return;
    version = release.version;
    const assets = release.assets;
    // 先找当前系统的桌面安装包，找不到再退回 CLI 发行包。
    const preferred =
      assets.find((item) => item.name && OS_ASSET_PATTERNS[os].test(item.name)) ??
      assets.find((item) => item.name?.endsWith(".tar.gz"));
    if (preferred?.browser_download_url) {
      asset = preferred;
      downloadUrl = preferred.browser_download_url;
    }
  }

  const osLabel = $derived(
    os === "macos" ? "macOS" : os === "windows" ? "Windows" : os === "linux" ? "Linux" : "CLI",
  );

  // 让按钮自己说清楚下载的是什么：版本 · 平台 · 格式 · 体积。
  const metaText = $derived(
    version
      ? [version, `${osLabel} ${EXT_LABEL[os]}`, formatSize(asset?.size)].filter(Boolean).join(" · ")
      : "",
  );

  const installHint = $derived(
    os === "macos"
      ? t.hero.hints.macos
      : os === "windows"
        ? t.hero.hints.windows
        : os === "linux"
          ? t.hero.hints.linux
          : t.hero.hints.other,
  );
</script>

<div class="flex flex-col items-center gap-3">
  <div class="flex flex-wrap items-center justify-center gap-3">
    <a class="dl-primary" href={downloadUrl}>
      <span class="dl-primary-main">
        <svg class="h-[18px] w-[18px]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 2v8m0 0 3.2-3.2M8 10 4.8 6.8M3 12.5h10"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        {t.hero.download.label}
      </span>
      <span class="dl-primary-meta">{metaText || t.hero.download.fallback}</span>
    </a>
    <a
      class="inline-flex items-center gap-2 rounded-[13px] border border-white/15 bg-white/[0.03] px-5 py-[13px] text-sm font-semibold text-slate-100 no-underline transition-colors hover:border-white/30 hover:bg-white/[0.06]"
      href={repoUrl}
    >
      <GithubIcon class="h-[15px] w-[15px]" />
      {t.hero.viewSource}
    </a>
  </div>
  <p class="max-w-[560px] text-[13px] text-slate-500">
    {installHint} · <a class="text-sky-400 hover:underline" href={releasesUrl}>{t.hero.allVersions}</a>
  </p>
</div>
