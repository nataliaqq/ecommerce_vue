<template>
  <div class="hello">
    {{ data }}
  </div>
</template>

<script>
import restService from '../api/service'

export default {
  name: 'Main',
  data () {
    return {
      data: []
    }
  },
  props: {
    mdatasg: String
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
