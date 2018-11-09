<template>
    <div class="search">
        <div class="load" v-if="isShow"><van-loading color="#7D7D7D" /></div>
        <div class="offset" v-else>
            <van-list
                v-model="loading"
                :finished="finished"
                @load="onLoad"
                :offset='0'>
                <div v-for="item in searchData" :key="item.id">
                    <div class="box-top" @click="goDetail(item.url)">
                        <div class="img">
                            <img :src="item.img" @error="()=>item.img = require('@/style/img/err.jpg')" alt="">
                        </div>
                        <div class="info">
                            <div>
                                <p  class="movie-name">{{item.title}}</p>
                            </div>
                            <div>
                                <p  class="movie-bot">{{item.state}}</p>
                                <p  class="van-ellipsis movie-bot">{{item.actor}}</p>
                                <p  class="movie-bot">类型：{{item.type}}</p>
                                <p  class="movie-bot">{{item.uptime}}</p>
                            </div>
                        </div>
                    </div> 
                </div>
            </van-list>
        </div>
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShow:false,
                loading: false,
                finished: false,
                value: {
                    keyword:'',
                    id:1
                },
                searchData:[]
            }
        },
        methods: {
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    this.value.id = this.value.id + 1
                    this.$axios.get('/search',this.value).then(res =>{
                        if(res.code == 200){
                            this.searchData = this.searchData.concat(res.data)
                            this.loading = false;
                            console.log(res.data.length);
                            if(res.data.length < 4){
                                this.finished = true;
                            }
                        }
                        
                    })
                }, 500);
            },
            getSearch() {
                this.isShow = true
                this.value.id = 1
                this.$axios.get('/search',this.value).then(res =>{
                    console.log(res);
                    if(res.code == 200){
                        this.isShow = false
                        if(res.data == ''){
                            this.$toast('没有相关数据');
                        }else{
                           this.searchData = res.data
                           if(res.data.length < 4){
                               this.finished = true
                           }
                        }
                    }
                })
            },
            goDetail(url){
                console.log(url);
                this.$router.push({
                    path:'/detail',
                    query:{
                        url
                    }
                })
            }
        },
        created(){
            this.value.keyword = this.$route.params.id
            this.getSearch()
        }
    }
</script>

<style scoped lang='scss'>
    .search{
        width: 6rem;
        margin:2px auto;
        .box-top{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 8px;
            .img{
                width: 1.8rem;
                height: 2.5rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .info{
                width: 4rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: 15px;
                .movie-name{
                    font-size: 13px;
                }
                .movie-bot{
                    font-size: 11px;
                }
                
            }
        }
    }
</style>