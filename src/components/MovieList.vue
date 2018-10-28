<template>
    <div class="movie">
        <div class="load" v-if="isShow"><van-loading color="#7D7D7D" /></div>
        <div v-else>
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    @load="onLoad"
                    :offset='0'>

                    <div class="box-movie">
                        <div v-for="item in movies" :key="item.id">
                            <div class="movieInfo" @click="goDetail(item.movieUrl)">
                                <div class="img">
                                    <img :src="item.movieImgUrl" alt="">
                                    <span class="score">{{item.movieScore}}</span>
                                    <span class="clarity">{{ item.movieClarity }}</span>
                                </div>
                                <div class="van-ellipsis title">{{ item.movieTitle }}</div>
                                <div class="van-ellipsis actor">{{ item.movieArea }}</div>
                            </div>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isLoading:false,
                isShow:false,
                loading: false,
                finished: false,
                movieConfig:{
                    type:'',
                    id:1,
                    kind:'hits'
                },
                movies:[]
            }
        },
        methods: {
             onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    this.movieConfig.id = this.movieConfig.id + 1
                    this.$axios.get('/movie',this.movieConfig).then(res =>{
                        if(res.code == 200){
                            this.movies = this.movies.concat(res.data)
                            this.loading = false;
                            if(res.data.length < 23){
                                this.finished = true;
                            }
                        }
                        
                    })
                }, 500);
            },
            getMovie() {
                this.isShow = true
                this.$axios.get('/movie',this.movieConfig).then(res =>{
                    this.movies = res.data
                    this.isShow = false
                })
            },
            goDetail(url){
                this.$router.push({
                    path:'/detail',
                    query:{
                        url
                    }
                })
            },
            onRefresh(){
                setTimeout(() => {
                    this.movieConfig.id = 1
                    this.$axios.get('/movie',this.movieConfig).then(res =>{
                        this.movies = res.data
                        this.isLoading = false
                        this.$toast('数据更新成功')
                    })
                }, 500);
            }
        },
        watch:{
            '$route' (to, from){
                this.movieConfig.id = 1
                this.movieConfig.type = to.meta.type
                this.getMovie()
            }
        },
        created(){
            this.movieConfig.type = this.$route.meta.type
            this.getMovie()
        }
    }
</script>

<style scoped lang='scss'>
    .load{
        position: fixed;
        left: 46%;
        top: 40%;
    }
    .movie{
        width: 6rem;
        margin:10px auto;
    }
    .box-movie{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }
    .movieInfo{
        width: 1.9rem;
        height: 3.5rem;
        .img{
            width: 100%;
            height: 80%;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
            .score{
                width: 0.5rem;
                text-align: center;
                border-radius: 5px;
                font-size: 12px;
                position: absolute;
                top: 1px;
                right: 1px;
                background-color: #94c8d7;
            }
            .clarity{
                padding: 0 3px;
                border-radius: 5px;
                font-size: 12px;
                text-align: center;
                background-color: #ccc;
                position: absolute;
                left: 1px;
                bottom: 1px;
                opacity: 0.9;
            }
        }
        .title{
            font-size: 12px;
            margin-top: 2px;
        }
        .actor{
            font-size: 10px;
            color: #ACACAC;
            margin-top: 1px;
        }
    }
</style>