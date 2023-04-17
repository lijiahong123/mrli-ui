<template>
  <label :class="getCheckbocClass">
    <!-- 复选框 -->
    <input type="checkbox" :disabled="disabled" v-model="value">
    <span>
      <slot />
    </span>
  </label>
</template>

<script>
export default {
  name: 'LCheckbox',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    }

  },
  computed: {
    value: {
      get() {
        return this.checked;
      },
      set(val) {
        if (this.disabled) return;
        this.$emit('change', val)
      }
    },

    getCheckbocClass() {
      return [
        'checkbox',
        this.indeterminate ? 'is-indeterminate' : null,
        this.disabled ? 'disabled' : null
      ]
    }
  }

}
</script>

<style scoped lang="scss">
@import "../../access/base.scss";

.checkbox {
  margin-right: 20px;
  user-select: none;
  cursor: pointer;

  &>span {
    padding-left: 5px;
  }

  &>input[type=checkbox] {
    cursor: pointer;
    position: relative;
    width: 15px;
    height: 15px;
    font-size: 14px;
    vertical-align: bottom;
  }

  &>input[type=checkbox]::after {
    content: ' ';
    position: absolute;
    top: 0;
    color: #000;
    width: 15px;
    height: 15px;
    display: inline-block;
    visibility: visible;
    padding-left: 0px;
    text-align: center;
    border-radius: 3px;
  }

  &>input[type=checkbox]:checked::after {
    content: "✓";
    color: #fff;
    font-size: 13px;
    line-height: 17px;
    font-weight: bold;
    background-color: $--theme-color;

  }

  &.is-indeterminate {
    &>input[type=checkbox]::after {
      content: "-";
      color: #fff;
      font-size: 17px;
      line-height: 14px;
      font-weight: bold;
      background-color: $--theme-color;
    }

    &>input[type=checkbox]:checked::after {
      content: "✓";
      color: #fff;
      font-size: 13px;
      line-height: 17px;
      font-weight: bold;
      background-color: $--theme-color;

    }
  }

  &.disabled {
    opacity: .6;
    cursor: no-drop !important;
  }

}
</style>