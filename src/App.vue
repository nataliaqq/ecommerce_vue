<template>
  <div id="app">
    <Main />
  </div>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Main
  }
}
</script>

<style>
html {
    height: 100%;
}

body {
    min-height: 100%;
    margin: 0;

    padding-top: 60px;

    display: flex;
    flex-direction: column;
    flex: 1 0 auto;

    font-family: 'Lato-Regular', sans-serif;
    font-size: 13px;
    text-rendering: optimizeLegibility;

    -moz-osx-font-smoothing: grayscale;  /* Font smoothing tweaks for MacOSx in Gecko */
    -webkit-font-smoothing: antialiased;

    color: #444A59;
    background-color: #f8f8f8;
}

* {
    box-sizing: border-box;
}

h1, p, figure {
    margin: 0;
    font-weight: normal;
}

a,
a:hover,
a:visited{
    text-decoration: none;
    color: #444A59;
}

ul, li {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

button {
    appearance: none;
    border: 0;
}

header,
footer {
    height: 60px;

    display: flex;
    flex-direction: row;
    align-items: center;

    text-transform: uppercase;
    background-color: #ffffff;
}

main {
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
    margin: 30px 0 20px;
}

.container {
    width: 100%;
    max-width: 1240px;
    padding: 0 40px;
    margin: 0 auto;
}

.icon {
    width: 20px;
    height: 20px;
    fill: #d9d9d9;
    transition: .3s fill;
}

.button {
    border: 1px solid #d9d9d9;
    border-radius: 100px;
    background-color: #ffffff;

    cursor: pointer;
    transition: .3s border, .3s color, .3s background-color;
}

.button--primary {
    padding: 13px;

    font-family: 'Lato-Bold', sans-serif;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 1.39px;
}

.button--primary:hover {
    border: 1px solid #444A59;
    color: #ffffff;
    background-color: #444A59;
}

.button--round {
    display: block;
    border-radius: 50%;
}

</style>
