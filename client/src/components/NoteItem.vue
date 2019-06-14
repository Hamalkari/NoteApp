<template lang="pug">
  v-flex(v-if="note" md4 sm6 xs12)
    v-card
      v-card-title.grey
        h3.title.white--text {{ note.title }}
      v-card-text
        .black--text {{ note.body }}
      v-card-actions
        v-spacer
        DeleteNote(:id="note._id")
        UpdateNote(:note="note")
</template>

<script>
import DeleteNote from '@/components/DeleteNote.vue';
import UpdateNote from '@/components/ChangeNote.vue';
export default {
  props: {
    note: {
      type: Object
    }
  },
  components: {
    DeleteNote,
    UpdateNote
  }
};
</script>

<style lang="scss" scoped></style>
