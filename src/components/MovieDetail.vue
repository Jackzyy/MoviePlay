<template>
    <div class="detail">
        <div class="load" v-if="isShow"><van-loading color="#7D7D7D" /></div>
        <div v-else>
            <div class="box-top">
                <div class="img">
                    <img :src="movieInfo.movieImg" alt="">
                </div>
                <div class="info">
                    <p  class="van-ellipsis movie-name">{{movieInfo.movieTitle}}</p>
                    <p  class="movie-bot">{{movieInfo.movieState}}</p>
                    <p  class="van-ellipsis movie-bot">{{movieInfo.movieActor}}</p>
                    <p  class="movie-bot">{{movieInfo.movieType}}</p>
                    <p  class="movie-bot">{{movieInfo.movieDirector}}</p>
                    <p  class="movie-bot">{{movieInfo.movieArea}}</p>
                    <p  class="movie-bot">时间：{{movieInfo.movieUptime}}</p>
                </div>
            </div>
            <div class="summary">
                <p class="summary-title">简介</p>
                <p class="summary-info">{{movieInfo.movieSummary}}</p>
            </div>
            <div class="movie-list">
                <p>剧集</p>
                <div class="list">
                    <div v-for="item in movieInfo.movieList" :key="item.id">
                        <div class="episode" @click="goPlay(item.movieUrl)">
                            {{item.movieTitle}}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
       
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: {
                    url:''
                },
                movieInfo: '',
                isShow:false
            }
        },
        methods: {
            getDetail(){
                this.isShow = true
                this.$axios.get('/detail',this.url).then(res =>{
                    if(res.code == 200){
                        this.movieInfo = res.data.movieInfo
                        this.isShow = false
                    }
                })
            },
            goPlay(url){
                this.$router.push({
                    path:'/play',
                    query:{
                        title:this.movieInfo.movieTitle,
                        url
                    }
                })
            }
        },
        created(){
            this.url.url = this.$route.query.url
            this.getDetail()
        }
    }
</script>

<style scoped lang='scss'>
    .load{
        position: fixed;
        left: 46%;
        top: 40%;
    }
    .detail{
        width: 6rem;
        margin:2px auto;
        margin-bottom: 10px;
        .box-top{
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            .img{
                width: 2.2rem;
                height: 3.3rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .info{
                width: 3.5rem;
                line-height: 3;
                .movie-name{
                    font-size: 16px;
                    margin-top: 0;
                }
                .movie-bot{
                    font-size: 12px;
                    line-height: 1;
                }
                
            }
        }
        .summary{
            .summary-title{
                font-size: 16px;
                padding-left: 8px;
                border-left: 8px solid rgb(106, 243, 168);
            }
            .summary-info{
                font-size: 12px;
                padding:0 8px;
            }
        }
        .movie-list{
            p{
                font-size: 16px;
                padding-left: 8px;
                border-left: 8px solid rgb(106, 243, 168);
            }
            .list{
                display: flex;
                flex-flow: row wrap;
                .episode{
                    width: 1.3rem;
                    padding: 5px 0;
                    margin-left: 0.16rem;
                    margin-top: 0.1rem;
                    text-align: center;
                    font-size: 12px;
                    border-radius: 5px;
                    background-color: #f1f2f3;

                }
            }
        }
    }
</style>