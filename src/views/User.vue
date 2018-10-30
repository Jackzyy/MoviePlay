<template>
    <div>
        <div v-if="isLogin">
            <div class="userInfo">
                <div class="login-out" >
                    <p @click="loginOut">登出</p>
                </div>
                <div class="box">
                    <span class="name">{{ this.userInfo.username }}，Welcome ~</span>
                    <div class="bot">
                        <span class="desc">描述：{{ this.userInfo.desc }}</span>
                        <div class="img">
                            <img src="" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="collections">
                <span>收藏</span>
                <p class="no-collect" v-if="noCollect">还没有任何收藏哦~</p>
                <div class="load" v-if="isShow"><van-loading color="#7D7D7D" /></div>
                <div v-else v-for="item in collections" :key="item.id">
                    <div class="box-top" @click="goDetail(item.url)">
                        <div class="img">
                            <img :src="item.movieInfo.movieImg" alt="">
                        </div>
                        <div class="info">
                            <div>
                                <p  class="movie-name">{{item.movieInfo.movieTitle}}</p>
                            </div>
                            <div>
                                <p  class="movie-bot">{{item.movieInfo.movieState}}</p>
                                <p  class="van-ellipsis movie-bot">{{item.movieInfo.movieActor}}</p>
                                <p  class="movie-bot">类型：{{item.movieInfo.movieType}}</p>
                                <p  class="movie-bot">{{item.movieInfo.movieUptime}}</p>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <div v-else>
            <div class="userInfo">
                <div class="box"></div>
            </div>
            <div class="go-login">
                <div class="box" @click="goLogin">
                    登陆
                </div>
                <div class="box" @click="goReg">
                    注册
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                collections: [],
                isLogin:false,
                isShow:false,
                noCollect:false
            }
        },
        methods: {
            getCollections() {
                this.isShow = true
                this.$axios.get('/collections').then(res =>{
                    // console.log(res);
                    if(res.code == 200){
                        res.data.forEach(item => {
                            this.$axios.get('/detail',{url:item.movieUrl}).then(data =>{
                                if(data.code == 200){
                                    this.collections.push({
                                        movieInfo:data.data.movieInfo,
                                        url:data.Url
                                    })
                                }
                            })
                        });
                        this.isShow = false
                        
                    }
                })
                if(this.collections == []){
                            this.noCollect = true
                        }
            },
            goLogin(){
                this.$router.push('/login')
            },
            goReg(){
                this.$router.push('/register')
            },
            goDetail(url){
                this.$router.push({
                    path:'/detail',
                    query:{
                        url
                    }
                })
            },
            loginOut(){
                sessionStorage.removeItem('vuex')
                this.$store.commit('REMOVE_USERINFO','')
                this.isLogin = false
            }
        },
        computed:mapState([
            'userInfo'
        ]),
        created(){
            if(this.$store.state.userInfo != ''){
                this.isLogin = true
                this.getCollections()
            }
        }
    }
</script>

<style scoped lang='scss'>
    .login-out{
        display: flex;
        justify-content: flex-end;
        p{
            font-size: 13px;
            padding: 10px 0.4rem;
            margin: 0;
            text-align: center;
            border-bottom: 1px solid #fff;
        }
    }
    .no-collect{
        font-size: 12px;
        color: #ccc;
        text-align: center;
        margin-top: 1rem;
    }
    .userInfo{
        margin: 0;
        padding: 0;
        background-color: #A2B3BA;
        color: #fff;
        border-radius: 5px;
        .box{
            width: 6rem;
            height: 3rem;
            margin: auto;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .name{
                font-size: 26px;
                margin-top: 10px;
            }
            .bot{
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                .desc{
                    font-size: 13px;
                }
                .img{
                    width: 1rem;
                    height: 1rem;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    background-color: #ccc;
                }
            }
        }
    }
    .load{
        position: absolute;
        top: 3rem;
        left: 46%;
    }
    .collections{
        width: 6rem;
        margin: auto;
        margin-top: 10px;
        position: relative;
        span{
            font-size: 18px;
            padding: 0 5px;
            border-left: 8px solid #A2B3BA;
        }
    }
    .go-login{
        text-align: center;
        margin-top: 1rem;
        .box{
            margin:10px auto;
            width: 5rem;
            padding: 7px 0;
            background-color: #ccc;
            border-radius: 50px;
        }
    }
    .box-top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.05rem;
        .img{
            width: 1.8rem;
            height: 2.5rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .info{
            width: 3.8rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .movie-name{
                font-size: 16px;
            }
            .movie-bot{
                font-size: 12px;
                // line-height: 1;
            }
            
        }
    }
</style>