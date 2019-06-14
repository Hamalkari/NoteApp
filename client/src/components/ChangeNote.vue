<template lang="pug">
  v-dialog(v-model="dialogShow" max-width="600")
    template(v-slot:activator="{on}")
      v-btn(color="light-green accent-3 white--text" small v-on="on") Изменить
    v-card
      v-card-title.headline Изменить заметку
      v-card-text
        form
          v-container(grid-list-md)
            v-layout(column)
              v-flex
                v-text-field(label="Название заметки" required v-model="title" @blur="$v.title.$touch()" :error-messages="titleErrors")
              v-flex
                v-textarea(label="Описание заметки"  required v-model="body" @blur="$v.body.$touch()" :error-messages="bodyErrors")
      v-card-actions
        v-spacer
        v-btn(class="red white--text" @click="hiddenModal") Закрыть
        v-btn(class="green white--text" @click="updateNote") Сохранить
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin],
  props: {
    note: {
      type: Object
    }
  },
  data() {
    return {
      dialogShow: false,
      title: null,
      body: null
    };
  },
  validations: {
    title: {
      required,
      minLength: minLength(3)
    },
    body: {
      required
    }
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      if (!this.$v.title.required) errors.push('Это обязательное поле');
      if (!this.$v.title.minLength)
        errors.push(
          `Поле должно состоять как минимум из ${
            this.$v.title.$params.minLength.min
          } символов`
        );
      return errors;
    },
    bodyErrors() {
      const errors = [];
      if (!this.$v.body.$dirty) return errors;
      if (!this.$v.body.required) errors.push('Это обязательное поле');
      return errors;
    }
  },
  methods: {
    validateFields() {
      this.$v.$touch();

      return this.$v.$invalid;
    },
    hiddenModal() {
      this.$v.$reset();
      this.title = null;
      this.body = null;
      this.dialogShow = false;
    },
    updateNote() {
      const isInvalid = this.validateFields();
      if (!isInvalid) {
        const payload = {
          _id: this.note._id,
          title: this.title,
          body: this.body
        };
        this.$store.dispatch('notes/updateNote', payload);
        this.hiddenModal();
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
