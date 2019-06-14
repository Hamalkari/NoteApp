<template lang="pug">
  v-app
    v-container(grid-list-md)
      Navbar
      NoteList
</template>

<script>
import NoteList from '@/components/NoteList.vue';
import Navbar from '@/components/Navbar.vue';
export default {
  components: {
    NoteList,
    Navbar
  }
};
</script>

<style lang="scss" scoped></style>
