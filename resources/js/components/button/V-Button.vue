<script lang="ts">
import type { PropType } from "vue";
import { computed, defineComponent, h, resolveComponent } from "vue";
type ButtonColor =
  | undefined
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "white";

export default defineComponent({
  props: {
    to: {
      type: [Object, String],
      default: undefined,
    },
    href: {
      type: String,
      default: undefined,
    },
    icon: {
      type: String,
      default: undefined,
    },
    iconCaret: {
      type: String,
      default: undefined,
    },
    color: {
      type: String as PropType<ButtonColor>,
      default: undefined,
      validator: (value: ButtonColor) => {
        if (
          [
            undefined,
            "primary",
            "info",
            "success",
            "warning",
            "danger",
            "white",
          ].indexOf(value) === -1
        ) {
          console.warn(
            `V-Button: invlid "${value}" color. Should be primary, info, success, warning, danger, white or undefined`
          );
          return false;
        }
        return true;
      },
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    fullwidth: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    raised: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    const classes = computed(() => {
      const defaultClasses: any[] = (attrs?.class as any) || [];
      return [
        "px-5 py-2 focus:oultine-none focus:ring text-sm font-medium text-white leading-5",
        ...defaultClasses,
        "button",
        props.disabled && "disabled",
        props.rounded && "rounded-full",
        !props.rounded && "rounded-md",
        props.fullwidth && "w-full",
        props.color && `btn-${props.color}`,

        "btn",
        props.outlined && `btn-outlined`,
      ];
    });
    const isIconify = computed(
      () => props.icon && props.icon.indexOf(":") !== -1
    );
    const isCaretIconify = computed(
      () => props.iconCaret && props.iconCaret.indexOf(":") !== -1
    );

    const getChildrens = () => {
      const childrens = [];
      let iconWrapper;
      if (isIconify.value) {
        const icon = h("i", {
          "aria-hidden": true,
          class: "iconify",
          "data-icon": props.icon,
        });
        iconWrapper = h("span", { class: "icon" }, icon);
      } else if (props.icon) {
        const icon = h("i", { "aria-hidden": true, class: props.icon });
        iconWrapper = h("span", { class: "icon" }, icon);
      }
      let caretWrapper;
      if (isCaretIconify.value) {
        const caret = h("i", {
          "aria-hidden": true,
          class: "iconify",
          "data-icon": props.iconCaret,
        });
        caretWrapper = h("span", { class: "caret" }, caret);
      } else if (props.iconCaret) {
        const caret = h("i", { "aria-hidden": true, class: props.iconCaret });
        caretWrapper = h("span", { class: "caret" }, caret);
      }
      if (iconWrapper) {
        childrens.push(iconWrapper);
      }

      childrens.push(h("span", slots.default?.()));

      if (caretWrapper) {
        childrens.push(caretWrapper);
      }
      return childrens;
    };
    return () => {
      let link;
      if (props.to) {
        return h(
          resolveComponent("RouterLink"),
          {
            ...attrs,
            to: props.to,
            class: ["button", ...classes.value],
          },
          {
            default: getChildrens,
          }
        );
      } else if (props.href) {
        return h(
          "a",
          {
            ...attrs,
            href: props.href,
            class: classes.value,
          },
          {
            default: getChildrens,
          }
        );
      }
      return h(
        "button",
        {
          type: "button",
          ...attrs,
          disabled: props.disabled,
          class: ["button", ...classes.value],
        },
        {
          default: getChildrens,
        }
      );
    };
  },
});
// <button
//   type="button"
//   class="bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
// >
//       Save changes
//     </button>
</script>

<style scoped>
.button {
  transition: all 0.3s;
}

.button .icon svg {
  height: 14px;
  width: 14px;
}
.btn-primary {
  /* background-color: var(--primary); */
  --btn-color: var(--primary);
}

.btn-info {
  --btn-color: var(--info);
}
.btn-success {
  --btn-color: var(--success);
}
.btn-warning {
  --btn-color: var(--warning);
}
.btn-danger {
  --btn-color: var(--danger);
}
.btn-white {
  --btn-color: var(--white);
}
.button:hover {
  opacity: 0.9;
}

.btn {
  background-color: var(--btn-color);
  color: white;
}
.btn.btn-outlined {
  background-color: var(--card-bg);
  border: 1px solid var(--btn-color);
  color: var(--btn-color);
}

.btn.btn-outlined:hover {
  background-color: var(--btn-color);
  border: 1px solid var(--btn-color);
  color: var(--white);
}
</style>
