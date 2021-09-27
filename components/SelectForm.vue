<template>
  <ValidationProvider
    v-slot="{ classes, errors }"
    rules="oneOf:created,process,completed|required"
    name="state"
  >
    <label for="state" class="block text-xl font-medium text-gray-700">{{ labelTitle }}</label>
    <div class="mt-1">
      <select id="state" :value="value" name="state" :class="classes" @change="updateValue">
        <option value="none" selected>Please Select</option>
        <option value="created">Todo</option>
        <option value="process">In Process</option>
        <option value="completed">Completed</option>
      </select>
      <span class="text-red-500">{{ errors[0] | capitalize }}</span>
    </div>
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
  @Prop({ type: String, default: 'Type' }) readonly labelTitle!: string;
  @Prop({ type: String, default: 'none' }) value!: string;

  @Emit('input')
  updateValue(event: HTMLFormElement): string {
    return event.target.value;
  }
}
</script>

<style></style>
