## 测试代码

### 测试动态负载均衡的方法
```
用一个简单的测试接口，返回当前启动的 jar 的端口，用来表明当前处理这个请求的是
哪台机器端口对应的 jar，nginx 配置了3个服务来处理这个接口，3个服务由3个不同的端口来处理
```

### 测试负载均衡的一个简单接口
```java
@Api(description = "接口")
@RestController
@RequestMapping(value = "/message")
public class ApiController {

    @Value("${server.port}")
    private String port;

    @ApiOperation(value = "get")
    @GetMapping("/get")
    public String message(){
        System.out.println("message");
        return port;
    }
}

```

### 测试负载均衡的 nginx 配置

```
upstream backends {
	zone zone_for_backends 1m;
   	server 127.0.0.1:8081;
	server 127.0.0.1:8082;
	server 127.0.0.1:8083;
}

server {

	listen       8084;
	server_name  localhost;

	location / {
		
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
		proxy_set_header X-Forwarded-Port $server_port;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header Host $http_host;
		proxy_set_header X-NginX-Proxy true;
		
		proxy_pass http://backends;
	}
	
}

```
