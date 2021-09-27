<template>
  <div>
    <h1 class="text-2xl font-medium">Chat</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import type { MetaInfo } from 'vue-meta';

@Component({
  head(this: Chat): MetaInfo {
    return {
      title: 'Chat Todo',
    };
  },
})
export default class Chat extends Vue {}
</script>
