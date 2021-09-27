import Vue from 'vue';

Vue.filter('capitalize', function (value) {
  if (!value) {
    return '';
  }
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('truncateString', function (value, length, suffix) {
  if (value.length > length) {
    return value.substring(0, length) + suffix;
  } else {
    return value;
  }
});
