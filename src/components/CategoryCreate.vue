<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: ($v.title.$dirty && !$v.title.required)}"
          >
          <label for="name">Название</label>
          <span
              class="helper-text invalid"
              v-if="$v.title.$dirty && !$v.title.required"
          >
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: ($v.limit.$dirty && !$v.limit.minValue)}"
          >
          <label for="limit">Лимит</label>
          <span
              class="helper-text invalid"
              v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Минимальная значение {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators' // валидоторы

export default {
  data: () => ({
    title: '',
    limit: 1
  }),
  validations: { // появляется переменная $v
    title: {required},
    limit: {minValue: minValue(1)}
  },
  mounted() {
    M.updateTextFields() // если есть значение уберает летающий label после обновления страницы (materializecss)
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = '' // сбрасываем поле
        this.limit = 1 // сбрасываем поле
        this.$v.$reset() // сбрасывает state формы
        this.$message('Категория была создана')
        this.$emit('created', category) // $emit слушает @created в Categories.vue
      } catch (e) {}
    }
  }
}
</script>
