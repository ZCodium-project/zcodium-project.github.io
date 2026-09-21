<script lang="ts">
  import { copy } from "../data/content";
  import { i18n } from "./i18n.svelte";
  import { reveal } from "./reveal";

  const t = $derived(copy[i18n.lang]);
</script>

<section id="showcase" class="section section-alt">
  <div class="wrap" use:reveal>
    <p class="kicker">{t.showcase.kicker}</p>
    <h2 class="section-title">{t.showcase.title}</h2>
    <p class="mb-8 max-w-[760px] text-[15px] text-slate-400">{t.showcase.body}</p>
    <div class="shot-frame">
      <img src="/shots/review-flow.png" alt={t.showcase.alt} loading="lazy" />
    </div>
  </div>
</section>
