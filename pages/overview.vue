<template>
  <div>
    <h1 class="text-2xl font-medium">Overview</h1>
    <ButtonGradient />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import type { MetaInfo } from 'vue-meta';

@Component({
  head(this: Overview): MetaInfo {
    return {
      title: 'Overview Todo',
    };
  },
})
export default class Overview extends Vue {}
</script>

<style></style>
