<template>
  <div v-if="loading" class="overfow">
    <div class="loading-page"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LoadingBar extends Vue {
  loading: boolean = false;

  start(): boolean {
    return (this.loading = true);
  }
  finish(): boolean {
    return (this.loading = false);
  }
}
</script>

<style lang="scss" scoped>
$w: 10ch;

.overfow {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  z-index: 1;
}
.loading-page {
  margin: auto;
  font: {
    weight: bold;
    family: monospace;
    size: 30px;
  }
  font-weight: bold;
  letter-spacing: $w;
  width: $w;
  overflow: hidden;
  white-space: nowrap;
  text-shadow: calc(-1 * $w) 0, calc(-2 * $w) 0, calc(-3 * $w) 0, calc(-4 * $w) 0, calc(-5 * $w) 0,
    calc(-6 * $w) 0, calc(-7 * $w) 0, calc(-8 * $w) 0, calc(-9 * $w) 0;
  animation: c6 2s infinite;
}
.loading-page:before {
  content: 'Loading...';
}
@keyframes c6 {
  20% {
    text-shadow: calc(-1 * $w) 0, calc(-2 * $w) 0 red, calc(-3 * $w) 0, calc(-4 * $w) 0 #ffa516,
      calc(-5 * $w) 0 #63fff4, calc(-6 * $w) 0, calc(-7 * $w) 0, calc(-8 * $w) 0 green,
      calc(-9 * $w) 0;
  }
  40% {
    text-shadow: calc(-1 * $w) 0, calc(-2 * $w) 0 red, calc(-3 * $w) 0 #e945e9, calc(-4 * $w) 0,
      calc(-5 * $w) 0 green, calc(-6 * $w) 0 orange, calc(-7 * $w) 0, calc(-8 * $w) 0 green,
      calc(-9 * $w) 0;
  }
  60% {
    text-shadow: calc(-1 * $w) 0 lightblue, calc(-2 * $w) 0, calc(-3 * $w) 0 #e945e9,
      calc(-4 * $w) 0, calc(-5 * $w) 0 green, calc(-6 * $w) 0, calc(-7 * $w) 0 yellow,
      calc(-8 * $w) 0 #ffa516, calc(-9 * $w) 0 red;
  }
  80% {
    text-shadow: calc(-1 * $w) 0 lightblue, calc(-2 * $w) 0 yellow, calc(-3 * $w) 0 #63fff4,
      calc(-4 * $w) 0 #ffa516, calc(-5 * $w) 0 red, calc(-6 * $w) 0, calc(-7 * $w) 0 grey,
      calc(-8 * $w) 0 #63fff4, calc(-9 * $w) 0;
  }
}
</style>
