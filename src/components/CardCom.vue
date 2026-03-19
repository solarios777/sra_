<script setup lang="ts">
interface Props {
  bg?: string;
}

// We use withDefaults for proper TS implementation
const props = withDefaults(defineProps<Props>(), {
  bg: 'bg-white' // Modern default: clean white
});
</script>

<template>
  <div
    :class="[
      props.bg,
      'p-8 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300'
    ]"
  >
    <slot></slot>
  </div>
</template>
