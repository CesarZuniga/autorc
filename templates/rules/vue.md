---
title: Vue
category: Framework
scope: glob
globs: ["**/*.vue"]
---

- Use `<script setup>` with the Composition API in new components.
- Type props and emits explicitly via `defineProps`/`defineEmits` generics.
- Keep reactivity consistent: `ref` for primitives, `reactive` for objects; don't destructure reactive state (use `toRefs`).
- Compute derived data with `computed`; use `watch`/`watchEffect` sparingly and clean up.
- Prefer `v-if`/`v-for` on distinct nodes; always bind a stable `:key` in lists.
- Extract shared logic into composables (`useX`) returning refs, not into mixins.
- Scope styles (`<style scoped>`); keep global CSS intentional.
