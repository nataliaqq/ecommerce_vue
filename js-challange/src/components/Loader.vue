<template>
    <div class="container-loader">
        <div class="lds-dual-ring"></div>
    </div>
</template>

<style scoped>
.container-loader {
    width: 100%;
    text-align: center;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 40px;
  height: 40px;
  margin: 8px;
  border-radius: 50%;
  border: 3px solid grey;
  border-color: grey transparent grey transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
