<template>
  <div class="todo-container todo__item">
    <div class="flex justify-between items-center my-2">
      <h3 class="todo-container-title my-1 font-medium">{{ title }}</h3>
      <span class="bg-green-300 px-1.5 rounded-lg">{{ listTodo.length }}</span>
    </div>
    <button class="btn todo__item--add">
      <i class="fas fa-plus"></i>
    </button>

    <div
      v-for="(todo, index) in listTodo"
      :key="todo.id + index"
      class="todo todo__item--main"
      draggable="true"
    >
      <div :id="todo.id" class="todo-header todo__item-header">
        <h4
          class="font-semibold outline-none cursor-text flex-1"
          contenteditable="true"
          spellcheck="false"
        >
          <span class="notify-status bg-green-500"></span>
          {{ todo.title }}
        </h4>

        <div>
          <button class="mr-2" @click="handleEditTodo(todo.id)">
            <i class="far fa-edit text-green-600"></i>
          </button>

          <button class="mr-2" @click="handleDeleteTodo(todo.id)">
            <i class="far fa-trash-alt text-red-600"></i>
          </button>

          <i class="fas fa-paperclip text-gray-400"></i>
        </div>
      </div>

      <div class="todo__item-content my-3">
        <p
          v-for="text in todo.content"
          :key="text"
          class="my-2 outline-none cursor-text select-none"
          :contenteditable="isEdit"
          spellcheck="false"
          @dblclick="handleOnEditTodo"
        >
          {{ text }}
        </p>
      </div>

      <div class="todo__item-relationship">
        <span
          v-for="member in todo.team"
          :id="member.id"
          :key="member.id"
          class="person-icon todo__item-person whitespace-pre"
          >{{ member.name | truncateName }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ValidationProvider } from 'vee-validate';
import { Vue, Component, Prop } from 'vue-property-decorator';
import deleteTodo from '~/apollo/mutation/deleteTodo.graphql';
import updateStateTodo from '~/apollo/mutation/updateStateTodo.graphql';
import { Todo } from '~/model';

enum StateTodo {
  PENDING = 'To do',
  IN_PROCESS = 'In process',
  DONE = 'Completed',
}

interface DraggableValue {
  state: string;
  id: string;
}

@Component({
  components: {
    ValidationProvider,
  },
  filters: {
    truncateString: (string: string, length: number) => {
      return string.length < length ? string : `${string.slice(0, length - 0)}`;
    },
    truncateName: (string: string) => {
      const splitString = string.split(' ');
      return splitString.map((string) => string[0]).join('');
    },
  },
})
export default class LoadingBar extends Vue {
  @Prop({ type: String, default: 'To do', required: true }) title!: string;
  @Prop({ type: Array, default: 'none', required: true }) listTodo!: Todo[];

  isEdit: boolean = false;
  draggableValue: DraggableValue = {
    state: '',
    id: '',
  };

  handleOnEditTodo() {
    this.isEdit = !this.isEdit;
  }

  handleEditTodo(id: string) {
    this.$router.push({
      path: `/addtodo/${id}`,
    });
  }

  handleDeleteTodo(id: string) {
    this.$confirm({
      title: 'Are you sure?',
      message: `Are you sure you want to delete?`,
      button: {
        no: 'No',
        yes: 'Delete',
      },
      callback: (confirm: boolean) => {
        if (confirm) {
          this.$apollo
            .mutate({
              mutation: deleteTodo,
              variables: {
                id,
              },
            })
            .then(
              ({
                data: {
                  deleteTodo: { title },
                },
              }) => {
                this.$toast.show(`Delete todo: "${title}" success! 🤪`, {
                  type: 'success',
                });
              }
            )
            .catch((error) => {
              this.$toast.show(`Something wrong: "${error}"`, {
                type: 'error',
              });
            });
        }
      },
    });
  }

  handleDropAndDrap() {
    const containers = document.querySelectorAll('.todo-container');
    const draggables = document.querySelectorAll('.todo__item--main');

    const getParent = (element: HTMLFormElement, selector: string) => {
      while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
          return element.parentElement;
        }
        element = element.parentElement;
      }
    };

    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });

      draggable.addEventListener('dragend', (e) => {
        draggable.classList.remove('dragging');
        const containerDragging = getParent(e.target, '.todo-container');
        const titleDragging = containerDragging.querySelector('.todo-container-title').outerText;

        switch (titleDragging) {
          case StateTodo.PENDING:
            this.draggableValue.state = 'created';
            break;
          case StateTodo.IN_PROCESS:
            this.draggableValue.state = 'process';
            break;
          case StateTodo.DONE:
            this.draggableValue.state = 'completed';
            break;
          default:
            this.draggableValue.state = '';
        }

        const { id } = draggable.querySelector('.todo__item-header');
        this.draggableValue.id = id;
        this.$apollo.mutate({
          mutation: updateStateTodo,
          variables: {
            ...this.draggableValue,
          },
        });
      });
    });
    const getDragAfterElement = (container, y) => {
      const draggableElements = [...container.querySelectorAll('.todo__item--main:not(.dragging)')];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    };

    containers.forEach((container) => {
      container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    });
  }

  mounted() {
    this.handleDropAndDrap();
  }
}
</script>

<style lang="scss" scoped>
.todo__item {
  background-color: #e0e8e7;
  &--add {
    // background-color: #bccac1;
    // text-align: center;
    i {
      color: #6aa7b3;
    }
  }
  &-relationship {
    position: relative;
    left: 0;
  }
}
</style>
