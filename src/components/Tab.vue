<template>
    <div>
        <van-tabs v-model="active" 
            swipeable 
            sticky 
            :swipe-threshold = 5
            @change="handleGo">
            <van-tab title="首页" ></van-tab>
            <van-tab title="电影"></van-tab>
            <van-tab title="动漫"></van-tab>
            <van-tab title="综艺"></van-tab>
            <van-tab title="电视剧"></van-tab>
            <router-view/>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active:'',
            }
        },
        methods: {
            handleGo(index,title) {
                if(this.active == 0){
                    this.$router.push('/index')
                }else if(this.active == 1){
                    this.$router.push('/movie')
                }else if(this.active == 2){
                    this.$router.push('/Animation')
                }else if(this.active == 3){
                    this.$router.push('/Arts')
                }else if(this.active == 4){
                    this.$router.push('/tv')
                }
            }
        },
        watch:{
            '$route' (to, from){
                // console.log(to);
                this.active = to.meta.active
            }
        },
        created(){
            if(this.$route.meta.active){
                this.active = this.$route.meta.active
            }
        }
    }
</script>

<style scoped>

</style>