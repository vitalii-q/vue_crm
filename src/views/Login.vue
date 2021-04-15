<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >Поле Email должно быть заполнено</small>
        <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
        >Введите коректный Email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            class="validate"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid">Password</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <a href="/register">Зарегистрироваться</a>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from "vuelidate/lib/validators";
import useVuelidate from "@vuelidate/core";

export default {
  name: 'login',
  data() {
    return {
      $v: useVuelidate(),
      email: '',
      password: '',
    }
  },
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
  },
  methods: {
    submitHandler() {
      console.log(this.$v)
      //debugger
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.$router.push('/')
    }
  }
}
</script>
