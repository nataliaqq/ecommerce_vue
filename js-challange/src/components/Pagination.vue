<template>
    <nav class="pagination">
        <ul class="pagination__list">
            <li class="pagination__item" id="arrow-left">
                <a href="#" class="pagination__link" @click="prevPage">
                    <img :src="arrowLeft">
                </a>
            </li>
            <li class="pagination__item" :class="currentPage == page ? 'active' : null" v-for="(page, index) in paginationArray" :key="`${page}-${index}`">
                <a v-if="!isNaN(page)" href="#" class="pagination__link" @click="goToPage(page)">
                    {{ page }}
                </a>
                <span v-if="isNaN(page)">{{ page }}</span>
            </li>
            <li class="pagination__item" id="arrow-right">
                <a href="#" class="pagination__link" @click="nextPage">
                    <img :src="arrowRight">
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
import ArrowLeft from '../assets/svg/arrow-left.svg'
import ArrowRight from '../assets/svg/arrow-right.svg'

export default {
  name: 'Pagination',
  props: {
    lastPage: {
      type: Number,
      default: 10,
      validator (value) {
        return value > 0
      }
    },
    delta: {
      type: Number,
      default: 2,
      validator (value) {
        return value > 0
      }
    }
  },
  data () {
    return {
      arrowLeft: ArrowLeft,
      arrowRight: ArrowRight,
      currentPage: 1,
      firstPage: 1
    }
  },
  computed: {
    // dot pagination. Source: https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
    left () {
      return this.currentPage - this.delta
    },
    right () {
      return this.currentPage + this.delta + 1
    },
    pagesArray () {
      // create array
      return Array.from({ length: this.lastPage }, (_, i) => i + 1)
      // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    dottedPages () {
      // filters for page numbers
      const isLastOrFirstPage = (i) => i === this.firstPage || i === this.lastPage
      const isInCenter = (i) => i >= this.left && i < this.right

      // replace pages to hide with dots
      return this.pagesArray
        .map(pageNum => isLastOrFirstPage(pageNum) || isInCenter(pageNum) ? pageNum : '...')
      // => [1, 2, ..., ..., ..., ..., ..., ..., ..., 10]
    },
    paginationArray () {
      // remove double dots
      return this.dottedPages
        .filter((pageNumOrDots, index) => pageNumOrDots !== this.dottedPages[index - 1])
      // =>  [1, 2  ..., 10]
    }
  },
  methods: {
    nextPage () {
      if (this.currentPage >= this.lastPage) return
      this.goToPage(this.currentPage + 1)
    },
    prevPage () {
      if (this.currentPage <= this.firstPage) return
      this.goToPage(this.currentPage - 1)
    },
    goToPage (newPage) {
      this.currentPage = newPage
      this.$emit('loadPage', this.currentPage)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pagination__list {
    max-width: 400px;
    width: 100%;
    justify-content: space-around;
}
.pagination__item {
    font-size: 16px;
    @media (max-width: 768px) {
        font-size: 14px;
    }
}
.pagination__item {
    &.active {
        font-weight: bold;
    }
}
</style>
