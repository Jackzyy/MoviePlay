<template>
  <div class="home">
    <form action="">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </form>
    <div class="load" v-if="isShow"><van-loading color="#7D7D7D" /></div>
    <div v-else>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-swipe 
          class="more"
          :autoplay="3000">
          <van-swipe-item v-for="(item, index) in broadcast" :key="index">
            <img @click="goDetail(item.url)" class="swipe" :src="item.img" alt="">
          </van-swipe-item>
        </van-swipe>
        <div class="list">
          <div v-for="movies in homeMovie" :key="movies.id">
            <div class="box">
              <div class="title">
                <p>{{ movies.title }}</p>
                <van-icon class="more" @click="goMore(movies.path)" name="more-o" />
              </div>
              <div class="box-movie">
                <div v-for="item in movies.movie" :key="item.id">
                  <div class="movieInfo" @click="goDetail(item.movieUrl)">
                    <div class="img">
                      <img :src="item.movieImg" @error="()=>item.movieImg = require('@/style/img/err.jpg')" alt="">
                    </div>
                    <div class="van-ellipsis">{{ item.movieName }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        
      </van-pull-refresh>
    </div>
    
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        homeMovie: '',
        broadcast:[],
        value:'',
        isLoading: false,
        isShow:false
      }
    },
    methods: {
      onSearch(){
        if(this.value == ''){
          this.$toast('请输入关键词')
        }else{
          this.$router.push(`/search/${this.value}`)
        }
      },
      goDetail(url){
        this.$router.push({
          path:'/detail',
          query:{
            url
          }
        })
      },
      getHome(){
        this.isShow = true
        this.$axios.get('/home').then(res =>{
          this.homeMovie = res.data.arr,
          this.broadcast = res.data.Broadcast
          this.isShow = false
        })
        
      },

      goMore(path){
        console.log(path);
        this.$router.push(`${path}`)
      },
      onRefresh(){
        setTimeout(() => {
          this.$axios.get('/home').then(res =>{
            this.homeMovie = res.data.arr,
            this.broadcast = res.data.Broadcast
            this.isLoading = false
            this.$toast('数据更新成功')
          })
        }, 500);
      }
    },
    created(){
      this.getHome()
    }
  }
</script>

<style scoped lang='scss'>
  .more{
    font-size: 16px;
  }
  .swipe{
    width: 100%;
  }
  .list{
    margin-top: -8px;
    .box{
      padding: 0 0.2rem;
      border-top: 10px solid #F2F2F2;
      .title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        p{
          font-size: 15px;
          border-left: 8px solid rgb(106, 243, 168);
          padding-left: 8px;
        }
        
      }
      .box-movie{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        .movieInfo{
            width: 1.9rem;
            height: 3.2rem;
            .img{
              width: 100%;
              height: 85%;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .van-ellipsis{
              margin-top: 2px;
              font-size: 12px;
            }
        }
      }
    }
  }
</style>