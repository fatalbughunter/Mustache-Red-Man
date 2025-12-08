<template>
    <button class="button-gradient" v-on:click="$emit('click', $event)">
        <div class="button-inner">
            <slot></slot>
        </div>
    </button>
</template>

<script>
    export default {
        name: 'ButtonGradient'
    }
</script>

<style scoped>
    button.button-gradient {
        position: relative;
        padding: 1px;
        border: none;
        background: transparent;
        cursor: pointer;
    }

    button.button-gradient::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    button.button-gradient .button-inner {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

