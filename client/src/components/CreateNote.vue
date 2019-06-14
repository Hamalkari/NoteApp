<template lang="pug">
  v-layout(row justify-center)
      v-dialog(v-model="showDialog" max-width="600px" persistent)
        template(v-slot:activator="{on}")
          v-btn(color="red white--text" v-on="on") Создать заметку
        v-card
          v-card-title
            span.headline Создать заметку
          v-card-text
            form.form
              v-container(grid-list-md)
                v-layout(column)
                  v-flex
                    v-text-field(label="Название заметки" required v-model="title" @blur="$v.title.$touch()" :error-messages="titleErrors")
                  v-flex
                    v-textarea(label="Описание заметки" required v-model="body" @blur="$v.body.$touch()" :error-messages="bodyErrors")
          v-card-actions
            v-spacer
            v-btn(color="error"  @click="hiddenModal") Закрыть
            v-btn(color="success" @click="createNote") Сохранить
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin],
  data() {
    return {
      showDialog: false,
      title: null,
      body: null,
      alert: {
        show: false,
        status: null,
        title: null
      }
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
      if (!this.$v.title.required) errors.push('Это обязательне поле');
      if (!this.$v.title.minLength)
        errors.push(
          `Название должно состоять как минимум из ${
            this.$v.title.$params.minLength.min
          } символов`
        );
      return errors;
    },
    bodyErrors() {
      const errors = [];
      if (!this.$v.body.$dirty) return errors;
      !this.$v.body.required && errors.push('Это обязательное поле');
      return errors;
    }
  },
  methods: {
    hiddenModal() {
      this.clearField();
      this.showDialog = false;
    },
    clearField() {
      this.$v.$reset();
      this.title = null;
      this.body = null;
      this.alert.show = false;
      this.alert.status = null;
      this.alert.title = null;
    },
    checkValidations() {
      this.$v.$touch();

      return !this.$v.$invalid;
    },
    showAlert(status, title) {
      this.alert.show = true;
      this.alert.status = status;
      this.alert.title = title;
    },
    createNote() {
      const isValidate = this.checkValidations();
      if (isValidate) {
        const payload = {
          title: this.title,
          body: this.body
        };
        this.$store
          .dispatch('notes/createNote', payload)
          .then(data => {
            const { status, title } = data;
            this.showAlert(status, title);
          })
          .catch(err => {
            const { status, title } = err;
            this.showAlert(status, title);
          });
        this.hiddenModal();
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
