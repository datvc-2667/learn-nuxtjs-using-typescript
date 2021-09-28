import Vue from 'vue';

Vue.filter('capitalize', function (value: string): string {
  if (!value) {
    return '';
  }
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('truncateString', function (value: string, length: number, suffix: string): string {
  if (value.length > length) {
    return value.substring(0, length) + suffix;
  } else {
    return value;
  }
});
