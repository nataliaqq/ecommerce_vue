<template>
    <nav class="pagination">
        <ul class="pagination__list">
            <li class="pagination__item">
                <a href="#" class="pagination__link" @click="prevPage">
                    <img :src="arrowLeft">
                </a>
            </li>
            <li class="pagination__item" v-for="page in 10" :key="page">
                <a href="#" class="pagination__link" @click="goToPage(page)">
                    {{ page }}
                </a>
            </li>
            <li class="pagination__item">
                <a href="#" class="pagination__link" @click="nextPage">
                    <img :src="arrowRight">
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
import ArrowLeft from '../assets/svg/arrow-left.svg';
import ArrowRight from '../assets/svg/arrow-right.svg';

export default {
  name: 'Pagination',
  data () {
      return {
          arrowLeft: ArrowLeft,
          arrowRight: ArrowRight,
          currentPage: 1,
          maxPage: 10,
          minPage: 1,
      }
  },
  methods: {
      nextPage () {
          if (this.currentPage >= this.maxPage) return
          this.currentPage++
      },
      prevPage () {
          if (this.currentPage <= this.minPage) return
          this.currentPage--
      },
      goToPage (newPage) {
          this.currentPage = newPage
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
