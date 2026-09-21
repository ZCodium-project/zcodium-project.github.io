<script lang="ts">
  import DownloadButton from "./DownloadButton.svelte";
  import { copy } from "../data/content";
  import { i18n } from "./i18n.svelte";

  const t = $derived(copy[i18n.lang]);
</script>

<section class="hero-glow hero-dots relative overflow-hidden pt-20 pb-16">
  <div class="relative z-10 mx-auto max-w-[920px] px-6 text-center">
    <div class="mb-6 flex flex-wrap justify-center gap-2">
      <span
        class="inline-flex items-center gap-[7px] rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[12.5px] font-semibold tracking-[0.02em] text-slate-400"
      >
        <span class="h-[7px] w-[7px] rounded-full bg-sky-400 ring-[3px] ring-sky-400/10"></span>
        {t.hero.badges[0]}
      </span>
      <span
        class="inline-flex items-center gap-[7px] rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[12.5px] font-semibold tracking-[0.02em] text-slate-400"
      >
        {t.hero.badges[1]}
      </span>
    </div>

    <h1 class="hero-title" class:hero-title-en={i18n.lang === "en"}>
      <span class="block">{t.hero.titleLines[0]}</span>
      <span class="block" class:hero-title-tail-punct={i18n.lang === "zh"}
        >{t.hero.titleLines[1]}</span
      >
    </h1>

    <p class="mx-auto mt-6 max-w-[720px] text-[clamp(15px,1.6vw,17px)] text-slate-400">
      {t.hero.lead}
    </p>

    <p class="mx-auto mt-3 mb-9 max-w-[720px] text-[14px] text-slate-500">
      {t.hero.leadNote}
    </p>

    <DownloadButton />
  </div>

  <div class="relative z-10 mx-auto mt-14 max-w-[1160px] px-6">
    <div class="shot-frame">
      <img src="/shots/hero-app.png" alt={t.hero.screenshotAlt} loading="eager" />
    </div>
  </div>
</section>
