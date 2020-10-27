<template>
  <main class="product-page">
    <div class="container">
      <ul class="product-list">
        <ItemCard :item="item" v-for="item in data" :key="item.uuid"/>
      </ul>
      <Pagination />
    </div>
  </main>
</template>

<script>
import ItemCard from './ItemCard'
import Pagination from './Pagination'
import restService from '../api/service'

export default {
  name: 'Main',
  data () {
    return {
      data: []
    }
  },
  components: {
    ItemCard,
    Pagination
  },
  mounted () {
    restService.getStore().then(res => {
      console.log(res)
      this.data = res?.data || []
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
