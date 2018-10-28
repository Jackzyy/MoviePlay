<template>
    <div>
        <Header></Header>
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
            Tab
        },
        data() {
            return {
                isTab: ''
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
        }
    }
</script>

<style scoped>

</style>