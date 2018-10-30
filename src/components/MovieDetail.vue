<template>
    <div class="detail">
        <div class="load" v-if="isShow"><van-loading color="#7D7D7D" /></div>
        <div v-else>
            <div class="box-top">
                <div class="img">
                    <img :src="movieInfo.movieImg" alt="">
                </div>
                <div class="info">
                    <div>
                        <p  class="van-ellipsis movie-name">{{movieInfo.movieTitle}}</p>
                        <p  class="movie-bot">{{movieInfo.movieState}}</p>
                        <p  class="van-ellipsis movie-bot">{{movieInfo.movieActor}}</p>
                        <p  class="movie-bot">{{movieInfo.movieType}}</p>
                        <p  class="movie-bot">{{movieInfo.movieDirector}}</p>
                        <p  class="movie-bot">{{movieInfo.movieArea}}</p>
                        <p  class="movie-bot">时间：{{movieInfo.movieUptime}}</p>
                    </div>
                    <div class="bot-btn">
                        <div class="coll-btn" @click="goPlay(movieInfo.playSource[0].movieList[0].movieUrl)">立即播放</div>
                        <div class="coll-btn" v-if="!isCollect" @click="goCollect">可收藏</div>
                        <div class="coll-btn-one" v-else @click="cancelCollect">已收藏</div>
                    </div>
                </div>
            </div>
            <div class="summary">
                <p class="summary-title">简介</p>
                <p class="summary-info">{{movieInfo.movieSummary}}</p>
            </div>
            <div class="movie-list">
                <p>剧集</p>
                <div>
                    <van-tabs type='card' color='#FE9B71'>
                        <van-tab v-for="index in movieInfo.playSource" :title="index.title" :key='index.id'>
                            <div class="list" v-for="item in index.movieList" :key="item.id">
                                <div class="episode" @click="goPlay(item.movieUrl)">
                                    {{item.movieTitle}}
                                </div>
                            </div>
                        </van-tab>
                    </van-tabs>
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
                isShow:false,
                collectUrl:'',
                isCollect:false
            }
        },
        methods: {
            getDetail(){
                this.isShow = true
                this.$axios.get('/detail',this.url).then(res =>{
                    if(res.code == 200){
                        this.isShow = false
                        this.movieInfo = res.data.movieInfo
                        this.collectUrl = res.Url
                    }
                })
            },
            getCollect(){
                if(this.$store.state.userInfo != ''){
                    this.$axios.get('/iscollections',{url:this.$route.query.url}).then(res =>{
                        if(res.code == 200){
                            this.isCollect = res.isCollect
                        }
                    })
                }
            },
            goPlay(url){
                // console.log(url);
                this.$router.push({
                    path:'/play',
                    query:{
                        title:this.movieInfo.movieTitle,
                        url
                    }
                })
            },
            goCollect(){
                this.isCollect = !this.isCollect
                this.$axios.post('/collections',{url:this.collectUrl}).then(res =>{
                    // console.log(res);
                })
            },
            cancelCollect(){
                this.isCollect = !this.isCollect
                this.$axios.post('/cancelCollect',{url:this.collectUrl}).then(res =>{
                    // console.log(res);
                })
            }
        },
        created(){
            this.url.url = this.$route.query.url
            this.getDetail()
            this.getCollect()
        }
    }
</script>

<style scoped lang='scss'>
    .bot-btn{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
    .coll-btn{
        width: 40%;
        padding: 6px;
        font-size: 15px;
        border-radius: 5px;
        text-align: center;
        background-color: #44BB00;
        color: #fff;
        border: 1px solid #44BB00;
    }
    .coll-btn-one{
        width: 40%;
        padding: 6px;
        font-size: 15px;
        border-radius: 5px;
        text-align: center;
        background-color: #fff;
        color: #44BB00;
        border: 1px solid #44BB00;
    }
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
                height: 3.5rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .info{
                width: 3.5rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
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
            /deep/ .van-tab__pane{
                    width: 6rem;
                    display: flex;
                    flex-flow: row wrap;
                    margin: auto;
                    margin-top: 10px;
                }
            .list{
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