<template>
  <div class="my-8">
    <ValidationObserver ref="form" v-slot="{ handleSubmit, reset, invalid }">
      <form ref="formTodo" @submit.prevent="handleSubmit(onSubmit)" @reset.prevent="reset">
        <InputForm v-model="todo.title" labelTitle="title" />

        <TextareaForm v-model="todo.content" />

        <SelectForm v-model="todo.status" />

        <CheckboxForm v-model="todo.team" :listOption="listMember" />

        <div class="flex flex-row my-3 gap-3">
          <button
            v-if="$route.params.id"
            class="btn btn-primary"
            :class="{ 'opacity-60': invalid }"
            type="submit"
            :disabled="invalid"
          >
            Update todo
          </button>

          <button
            v-else
            class="btn btn-primary"
            :class="{ 'opacity-60': invalid }"
            type="submit"
            :disabled="invalid"
          >
            Add Todo
          </button>
          <button class="btn btn-primary bg-red-400" type="reset">Reset</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';
import profiles from '~/apollo/queries/profiles';
import createTodo from '~/apollo/mutation/createTodo';
import updateTodo from '~/apollo/mutation/updateTodo';
import todo from '~/apollo/queries/todo';

export default {
  components: {
    ValidationObserver,
  },

  data() {
    return {
      todo: {
        title: '',
        content: '',
        team: [],
        status: 'none',
        projectId: '6143f615d28fa9d72566cb25',
      },
      listMember: [],
    };
  },

  mounted() {
    const id = this.$route.params.id;
    if (!id) return;

    this.$apollo
      .query({
        query: todo,
        variables: {
          id,
          content: this.todo.content.split(/\r?\n/),
        },
      })
      .then(({ data: { todo } }) => {
        const { title, content, team, status, projectId } = todo;
        const member = team.map((person) => person.name);
        const contentString = content.join('\n');
        this.todo = {
          title,
          content: contentString,
          team: member,
          status,
          projectId,
        };
      })
      .catch((error) => {
        this.$toast.show(`Something wrong: ${error}`, {
          type: 'error',
          duration: 8000,
        });
      });
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return;
        }
        if (this.$route.params.id) {
          this.$apollo
            .mutate({
              mutation: updateTodo,
              variables: {
                id: this.$route.params.id,
                ...this.todo,
              },
            })
            .then((data) => {
              this.$toast.show(`Update "${data}" success! 😜😜`, {
                type: 'success',
              });
              // Resetting Values
              this.todo = {
                title: '',
                content: '',
                process: 'none',
                team: [],
              };
              this.$router.push({
                path: '/projects',
              });
            })
            .catch((error) => {
              this.$toast.show(`Something wrong: ${error}`, {
                type: 'error',
              });
            });

          // Wait until the models are updated in the UI
          this.$nextTick(() => {
            this.$refs.formTodo.reset();
          });
        } else {
          this.$apollo
            .mutate({
              mutation: createTodo,
              variables: {
                ...this.todo,
                content: this.todo.content.split(/\r?\n/),
              },
            })
            .then(
              ({
                data: {
                  createTodo: { title },
                },
              }) => {
                this.$toast.show(`Add "${title}" success! 😜😜`, {
                  type: 'success',
                });
              }
            )
            .catch((error) => {
              this.$toast.show(`Something wrong: ${error}`, {
                type: 'error',
              });
            });

          // Resetting Values
          this.todo = {
            title: '',
            content: '',
            process: 'none',
            team: [],
          };

          // Wait until the models are updated in the UI
          this.$nextTick(() => {
            this.$refs.formTodo.reset();
          });

          this.$router.push({
            path: '/projects',
          });
        }
      });
    },
  },
  apollo: {
    profiles: {
      prefetch: true,
      query: profiles,

      result({ data: { profiles }, loading, networkStatus }) {
        this.listMember = profiles;
      },
    },
  },
};
</script>
