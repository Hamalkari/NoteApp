<template lang="pug">
  transition-group(tag='v-layout' name="notes").wrap
    Note(v-for="note in notes" :key="note._id" :note="note")
</template>

<script>
import Note from '@/components/NoteItem.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    Note
  },
  computed: {
    ...mapGetters('notes', ['notes'])
  },
  mounted() {
    this.$store.dispatch('notes/getNotes');
  }
};
</script>

<style lang="scss" scoped>
.notes-enter-active {
  transition: all 0.3s;
}
.notes-enter {
  opacity: 0.5;
  transform: translateY(-100px);
}
.notes-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.notes-leave {
  opacity: 1;
  transform: rotateZ(100deg);
}
.notes-leave-to {
  opacity: 0;
  transform: rotateZ(0deg);
}
.notes-leave-active {
  transition: all 1s ease-in;
  position: absolute;
  width: 100%;
  height: 100%;
}
.notes-move {
  transition: all 0.6s ease-in-out 50ms;
}
</style>
