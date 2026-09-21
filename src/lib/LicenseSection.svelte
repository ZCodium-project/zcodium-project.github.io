<script lang="ts">
  import { copy } from "../data/content";
  import { i18n } from "./i18n.svelte";
  import { reveal } from "./reveal";

  const t = $derived(copy[i18n.lang]);
</script>

<section id="license" class="section">
  <div class="wrap" use:reveal>
    <p class="kicker">{t.license.kicker}</p>
    <h2 class="section-title">{t.license.title}</h2>
    <p class="mb-6 max-w-[760px] text-[15px] text-slate-400">{t.license.intro}</p>
    <div class="grid gap-4 md:grid-cols-3">
      {#each t.license.items as item (item.value)}
        <a class="license-card" href={item.href}>
          <span class="license-card-value">{item.value}</span>
          <span class="license-card-name">{item.name}</span>
        </a>
      {/each}
    </div>
    <p class="mt-5 text-[13px] text-slate-500">
      {t.license.note}
      <a class="text-sky-400 hover:underline" href={t.license.noteHref}>{t.license.noteLinkLabel}</a>
    </p>
  </div>
</section>
