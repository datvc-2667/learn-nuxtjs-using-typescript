<template>
  <div>
    <h1 class="text-2xl font-medium">Calender</h1>
    <vc-date-picker
      :value="null"
      :attributes="attrs"
      color="green"
      is-indigo
      is-range
      is-expanded
      :rows="2"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import type { MetaInfo } from 'vue-meta';

interface CalenderAttr {
  key: string;
  highlight: boolean;
  date: Date;
}

@Component({
  head(this: Calender): MetaInfo {
    return {
      title: 'Calender Todo',
    };
  },
})
export default class Calender extends Vue {
  attrs: CalenderAttr[] = [
    {
      key: 'today',
      highlight: true,
      date: new Date(),
    },
  ];
}
</script>

<style></style>
