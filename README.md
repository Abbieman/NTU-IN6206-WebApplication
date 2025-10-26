# NTU-IN6206-WebApplication

This project implements a full-stack Bus Card Top-up System.
It consists of:

- Backend: bus-topup-server (Spring Boot)

- Frontend: bus-topup-ui (Vite + React + TypeScript )

- Proxy Layer: Nginx (unify frontend and backend under one domain)

本项目实现了一个完整的 公交卡充值系统（Bus Card Top-up System）。
系统包括：

- 后端：bus-topup-server（Spring Boot）

- 前端：bus-topup-ui（Vite + React + TypeScript）

- 代理层：Nginx（用于统一前后端域名，解决跨域问题）

### Prerequisites

Before running the project, make sure you have the following installed:

| Tool        | Version | Purpose                             |
| ----------- | ------- | ----------------------------------- |
| **Node.js** | 23.11.0 | Frontend runtime                    |
| **npm**     | ≥ 10.x  | Package manager                     |
| **Java**    | 17+     | Run Spring Boot backend             |
| **Maven**   | ≥ 3.8   | Build backend                       |
| **Nginx**   | latest  | Reverse proxy for local integration |

在运行项目前，请确保安装以下环境：
| 工具 | 版本 | 用途 |
| ----------- | ------- | -------------------------- |
| **Node.js** | 23.11.0 | 前端运行环境 |
| **npm** | ≥ 10.x | 包管理器 |
| **Java** | 17+ | 运行 Spring Boot 后端 |
| **Maven** | ≥ 3.8 | 构建后端项目 |
| **Nginx** | 最新版 | 用于本地反向代理和统一访问 |

### bus-topup-server

##### Setup and Run

database, redis and other configuration can be found in application.yml

数据库、Redis 等连接信息可在 application.yml 文件中修改。

```bash
cd bus-topup-server
mvn clean package
mvn spring-boot:run
```

The backend runs by default on: http://localhost:8080

默认运行地址：http://localhost:8080

and the swagger UI is available at: http://localhost:8080/swagger-ui/index.html

Swagger 文档地址：

http://localhost:8080/swagger-ui/index.html

### bus-topup-ui

##### Setup

Node.js version 23.11.0 for compatibility.

请使用 Node.js 版本 23.11.0 以保证兼容性。

```bash
cd bus-topup-ui
npm install
npm run dev
```

open http://localhost:5173 in the browser

启动后访问：http://localhost:5173

### Nginx

if you don not want to use nginx, modify file vite.config.ts to use proxy

如果不使用 Nginx，可以直接修改 vite.config.ts，使用 Vite 内置代理来解决跨域问题

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    // proxy backend requests
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
```

### Setup and Run

modify nginx.conf include to your mime.types path

如果使用 Nginx，修改 nginx.conf 中的 include 为你本机的 mime.types 路径

```conf
include       /opt/homebrew/etc/nginx/mime.types;
```

```bash
nginx -c your/path/to/nginx.conf
```

```bash
nginx -s stop
```

make sure you have rewrite "127.0.0.1 www.bus.topup.com" in your hosts

请确保在 /etc/hosts 文件中加入以下配置："127.0.0.1 www.bus.topup.com"

Runs on: www.bus.topup.com

浏览器访问：http://www.bus.topup.com
