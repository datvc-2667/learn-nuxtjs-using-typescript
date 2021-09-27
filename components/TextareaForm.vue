<template>
  <ValidationProvider v-slot="{ classes, errors }" rules="min:5|required">
    <label for="content" class="block text-xl font-medium text-gray-700" :class="classes"
      >Content</label
    >
    <div class="mt-1">
      <textarea
        id="content"
        :value="value"
        name="content"
        cols="30"
        rows="10"
        placeholder="Enter todo..."
        :class="classes"
        @input="updateValue"
      ></textarea>
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
  @Prop({ type: String, default: '' }) value!: string;

  @Emit('input')
  updateValue(event: HTMLFormElement): string {
    return event.target.value;
  }
}
</script>

<style></style>
