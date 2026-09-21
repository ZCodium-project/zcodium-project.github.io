<script lang="ts">
  import { onMount } from "svelte";
  import DownloadButton from "./DownloadButton.svelte";
  import { copy } from "../data/content";
  import { i18n } from "./i18n.svelte";

  const t = $derived(copy[i18n.lang]);
  const rotating = $derived(t.hero.titleRotating);

  let rotIndex = $state(0);

  onMount(() => {
    // 尊重系统的减少动态偏好：不轮换时保持显示第一句。
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      rotIndex = (rotIndex + 1) % rotating.length;
    }, 2600);
    return () => window.clearInterval(timer);
  });

  function rotatorClass(index: number): string {
    const total = rotating.length;
    if (index === rotIndex % total) return "is-active";
    if (index === (rotIndex - 1 + total) % total) return "is-up";
    return "";
  }
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

    <h1 class="hero-title">
      <span class="block">{t.hero.titleFixed}</span>
      <span class="hero-rotator">
        {#each rotating as phrase, index (phrase)}
          <span class="hero-rotator-item {rotatorClass(index)}" aria-hidden={index !== rotIndex}
            >{phrase}</span
          >
        {/each}
      </span>
    </h1>

    <p class="mx-auto mt-6 mb-9 max-w-[720px] text-[clamp(15px,1.6vw,17px)] text-slate-400">
      {t.hero.lead}
    </p>

    <DownloadButton />
  </div>

  <div class="relative z-10 mx-auto mt-14 max-w-[1160px] px-6">
    <div class="shot-frame">
      <img src="/shots/hero-app.png" alt={t.hero.screenshotAlt} loading="eager" />
    </div>
  </div>
</section>
