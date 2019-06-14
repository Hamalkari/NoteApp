<template lang="pug">
  section.navbar
    v-layout(justify-center align-center column)
      v-flex.mb-3
        h1.display-3.font-weight-bold.text-uppercase.red--text.text--lighten-1 NoteTracker
        CreateNote
</template>

<script>
import CreateNote from '@/components/CreateNote.vue';
export default {
  components: {
    CreateNote
  }
};
</script>

<style lang="scss" scoped>
.navbar {
}
</style>
