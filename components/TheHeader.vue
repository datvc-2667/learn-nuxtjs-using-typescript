<template>
  <div class="flex flex-row justify-between items-center my-5 text-xl">
    <div class="text-gray-800">
      <label for="search" class="mr-2 cursor-pointer">
        <i class="fas fa-search"></i>
      </label>
      <input
        id="search"
        class="text-gray-300 font-bold focus:text-gray-900 outline-none"
        type="text"
        placeholder="Search"
      />
    </div>
    <ul class="flex flex-row items-center mx-2 list-none">
      <li class="p-2 text-gray-400 font-medium cursor-pointer">
        <i class="far fa-question-circle"></i>
      </li>
      <li class="p-2 notify-bell relative cursor-pointer">
        <i class="far fa-bell"></i>
      </li>
      <li class="flex flex-row items-center mx-3 cursor-pointer">
        <h6 class="mr-2 font-medium">Công Đạt</h6>
        <i class="fas fa-chevron-down text-sm pt-1"></i>
      </li>
      <li class="w-11 h-w-11 overflow-hidden rounded-full mr-4 cursor-pointer">
        <img
          src="https://images.generated.photos/Yj7i8h8Zw-reP9sFKF2kvFKa_f0NlJmdMVxgAB1m4xo/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTUyMzMwLmpwZw.jpg"
          alt="Công Đạt Avatar"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.notify-bell::after {
  content: '';
  position: absolute;
  color: red;
  display: block;
  inset: 0;
  width: 4px;
  height: 4px;
  z-index: 999;
  border-radius: 99999px;
}
</style>
