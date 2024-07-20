<script setup lang="ts">
import { FwbNavbar, FwbNavbarCollapse } from 'flowbite-vue'
</script>

<template>
  <header class="w-full">
    <fwb-navbar class="dark:bg-zinc-800">
      <template #logo>
        <!-- <fwb-navbar-logo alt="Flowbite logo" image-url="/images/logo.svg" link="#">
          Flowbite
        </fwb-navbar-logo> -->
        <div class="flex flex-col pb-2">
          <h1 class="text-4xl mb-0">HbM: RPG v3.0</h1>
          <h2 class="text-2xl">Companion App</h2>
          <span class="inline-block mt-2 text-xs italic">Kompatybilne z Kartami Postaci 2.0</span>
        </div>
      </template>

      <template #default="{ isShowMenu }">
        <fwb-navbar-collapse :is-show-menu="isShowMenu" class="dark:[&>*]:!bg-zinc-900">
          <NuxtLink
            to="/"
            class="dark:hover:bg-zinc-500 px-4 py-2 rounded-lg"
            :class="{ 'dark:bg-zinc-800': $route.name === 'index' }"
          >
            Strona Główna
          </NuxtLink>
          <NuxtLink
            to="/character-sheet"
            class="dark:hover:bg-zinc-500 px-4 py-2 rounded-lg mt-2 md:!ml-2 md:mt-0"
            :class="{ 'dark:bg-zinc-800': $route.name === 'character-sheet' }"
          >
            Karty Postaci
          </NuxtLink>
          <NuxtLink
            to="/corebooks"
            class="dark:hover:bg-zinc-500 px-4 py-2 rounded-lg mt-2 md:!ml-2 md:mt-0"
            :class="{ 'dark:bg-zinc-800': $route.name === 'corebooks' }"
          >
            Podręczniki
          </NuxtLink>
          <!-- <NuxtLink to="#" class="dark:hover:bg-zinc-500 px-4 py-2 rounded-lg !ml-2"> Contact </NuxtLink> -->
        </fwb-navbar-collapse>
      </template>
    </fwb-navbar>
  </header>
</template>
