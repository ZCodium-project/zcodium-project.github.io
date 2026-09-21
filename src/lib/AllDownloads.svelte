<script lang="ts">
  import { onMount } from "svelte";
  import { copy, releasesUrl } from "../data/content";
  import { i18n } from "./i18n.svelte";
  import {
    describeAsset,
    fetchLatestRelease,
    formatSize,
    groupAssets,
    type DownloadGroup,
  } from "../data/releases";
  import { reveal } from "./reveal";

  const t = $derived(copy[i18n.lang]);
  let version = $state("");
  let groups = $state<DownloadGroup[]>([]);
  let loaded = $state(false);

  const groupLabel = $derived({
    macos: t.downloads.groups.macos,
    windows: t.downloads.groups.windows,
    linux: t.downloads.groups.linux,
    cli: t.downloads.groups.cli,
  });

  onMount(async () => {
    const release = await fetchLatestRelease();
    if (release) {
      version = release.version;
      groups = groupAssets(release.assets);
    }
    loaded = true;
  });
</script>

<section id="downloads" class="section section-alt">
  <div class="wrap" use:reveal>
    <p class="kicker">{t.downloads.kicker}</p>
    <h2 class="section-title">{t.downloads.title}</h2>
    <p class="mb-8 max-w-[760px] text-[15px] text-slate-400">
      {#if version}<span class="mr-2 font-mono text-[13.5px] text-sky-400">{version}</span>{/if}
      {t.downloads.note}
    </p>

    {#if groups.length > 0}
      <div class="grid gap-4 md:grid-cols-2">
        {#each groups as group (group.id)}
          <div class="dl-group">
            <h3 class="dl-group-title">{groupLabel[group.id]}</h3>
            <ul class="m-0 list-none p-0">
              {#each group.assets as item (item.name)}
                <li>
                  <a class="dl-item" href={item.browser_download_url}>
                    <span class="dl-item-name">{item.name ? describeAsset(item.name) : ""}</span>
                    <span class="dl-item-meta"
                      >{item.name}{item.size ? ` · ${formatSize(item.size)}` : ""}</span
                    >
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    {:else if loaded}
      <p class="text-[14px] text-slate-500">{t.downloads.empty}</p>
    {/if}

    <p class="mt-6 text-[13px]">
      <a class="text-sky-400 hover:underline" href={releasesUrl}>{t.downloads.allLink} →</a>
    </p>
  </div>
</section>
