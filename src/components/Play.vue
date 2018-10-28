<template>
    <div class="play">
        <div class="load" v-if="isShow"><van-loading color="#7D7D7D" /></div>
        <div v-else>
            <div class="player-box">
                <iframe :src="this.playUrl" frameborder="0" width="100%" height="100%"></iframe>
            </div>
            <div class="oth">
                <p class="title">正在观看：{{ movieTitle }}</p>
                <p class="bot">温馨提示:视频源于第三方网站，加载偏慢请稍等片刻</p>
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
                playUrl:'',
                movieTitle:'',
                isShow:false
            }
        },
        methods: {
            getUrl() {
                this.isShow = true
                this.$axios.get('/play',this.url).then(res =>{
                    if(res.code == 200){
                        this.playUrl = res.data
                        this.isShow = false
                    } 
                })
            }
        },
        created(){
            this.url.url = this.$route.query.url
            this.movieTitle = this.$route.query.title
            this.getUrl()
        }
    }
</script>

<style scoped lang='scss'>
    .load{
        position: fixed;
        left: 46%;
        top: 40%;
    }
    .play{
        width: 6.2rem;
        margin: auto;
        margin-top: 0.1rem;
    }
    .player-box{
        height: 3.5rem;
        border-radius: 5px;
        overflow: hidden;
    }
    .oth{
        .title{
            font-size: 16px;
            border-left: 5px solid #94c8d7;
            padding: 0 5px;
        }
        .bot{
            width: 6.4rem;
            font-size: 12px;
            color: #7d7d7d;
            text-align: center;
            position: fixed;
            bottom: 5px;
        }
    }
</style>