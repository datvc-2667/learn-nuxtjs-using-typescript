<template>
  <ValidationProvider v-slot="{ classes, errors }" immediate rules="minmax:8,20|required">
    <label :for="labelTitle" class="block text-xl font-medium text-gray-700" :class="classes">{{
      labelTitle | capitalize
    }}</label>
    <div class="mt-1">
      <input
        :id="labelTitle"
        :value="value"
        :name="labelTitle"
        type="text"
        :placeholder="placeholderText"
        class="control"
        :class="classes"
        @input="updateValue"
      />
    </div>
    <span class="text-red-500">{{ errors[0] | capitalize }}</span>
  </ValidationProvider>
</template>

<script lang="ts">
import { ValidationProvider } from 'vee-validate';
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component({
  components: {
    ValidationProvider,
  },
})
export default class LoadingBar extends Vue {
  @Prop({ default: 'Title' }) readonly labelTitle!: string;
  @Prop({ default: 'Enter text...' }) readonly placeholderText!: string;
  @Prop({ default: '' }) value!: string;

  @Emit('input')
  updateValue(event: HTMLFormElement): string {
    return event.target.value;
  }
}
</script>

<style lang="scss" scoped></style>
