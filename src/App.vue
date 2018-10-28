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


</style>
