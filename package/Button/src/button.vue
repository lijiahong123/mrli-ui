<template>
    <button type="button" :class="getButtonClass" @click="clickBntton">
        <span>
            <slot />
        </span>
    </button>
</template>

<script>
export default {
    name: 'LButton',
    props: {
        type: {
            type: String,
            default: 'default'
        }
    },
    computed: {
        getButtonClass() {
            return ['l-button', `l-button--${this.type}`]
        }
    },
    methods: {
        clickBntton($event) {
            this.$emit('click', $event)
        }
    }
}
</script>

<style lang="scss">
@import "../../access/base.scss";

button {
    outline: none;
    border: none;
    background: transparent;

    &.l-button {
        border: 1px solid transparent;
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        text-align: center;
        box-sizing: border-box;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        border-radius: 4px;
        overflow: hidden;

        &:hover,
        &:focus {
            opacity: .8;
        }

        &:active {
            opacity: 1;
        }

        &.l-button--default {
            border-color: $--base-border-color;
            background: $--default-bgc;
            color: $--base-color;
        }

        &.l-button--success {
            border-color: $--success-border-color;
            background: $--success-bgc;
            color: $--white-color;
        }

        &.l-button--primary {
            border-color: $--primary-border-color;
            background: $--primary-bgc;
            color: $--white-color;
        }

        &.l-button--danger {
            border-color: $--danger-border-color;
            background: $--danger-bgc;
            color: $--white-color;
        }

        &.l-button--waring {
            border-color: $--waring-border-color;
            background: $--waring-bgc;
            color: $--white-color;
        }

        &.l-button--info {
            border-color: $--info-border-color;
            background: $--info-bgc;
            color: $--white-color;
        }
    }
}</style>