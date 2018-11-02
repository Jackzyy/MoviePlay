<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    mounted(){
      this.$toast.loading({
          mask: true,
          message: 'Loading...'
      });
    }
  }
</script>


<style lang="scss">
  .load{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
