<template>
    <div class="login">
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
            
            <van-field
                v-model="userInfo.desc"
                label="签名"
                placeholder="请输入签名"
            />
        </van-cell-group>
        <van-button
            :loading='this.isDone'
            type="primary"
            text="注册"
            @click="goLogin"/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: {
                    username:'',
                    password:'',
                    desc:''
                },
                isDone:false
            }
        },
        methods: {
            goLogin(){
                this.isDone = true
                this.$axios.post('/register',this.userInfo).then(res =>{
                    this.isDone = false
                    if(res.code == 200){
                        this.$toast.success('注册成功');
                        setTimeout(() => {
                            this.$router.replace('/login')
                        }, 500);
                    }else{
                        this.$toast.fail(res.msg);
                    }
                })
            }
            
        },
    }
</script>

<style scoped lang='scss'>
    .login{
        width: 6rem;
        margin: auto;
        margin-top: 3rem;
    }
    /deep/ .van-button{
        padding: 0 2rem;
        display: flex;
        margin:30px auto;
    }
</style>