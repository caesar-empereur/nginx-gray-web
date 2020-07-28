<template>
    <div>
        <div class="container">

            <el-row :gutter="20">

                <el-col :xs="24" :sm="24" :lg="12">
                    <div id="bar-box" class="chart-wrapper">
                        <div v-html="htmlLeft"></div>
                        <el-col :xs="24" :sm="24" :lg="12">
                            <el-card shadow="always">
                                测试接口的请求地址
                                http://47.113.188.83:8084/message/get
                            </el-card>
                            <el-button type="primary" size="medium" @click="sendRequest">发送请求</el-button>
                        </el-col>
                    </div>
                </el-col>

                <el-col :xs="24" :sm="24" :lg="12">
                    <div id="line-box" class="chart-wrapper">
                        <div v-html="htmlRight"></div>
                    </div>
                </el-col>

            </el-row>
        </div>
    </div>
</template>

<script>
    import {get,post} from '../util/http';
    import showdown from 'showdown';
    import document from '../assets/document.md';
    import testcode from '../assets/testcode.md';

    export default {
        name: 'basetable',
        components: {
            showdown
        },
        data() {
            return {
                resp: '',
                mdLeft: document,
                mdRight: testcode,
                htmlLeft: '',
                htmlRight: ''
            };
        },
        created () {
            let converter = new showdown.Converter();
            this.htmlLeft = converter.makeHtml(this.mdLeft.toString());
            this.htmlRight = converter.makeHtml(this.mdRight.toString());
        },
        methods: {
            sendRequest() {
                window.open("http://47.113.188.83:8084/swagger-ui.html#!/api-controller/messageUsingGET");
            }
        }
    };
</script>
