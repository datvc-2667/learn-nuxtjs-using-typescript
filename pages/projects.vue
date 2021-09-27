<template>
  <div class="todos flex flex-col w-full mt-10">
    <vue-confirm-dialog></vue-confirm-dialog>

    <div class="todos__header flex flex-row justify-between items-center mb-5">
      <h2 class="text-2xl font-medium">{{ $t('projects') }}</h2>

      <div>
        <span>{{ $t('thisWeek') }}</span>
        <i class="fas fa-chevron-down text-sm"></i>
      </div>
    </div>

    <div class="todos__main grid grid-cols-3 gap-6 mb-6 min-h-screen">
      <Todo title="To do" :list-todo="todoCreate" />
      <Todo title="In process" :list-todo="todoProcess" />
      <Todo title="Completed" :list-todo="todoCompleted" />
    </div>
  </div>
</template>

<script lang="ts">
import { ValidationProvider } from 'vee-validate';
import { Vue, Component } from 'vue-property-decorator';
import type { MetaInfo } from 'vue-meta';
import project from '~/apollo/queries/project.graphql';
import { Todo } from '~/model';

@Component({
  components: {
    ValidationProvider,
  },

  head(this: Project): MetaInfo {
    return {
      title: 'Todo',
    };
  },
  apollo: {
    todoByProject: {
      prefetch: true,
      query: project,
      variables() {
        return { projectId: '6143f615d28fa9d72566cb25' };
      },
      result({ data: { todoByProject }, loading, networkStatus }) {
        this.todoByProject = todoByProject;
      },
    },
  },
})
export default class Project extends Vue {
  todoByProject: Todo[] = [];

  created() {
    this.$apollo.queries.todoByProject.refetch();
  }

  get todoCreate() {
    return this.todoByProject.filter((todo: Todo) => todo.status === 'created') || [];
  }

  get todoProcess() {
    return this.todoByProject.filter((todo: Todo) => todo.status === 'process') || [];
  }

  get todoCompleted() {
    return this.todoByProject.filter((todo: Todo) => todo.status === 'completed') || [];
  }
}
</script>

<style lang="scss" scoped></style>
