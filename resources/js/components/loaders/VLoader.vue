<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
    style="background-color: rgba(0, 0, 0, 0.025); z-index: 1"
  >
    <div class="loading" key="itemLoading"></div>
  </div>
</template>

<style scoped>
.loading {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid #41b88345; /*rgba($theme-color-1, 0.2);*/
  border-radius: 50%;
  border-top-color: var(--primary);
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  /* left: calc(50% - 15px);
  top: calc(50% - 15px); */
  /* position: fixed; */
  z-index: 10;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
