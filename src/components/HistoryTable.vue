<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, index) of records" :key="record.id">
      <td>{{index + 1}}</td>
      <td>{{ record.amount | currency('RUB') }}</td>
      <td>{{ record.date | date('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
            class="white-text badge red"
            :class="[record.typeClass]"
        >{{ record.typeText }}</span>
      </td>
      <td>
        <button
            v-tooltip="'Посмотреть запись'"
            class="btn-small btn"
            @click="$router.push('/record_detail/' + record.id)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array,
    }
  }
}
</script>
