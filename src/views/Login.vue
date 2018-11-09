<template>
    <div class="login">
        <div class="box">
            <van-cell-group>
                <van-field
                    v-model="userInfo.username"
                    required
                    clearable
                    label="用户名"
                    placeholder="请输入用户名"
                />
                <van-field
                    v-model="userInfo.password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
                />
            </van-cell-group>
            <van-button
                :loading='this.isDone'
                type="primary"
                text="登录"
                @click="goLogin"/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: {
                    username:'',
                    password:''
                },
                isDone:false
            }
        },
        methods: {
            goLogin(){
                if(this.userInfo.username == ''){
                    this.$toast.fail('请输入用户名');
                }else if(this.userInfo.password == ''){
                    this.$toast.fail('请输入密码');
                }else{
                    this.isDone = true
                    this.$axios.post('/login',this.userInfo).then(res =>{
                        if(res.code == 200){
                            this.$store.commit('CHANGE_USERINFO',res.data)
                            this.isDone = false
                            this.$toast.success('登陆成功');
                            setTimeout(() => {
                                this.$router.replace('/user')
                            }, 500);
                        }
                    })
                }
            }
            
        },
    }
</script>

<style scoped lang='scss'>
    .login{
        width: 6rem;
        height: 90vh;
        margin: auto;
        position: relative;
    }
    .box{
        height: 200px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
    /deep/ .van-button{
        padding: 0 2rem;
        display: flex;
        margin:30px auto;
        border-radius: 5px;
    }
</style>