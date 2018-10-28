<template>
    <div class="head">
        <van-nav-bar title="影视"
            :left-arrow = 'this.arrow'
            @click-left="onClickLeft">
            <van-icon name="contact" slot="right" />
        </van-nav-bar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                arrow: false
            }
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            }
        },
        watch:{
            '$route' (to, from){
                this.arrow = to.meta.arrow
            }
        },
        created(){
            this.arrow = this.$route.meta.arrow
        }
    }
</script>

<style scoped>

</style>