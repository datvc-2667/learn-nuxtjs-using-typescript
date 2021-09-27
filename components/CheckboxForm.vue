<template>
  <ValidationProvider
    v-slot="{ classes, errors }"
    rules="required"
    class="flex items-start flex-col w-1/3 my-4"
  >
    <div class="flex flex-row items-center justify-between w-full">
      <p class="text-xl font-medium text-gray-700" :class="classes">{{ labelTitle }}</p>
    </div>
    <div
      v-for="option in listOption"
      :key="option.id"
      class="ml-3 py-0.5 flex flex-row items-center justify-between w-full"
    >
      <label
        :for="option.id"
        class="block text-lg text-gray-900 flex-1 cursor-pointer"
        :class="classes"
      >
        {{ option.name }}
      </label>
      <input
        :id="option.id"
        v-model.lazy="checked"
        name="team"
        :value="option.id"
        type="checkbox"
        @change="updateValue"
      />
    </div>
    <span class="text-red-500">{{ errors[0] | capitalize }}</span>
  </ValidationProvider>
</template>

<script lang="ts">
import { ValidationProvider } from 'vee-validate';
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { LabelTitle } from '~/model/';

@Component({
  components: {
    ValidationProvider,
  },
})
export default class LoadingBar extends Vue {
  checked: [string] = [''];
  @Prop({ type: String, default: 'Team member' }) readonly labelTitle!: string;
  @Prop({
    type: Array,
    default: [
      {
        id: 'cd',
        name: 'CD',
      },
      {
        id: 'td',
        name: 'TD',
      },
    ],
  })
  readonly listOption!: LabelTitle[];

  @Emit('input')
  updateValue() {
    return this.checked;
  }
}
</script>
