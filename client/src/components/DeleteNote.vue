<template lang="pug">
    v-dialog(v-model="dialog" max-width="600")
      template(v-slot:activator="{on}")
        v-btn(color="red white--text" small v-on="on") Удалить
      v-card
        v-card-title.title Вы действительно хотите удалить эту заметку ?
        v-card-actions
          v-spacer
          v-btn(color="green white--text"  small flat @click="hiddenDialog") Нет
          v-btn(color="red white--text" small flat @click="deleteNote") Да

</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      dialog: false,
      alert: {
        show: false,
        status: null,
        title: null
      }
    };
  },
  methods: {
    hiddenDialog() {
      this.dialog = false;
    },
    deleteNote() {
      this.$store.dispatch('notes/deleteNote', this.id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
