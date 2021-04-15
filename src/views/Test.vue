<template>
  <form class="root">
    <h2>Create account</h2>
    <p>
      <input type="text" placeholder="Email" v-model="email" />
    </p>
    <p>
      <input
        type="password"
        placeholder="Password"
        v-model="password.password"
      />
    </p>
    <p>
      <input
          type="password"
          placeholder="Confirm Password"
          v-model="password.confirm"
      />
    </p>
    <button @click="submitForm">Submit</button>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import  { required } from '@vuelidate/validators'

export default {
  name: 'Test',
  data() {
    return {
      $v: useVuelidate(),
      email: '',
      password: {
        password: '',
        confirm: '',
      }
    }
  },
  validations() {
    return {
      email: { required },
      password: {
        password: { required },
        confirm: { required },
      }
    }
  },
  methods: {
      submitForm() {
        console.log(this.$v)
        //this.$v.$validate() // checks all inputs
        debugger
        if (!this.$v.$error) { // if ANY fail validation
          alert('Form successfully submitted.')
        } else {
          alert('Form failed validation')
        }
    }
  }
}
</script>

<style scoped>
.root {
  width: 400px;
  margin: 0 auto;
  background-color: #fff;
  padding: 30px;
  margin-top: 100px;
  border-radius: 20px;
}

input {
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
  font-size: 1em;
  padding: 5px 0;
  margin: 10px 0 5px 0;
  width: 100%;
}

button {
  background-color: #3498db;
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  color: white;
}
</style>
