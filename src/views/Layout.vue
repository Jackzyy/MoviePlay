<template>
    <div>
        <Header></Header>
        <van-notice-bar
            :text=word
            :scrollable="true"
            left-icon="https://img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
            mode="closeable"
        />
        <Tab v-if="isTab"></Tab>
        <router-view v-else></router-view>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import Tab from '@/components/Tab'
    export default {
        components:{
            Header,
            Tab,
        },
        data() {
            return {
                isTab: '',
                word:''
            }
        },
        methods: {
            getWord() {
                this.$axios.get('https://api.lwl12.com/hitokoto/v1?encode=realjson').then(res =>{
                    // console.log(res);
                    this.word = `${res.text}`
                })
            }
        },
        watch:{
            '$route' (to, from){
                this.isTab = to.meta.isTab
            }
        },
        created(){
            if(this.$route.meta.isTab){
                this.isTab = this.$route.meta.isTab
            }
            this.getWord()
        }
    }
</script>

<style scoped>

</style>