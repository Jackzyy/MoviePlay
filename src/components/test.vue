<template>
    <div>
        <!-- <div id="dplayer"></div> -->
        <div class="playerbox">
            <iframe width="100%"
            height="500px"
                :src='this.playUrl' frameborder="0" 
                border="0" marginwidth="0" marginheight="0" scrolling="no">
            </iframe>
        </div>
    </div>
</template>

<script>
//     import 'dplayer/dist/DPlayer.min.css'
//     import DPlayer from 'dplayer'
//     export default {
//         data() {
//             return {
//                 url: {
//                     url:''
//                 },
//                 playUrl:''
//             }
//         },
//         methods: {
//             getPlay() {
//                 console.log('11');
//                 this.$axios.get('/play',this.url).then(res =>{
//                     console.log('1',res.playUrl);
//                     this.playUrl = res.playUrl
//                 }).catch(err =>{
//                     console.log(err);
//                 })
//             },
//             Dplayer(){
//                 console.log('monted',this.playUrl);
//                 // let url = 'https://qq.webrtc.win/tv/Pear-Demo-Yosemite_National_Park.mp4'
//                 const dp = new DPlayer({
//                     container: document.getElementById('dplayer'),
//                     screenshot: true,
//                     video: {
//                         // url:'http://v.weishi.qq.com/1006_91f660518e1047b396d4a808502e3331.f20.mp4'
//                         // url:'http://v.youku.com/v_show/id_XMjcwODQxNjQzNg==.html'
//                         url:this.playUrl
//                     }
//                 });
//             }
//         },
//         created(){
//             this.url.url = this.$route.query.url
//             this.getPlay()
//         }
//     }
// </script>

// <style scoped lang='scss'>
//     // .play-box{
//     //     width: 6.2rem;
//     //     height: 4rem;
//     //     margin: auto;
//     // }
// </style>