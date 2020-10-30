<template>
    <nav class="pagination">
        <ul class="pagination__list">
            <li class="pagination__item">
                <a href="#" class="pagination__link" @click="prevPage">
                    <img :src="arrowLeft">
                </a>
            </li>
            <li class="pagination__item" :class="currentPage == page ? 'active' : null" v-for="page in pageArray" :key="page">
                <a v-if="!isNaN(page)" href="#" class="pagination__link" @click="goToPage(page)">
                    {{ page }}
                </a>
                <span v-if="isNaN(page)">{{ page }}</span>
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
import ArrowLeft from '../assets/svg/arrow-left.svg'
import ArrowRight from '../assets/svg/arrow-right.svg'
import { firstPage, lastPage, delta } from '../constants'

export default {
  name: 'Pagination',
  data () {
    return {
      arrowLeft: ArrowLeft,
      arrowRight: ArrowRight,
      currentPage: 1
    }
  },
  computed: {
    // dot pagination. Source: https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
    left () {
      return this.currentPage - delta
    },
    right () {
      return this.currentPage + delta + 1
    },
    range () {
      const range = []

      for (let i = 1; i <= lastPage; i++) {
        const isLastOrFirstPage = i === firstPage || i === lastPage
        const isInCenter = i >= this.left && i < this.right

        if (isLastOrFirstPage || isInCenter) {
          range.push(i)
        }
      }
      return range
    },
    pageArray () {
      const rangeWithDots = []
      let l

      for (const i of this.range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1)
          } else if (i - l !== 1) {
            rangeWithDots.push('...')
          }
        }
        rangeWithDots.push(i)
        l = i
      }
      return rangeWithDots
    }
  },
  methods: {
    nextPage () {
      if (this.currentPage >= this.lastPage) return
      this.currentPage++
      this.$emit('loadPage', this.currentPage)
    },
    prevPage () {
      if (this.currentPage <= this.firstPage) return
      this.currentPage--
      this.$emit('loadPage', this.currentPage)
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
.pagination__item {
    font-size: 16px;
}
.pagination__item {
    &.active {
        font-weight: bold;
    }
}
</style>
