## vue-admin-web 项目的 web 端


### 项目运行步骤

- 环境配置
    - nginx 的配置
    - 项目 config 目录下的 dev, test, pro 环境的接口地址根据需要配置
    - 操作系统的 host 文件配置
- 运行项目
    - 安装依赖：根目录 npm install 
    - 本地运行：npm run dev
    - 本地打包：npm run build:dev
    - 本地访问 http://localhost:8082/
    - 服务器访问 http://47.113.188.83:8079/
    
- 后端项目地址
    - https://github.com/caesar-empereur/nginx-gray-go
- nginx 配置
```
http {
    include       mime.types;
    default_type  application/octet-stream;

    access_log  logs/access.log;

    keepalive_timeout  65;

    server {
        listen       8079;
        server_name  localhost;

        location / {
            root   /home/app/project/vue/nginx-gray-web/dist;
            index  index.html index.htm;
        }

    }
}

```
