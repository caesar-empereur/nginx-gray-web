<template>
    <div class="homeBox">
        <el-container style="height: 100%" direction="vertical">

            <el-header style="background-color:#84D9D2">

                <div class="header">
                    <div class="collapse-btn" @click="collapseChage">
                        <i v-if="!collapse" class="el-icon-s-fold"></i>
                        <i v-else class="el-icon-s-unfold"></i>
                    </div>
                    <div class="logo">后台管理系统</div>
                    <div class="header-right">
                        <div class="header-user-con">
                            <el-dropdown>
                                <el-button type="primary">
                                    项目地址<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item><el-link type="success" href="https://github.com/caesar-empereur/vue-admin-web">前端项目地址</el-link></el-dropdown-item>
                                    <el-dropdown-item><el-link type="success" href="https://github.com/caesar-empereur/vue-admin-go">后端项目地址-go版</el-link></el-dropdown-item>
                                    <el-dropdown-item><el-link type="success" href="https://github.com/caesar-empereur/vue-admin-server">后端项目地址-java版</el-link></el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <div class="btn-bell">
                                <el-tooltip
                                        effect="dark"
                                        :content="message?`有${message}条未读消息`:`消息中心`"
                                        placement="bottom">
                                    <router-link to="/tabs">
                                        <i class="el-icon-bell"></i>
                                    </router-link>
                                </el-tooltip>
                                <span class="btn-bell-badge" v-if="message"></span>
                            </div>
                            <div class="user-avator">
                                <img src="../assets/img/img.jpg" />
                            </div>
                            <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                                <span class="el-dropdown-link">
                                    leon
                                    <i class="el-icon-caret-bottom"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </div>
            </el-header>

            <el-container >
                    <el-menu
                        :router="true"
                        :collapse="collapse"
                        :default-active="this.$route.path"
                        background-color="#324157"
                        text-color="#bfcbd9"
                        router>
                        <template v-for="item in routeList">
                            <template v-if="item.subs">
                                <el-submenu :index="item.index" :key="item.index">

                                    <template slot="title">
                                        <i :class="item.icon"></i>
                                        <span slot="title">{{ item.title }}</span>
                                    </template>
                                    <template v-for="subItem in item.subs">
                                        <el-menu-item :index="subItem.index" :key="subItem.index">{{subItem.title }}</el-menu-item>
                                    </template>

                                </el-submenu>
                            </template>

                            <template v-else>
                                <el-menu-item :index="item.index" :key="item.index">
                                    <i :class="item.icon"></i>
                                    <span slot="title">{{item.title}}</span>
                                </el-menu-item>
                            </template>
                        </template>
                    </el-menu>

                <el-container width="80%">
                    <el-main>
                        <transition name="main" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-main>
                </el-container>

            </el-container>

        </el-container>
    </div>
</template>

<script>

import { removeToken } from '../util/auth';

export default {
    data() {
        return {
            collapse: false,
            browserWidth: '',
            routeList: [
                {
                    icon: 'el-icon-s-home',
                    index: 'dashboard',
                    title: '系统首页'
                }
            ],
            fullscreen: false,
            name: 'linxin',
            message: 2
        }
    },
    mounted() {
        window.onresize =()  =>{
             return (()=>{
                   this.browserWidth = window.innerWidth;
             })()
        }
    },
    watch: {
        browserWidth(val) {
            console.log(val);
            if (val<1000){
                this.collapse=true;
            } else {
                this.collapse=false;
            }
        }
    },
    computed: {
        username() {
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        handleCommand(command) {
            if (command == 'loginout') {
                removeToken();
                this.$router.push('/login');
            }
        },
        collapseChage() {
            this.collapse = !this.collapse;
        }
    }
};
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn {
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo {
        float: left;
        width: 250px;
        line-height: 70px;
    }
    .header-right {
        float: right;
        /*padding-right: 50px;*/
    }
    .header-user-con {
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell,
    .btn-fullscreen {
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge {
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell {
        color: #fff;
    }
    .user-name {
        margin-left: 10px;
    }
    .user-avator {
        margin-left: 20px;
    }
    .user-avator img {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .el-dropdown-link {
        color: #fff;
        cursor: pointer;
    }
</style>
