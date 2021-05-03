<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
                v-for="category of categories"
                :key="category.id"
                :value="category.id"
            >{{ category.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

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
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators' // валидоторы

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 1,
    current: null
  }),
  validations: { // появляется переменная $v
    title: {required},
    limit: {minValue: minValue(1)}
  },
  watch: {
    current(categoryId) { // наблюдает за изменениями v-model="current"
      // динамическое обновление полей при смене select категории
      const {title, limit} = this.categories.find(category => category.id === categoryId)
      this.title = title
      this.limit = limit
    }
  },
  created() { // вызывается при инициализации компонента
    // задаем стандартную категорию в select
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) { // если форма не валидная, валидируем и останавливаем отправку формы
        this.$v.$touch()
        return
      }

      try {
        const categoryData = { // создаем объект
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData) // передаем объект в запрос
        this.$message('Категория успешно обновлена')
        this.$emit('updated', categoryData) // слушаем событие updated
      } catch (e) {}
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields() // если есть значение уберает летающий label после обновления страницы (materializecss)
  },
  destroyed() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
