# 🏫 CampusCircle 校园圈 - 论坛搭建完整手册

> 南京工业大学校园社交平台搭建指南 | 2026年最新版

---

## 📋 目录

1. [项目简介](#1-项目简介)
2. [功能特性](#2-功能特性)
3. [技术架构](#3-技术架构)
4. [快速开始](#4-快速开始)
5. [详细安装指南](#5-详细安装指南)
6. [项目结构](#6-项目结构)
7. [功能模块详解](#7-功能模块详解)
8. [部署指南](#8-部署指南)
9. [运维指南](#9-运维指南)
10. [常见问题](#10-常见问题)
11. [开发指南](#11-开发指南)

---

## 1. 项目简介

### 1.1 项目背景

CampusCircle（校园圈）是专为南京工业大学设计的校园社交互动平台，旨在帮助学生在校内建立真实、健康的社交圈。平台集结了交友、学术讨论、活动策划、兴趣小组等多功能模块，让校园生活更加丰富多彩。

### 1.2 项目目标

- 🎯 为学生提供安全、便捷的校园社交平台
- 📚 促进学术交流与资源共享
- 🎉 丰富校园文化活动
- 💬 构建积极向上的网络社区

### 1.3 在线体验

**在线访问地址：** https://cjj4bzfs2sek.space.minimaxi.com

**测试账号：**
| 角色 | 用户名 | 密码 |
|------|--------|------|
| 管理员 | admin | admin123 |
| 普通用户 | 小明同学 | 123456 |

---

## 2. 功能特性

### 2.1 核心功能模块

| 模块 | 功能描述 | 状态 |
|------|----------|------|
| 🔐 用户系统 | 注册、登录、个人资料管理 | ✅ 已完成 |
| 📝 动态社区 | 发布动态、点赞、评论、话题标签 | ✅ 已完成 |
| 🎓 学术小组 | 学习小组、资源分享、学术问答 | ✅ 已完成 |
| 🎪 活动中心 | 活动发布、报名、投票 | ✅ 已完成 |
| 💕 校园交友 | 用户匹配、好友请求、兴趣标签 | ✅ 已完成 |
| 🎮 游戏中心 | 趣味测试、每日挑战、排行榜 | ✅ 已完成 |
| 📰 校园资讯 | 新闻公告、Q&A问答 | ✅ 已完成 |
| 👨‍💼 管理后台 | 用户管理、内容审核、系统设置 | ✅ 已完成 |

### 2.2 特色功能

```markdown
✅ 匿名吐槽区 - 保护隐私的自由发言空间
✅ 话题标签系统 - 便于内容和用户聚合
✅ 兴趣匹配算法 - 帮助用户找到志同道合的朋友
✅ 积分激励机制 - 鼓励用户积极参与社区活动
✅ 响应式设计 - 完美适配手机和电脑端
✅ 即时反馈系统 - 操作结果即时显示
```

---

## 3. 技术架构

### 3.1 前端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| HTML5 | ES6+ | 页面结构 |
| CSS3 | Bootstrap 5.3 | 样式框架 |
| JavaScript | ES6+ | 交互逻辑 |
| Font Awesome | 6.4.0 | 图标库 |
| Noto Sans SC | - | 中文字体 |

### 3.2 后端技术栈（可选升级）

```javascript
// 当前版本：纯前端 + LocalStorage
// 可升级版本：
{
  "后端框架": "Flask / FastAPI / Django",
  "数据库": "SQLite / PostgreSQL / MySQL",
  "用户认证": "JWT / Session",
  "文件存储": "本地 / 阿里云OSS / 七牛云"
}
```

### 3.3 部署架构

```
┌─────────────────────────────────────────────────────┐
│                    用户浏览器                         │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                   CDN / Nginx                       │
│              (静态资源加速分发)                       │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                    Web Server                        │
│              (云服务器/VPS/Serverless)               │
└─────────────────────────────────────────────────────┘
```

---

## 4. 快速开始

### 4.1 环境要求

| 环境 | 最低配置 | 推荐配置 |
|------|----------|----------|
| 操作系统 | Windows 7+ / macOS 10+ / Linux | Windows 10 / macOS 11 |
| 浏览器 | Chrome 80+ / Firefox 75+ / Safari 13+ | 最新版本 |
| 网络 | 1Mbps+ | 10Mbps+ |
| 内存 | 2GB+ | 4GB+ |

### 4.2 一键部署（推荐）

#### 方法一：直接下载使用

```powershell
# 1. 克隆或下载项目
git clone https://github.com/your-username/campus-circle.git

# 2. 进入项目目录
cd campus-circle

# 3. 直接用浏览器打开 index.html
start index.html   # Windows
open index.html    # macOS
xdg-open index.html  # Linux
```

#### 方法二：使用 VS Code Live Server

```powershell
# 1. 安装 VS Code
# 2. 安装 Live Server 扩展
# 3. 右键 index.html -> "Open with Live Server"
```

#### 方法三：Python 简易服务器

```powershell
# 进入项目目录
cd campus-circle

# Python 3
python -m http.server 8080

# 访问 http://localhost:8080
```

### 4.3 验证安装

打开浏览器访问后，你应该能看到：

1. ✅ 导航栏显示"校园圈 CampusCircle"
2. ✅ 首页展示统计数据和热门动态
3. ✅ 可以登录/注册账号
4. ✅ 可以发布动态和点赞

---

## 5. 详细安装指南

### 5.1 Windows 环境安装

#### 步骤 1：安装 Node.js（可选，用于高级开发）

```powershell
# 1. 下载 Node.js
# 访问 https://nodejs.org/ 下载 LTS 版本

# 2. 验证安装
node --version
npm --version

# 3. 安装 npx（用于运行静态服务器）
npm install -g npx
```

#### 步骤 2：安装 Git

```powershell
# 1. 下载 Git
# 访问 https://git-scm.com/ 下载 Windows 版本

# 2. 配置 Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 3. 验证安装
git --version
```

#### 步骤 3：安装 VS Code（推荐编辑器）

```powershell
# 访问 https://code.visualstudio.com/ 下载安装
# 推荐安装扩展：
# - Live Server
# - HTML CSS Support
# - JavaScript (ES6) code snippets
```

### 5.2 macOS 环境安装

```bash
# 1. 安装 Homebrew（如果未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. 安装 Git
brew install git

# 3. 安装 Node.js（可选）
brew install node

# 4. 验证安装
git --version
node --version
```

### 5.3 Linux 环境安装（Ubuntu/Debian）

```bash
# 1. 更新包列表
sudo apt update

# 2. 安装必要工具
sudo apt install git nodejs npm

# 3. 验证安装
git --version
node --version
```

### 5.4 克隆项目到本地

```powershell
# 1. 创建项目目录
mkdir campus-circle
cd campus-circle

# 2. 初始化 Git
git init

# 3. 创建文件结构（参考第6节）

# 4. 或者克隆已有仓库
git remote add origin https://github.com/your-username/campus-circle.git
git pull origin main
```

---

## 6. 项目结构

### 6.1 目录结构

```
campus-circle/
├── index.html              # 主页面入口
├── README.md               # 项目说明文档
├── LICENSE                 # 开源许可证
│
├── css/                    # 样式目录
│   └── styles.css          # 主样式文件 (22KB)
│
├── js/                     # 脚本目录
│   ├── data.js             # 数据管理模块 (20KB)
│   └── app.js              # 应用逻辑 (92KB)
│
├── assets/                 # 资源目录（可选）
│   ├── images/             # 图片资源
│   ├── icons/              # 自定义图标
│   └── documents/          # 文档资料
│
└── docs/                   # 文档目录
    ├── deployment/         # 部署文档
    ├── api/                # API 文档
    └── changelog/          # 更新日志
```

### 6.2 文件说明

#### index.html - 主入口文件

```html
<!-- 核心结构 -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>校园圈 CampusCircle</title>
    <!-- Bootstrap CSS -->
    <!-- Font Awesome -->
    <!-- 自定义样式 -->
</head>
<body>
    <!-- 导航栏 -->
    <nav>...</nav>

    <!-- 主内容区 -->
    <main id="main-content">...</main>

    <!-- 模态框 -->
    <!-- 登录注册 -->
    <!-- 发布动态 -->

    <!-- 页脚 -->
    <footer>...</footer>

    <!-- 脚本 -->
    <!-- Bootstrap JS -->
    <!-- 数据模块 -->
    <!-- 应用逻辑 -->
</body>
</html>
```

#### css/styles.css - 样式文件

主要包含以下样式模块：

```css
/* 1. 变量定义 */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    /* ... */
}

/* 2. 导航栏样式 */
.navbar { ... }

/* 3. 卡片组件 */
.card { ... }

/* 4. 按钮样式 */
.btn { ... }

/* 5. 表单样式 */
.form-control { ... }

/* 6. 响应式设计 */
@media (max-width: 768px) { ... }
```

#### js/data.js - 数据管理模块

```javascript
const DataStore = {
    // 存储键名
    KEYS: { ... },

    // 初始化数据
    init() { ... },

    // 获取数据
    get(key) { ... },

    // 保存数据
    set(key, data) { ... },

    // 用户管理
    getUsers() { ... },
    addUser(user) { ... },

    // 动态管理
    getPosts() { ... },
    addPost(post) { ... },

    // 评论管理
    getComments() { ... },
    addComment(comment) { ... },

    // 工具函数
    formatTime(timestamp) { ... },
    formatDate(timestamp) { ... }
};
```

#### js/app.js - 应用逻辑

```javascript
// 主要模块
1. 认证系统
   - renderAuthSection()
   - handleLogin()
   - handleRegister()
   - handleLogout()

2. 页面渲染
   - navigateTo(page)
   - renderHomePage()
   - renderCommunityPage()
   - renderStudyPage()
   - renderActivitiesPage()
   - renderFriendsPage()
   - renderGamesPage()
   - renderNewsPage()
   - renderProfilePage()
   - renderAdminPage()

3. 交互功能
   - openPostModal()
   - toggleLike()
   - handlePostSubmit()
   - joinGroup()
   - joinActivity()

4. 初始化
   - init()
```

---

## 7. 功能模块详解

### 7.1 用户认证系统

#### 注册流程

```javascript
// 1. 用户填写表单
// 2. 验证输入
// 3. 检查用户名/学号唯一性
// 4. 保存到 LocalStorage
// 5. 提示注册成功

// 验证规则
{
    username: {
        required: true,
        minLength: 2,
        maxLength: 20
    },
    studentId: {
        required: true,
        pattern: /^\d{10}$/  // 10位学号
    },
    department: {
        required: true
    },
    password: {
        required: true,
        minLength: 6
    }
}
```

#### 登录流程

```javascript
// 1. 输入用户名/学号 + 密码
// 2. 查询用户数据
// 3. 验证密码
// 4. 设置当前用户会话
// 5. 更新UI状态
```

### 7.2 动态社区

#### 发布动态

```javascript
// 数据结构
{
    id: "post_xxx",
    userId: "user_xxx",
    username: "用户名",
    avatar: "A",
    content: "动态内容...",
    tags: ["标签1", "标签2"],
    isAnonymous: false,
    likes: 0,
    createdAt: 1234567890
}
```

#### 话题标签系统

```javascript
// 预设话题
const presetTags = [
    "学霸心得",
    "运动打卡",
    "校园活动",
    "日常分享",
    "考研加油",
    "美食推荐"
];

// 用户自定义标签（逗号/空格分隔）
const customTags = input.split(/[,，\s]+/);
```

### 7.3 匿名吐槽区

```javascript
// 匿名配置
{
    isAnonymous: true,
    // 显示"匿名用户"
    username: "匿名用户",
    // 使用特殊图标
    avatar: "anonymous"
}
```

### 7.4 学术小组

```javascript
// 小组数据结构
{
    id: "group_xxx",
    name: "小组名称",
    description: "小组描述",
    category: "学术/兴趣/运动",
    members: 100,
    icon: "fas fa-xxx",
    color: "#667eea",
    posts: 50,
    createdAt: 1234567890
}
```

### 7.5 活动系统

```javascript
// 活动状态
const activityStatus = {
    upcoming: "即将开始",
    ongoing: "进行中",
    end: "已结束"
};

// 活动数据结构
{
    id: "act_xxx",
    title: "活动标题",
    description: "活动描述",
    date: 1234567890,
    location: "活动地点",
    organizer: "主办方",
    participants: 50,
    maxParticipants: 100,
    status: "upcoming"
}
```

### 7.6 校园交友

```javascript
// 用户兴趣匹配
const userInterests = [
    "编程", "游戏", "音乐",
    "摄影", "阅读", "旅行",
    "运动", "美食", "电影"
];

// 匹配算法
function matchUsers(currentUser, allUsers) {
    return allUsers.filter(user => {
        if (user.id === currentUser.id) return false;
        const commonInterests = user.interests.filter(
            interest => currentUser.interests.includes(interest)
        );
        return commonInterests.length > 0;
    });
}
```

### 7.7 游戏挑战系统

```javascript
// 挑战数据结构
{
    id: "challenge_xxx",
    name: "挑战名称",
    description: "挑战描述",
    icon: "fas fa-xxx",
    color: "#10b981",
    participants: 100,
    reward: "奖励名称",
    duration: "7天/14天/30天"
}
```

### 7.8 管理后台

#### 管理员权限

```javascript
const adminFeatures = [
    "查看平台统计数据",
    "管理所有用户",
    "删除任意动态",
    "封禁/解禁用户",
    "管理兴趣小组",
    "系统设置"
];
```

#### 数据统计

```javascript
const platformStats = {
    totalUsers: 100,
    totalPosts: 500,
    totalGroups: 20,
    totalActivities: 50,
    dailyActiveUsers: 30
};
```

---

## 8. 部署指南

### 8.1 静态托管平台部署

#### Netlify 部署

```powershell
# 1. 安装 Netlify CLI
npm install -g netlify-cli

# 2. 登录
netlify login

# 3. 部署
netlify deploy --prod --dir=.

# 4. 访问自动生成的URL
```

#### Vercel 部署

```powershell
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel --prod

# 4. 获取部署URL
```

#### GitHub Pages 部署

```powershell
# 1. 创建仓库
git init
git add .
git commit -m "Initial commit"

# 2. 推送到 GitHub
git remote add origin https://github.com/username/campus-circle.git
git push -u origin main

# 3. 在 GitHub 仓库 Settings -> Pages
#    Source: Deploy from a branch
#    Branch: main / (root)

# 4. 访问 https://username.github.io/campus-circle
```

### 8.2 云服务器部署

#### Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/campus-circle;
    index index.html;

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # 缓存静态资源
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### SSL 证书配置（Let's Encrypt）

```bash
# 1. 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 2. 获取证书
sudo certbot --nginx -d your-domain.com

# 3. 自动续期
sudo certbot renew --dry-run
```

### 8.3 Docker 部署

#### Dockerfile

```dockerfile
FROM nginx:alpine

# 复制文件
COPY . /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动命令
CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    environment:
      - TZ=Asia/Shanghai
    restart: unless-stopped
```

#### 构建和运行

```bash
# 构建镜像
docker build -t campus-circle .

# 运行容器
docker run -d -p 8080:80 --name campus-circle campus-circle

# 查看日志
docker logs -f campus-circle
```

---

## 9. 运维指南

### 9.1 数据备份

```javascript
// 导出数据
function exportData() {
    const data = {
        users: localStorage.getItem('campus_circle_users'),
        posts: localStorage.getItem('campus_circle_posts'),
        comments: localStorage.getItem('campus_circle_comments'),
        exportTime: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], 
                          { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campus-circle-backup-${Date.now()}.json`;
    a.click();
}

// 导入数据
function importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        Object.keys(data).forEach(key => {
            if (key !== 'exportTime'){
                localStorage.setItem(key, data[key]);
            }
        });
        location.reload();
    };
    reader.readAsText(file);
}
```

### 9.2 性能优化

```css
/* 1. CSS 优化 */
- 使用 CSS 变量
- 压缩 CSS 文件
- 使用 CSS containment

/* 2. JavaScript 优化 */
- 延迟加载非关键脚本
- 使用事件委托
- 防抖/节流频繁操作

/* 3. 图片优化 */
- 使用 WebP 格式
- 图片懒加载
- 响应式图片 srcset
```

### 9.3 安全建议

```javascript
// 1. 数据验证
function validateInput(input) {
    const patterns = {
        username: /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,20}$/,
        studentId: /^\d{10}$/,
        password: /^.{6,}$/
    };
    return patterns[username]?.test(input);
}

// 2. XSS 防护
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 3. 防止CSRF（在有后端时）
- 使用 SameSite Cookie
- 验证请求来源
```

---

## 10. 常见问题

### Q1: 无法登录或注册？

**A:** 检查以下几点：
1. 浏览器是否启用了 LocalStorage
2. 是否使用了支持的浏览器（Chrome/Firefox/Safari/Edge）
3. 清除浏览器缓存后重试

```powershell
# 清除缓存快捷键
Chrome: Ctrl+Shift+Delete
Firefox: Ctrl+Shift+Delete
Safari: Cmd+Option+E
```

### Q2: 数据丢失怎么办？

**A:** 本版本使用 LocalStorage 存储数据：
1. 浏览器存储有容量限制（约5MB）
2. 清除浏览器数据会丢失所有内容
3. 建议定期导出备份

### Q3: 如何升级到后端版本？

**A:** 推荐使用以下技术栈：

```javascript
// 方案一：Flask + SQLite
const flaskStack = {
    framework: "Flask",
    orm: "SQLAlchemy",
    database: "SQLite/MySQL",
    auth: "Flask-Login + JWT"
};

// 方案二：Express + MongoDB
const expressStack = {
    framework: "Express.js",
    database: "MongoDB",
    auth: "Passport.js + JWT"
};

// 方案三：Next.js (全栈)
const nextjsStack = {
    framework: "Next.js",
    database: "PostgreSQL (Prisma)",
    auth: "NextAuth.js"
};
```

### Q4: 如何添加新功能？

**A:** 参考以下步骤：

```javascript
// 1. 在 data.js 中添加数据结构
const newFeatureData = {
    id: '',
    name: '',
    // ...
};

// 2. 在 app.js 中添加渲染函数
function renderNewFeature() {
    return `
        <div class="new-feature">
            <!-- HTML 结构 -->
        </div>
    `;
}

// 3. 添加导航入口
'<a class="nav-link" href="#" data-page="newFeature">新功能</a>'

// 4. 绑定路由
case 'newFeature':
    renderNewFeature();
    break;
```

### Q5: 如何自定义主题颜色？

**A:** 修改 css/styles.css 中的 CSS 变量：

```css
:root {
    --primary-color: #667eea;    /* 主色 */
    --secondary-color: #764ba2; /* 辅助色 */
    --accent-color: #f093fb;    /* 强调色 */
    --success-color: #10b981;   /* 成功色 */
    --warning-color: #f59e0b;   /* 警告色 */
    --danger-color: #ef4444;     /* 危险色 */
}
```

---

## 11. 开发指南

### 11.1 开发环境设置

```powershell
# 1. 代码编辑器
- VS Code（推荐）
- WebStorm
- Sublime Text

# 2. 推荐 VS Code 扩展
- Live Server
- Prettier
- ESLint
- HTML CSS Support
- Auto Rename Tag

# 3. 浏览器开发工具
- Chrome DevTools
- Firefox Developer Tools
```

### 11.2 代码规范

```javascript
// 命名规范
const camelCase = 'variableName';     // 变量
const PascalCase = 'ComponentName';   // 组件/类
const SCREAMING_SNAKE = 'CONSTANT';   // 常量
const kebab-case = 'file-name';       // 文件名

// 注释规范
/**
 * 函数描述
 * @param {类型} 参数名 - 参数描述
 * @returns {类型} 返回值描述
 */
function myFunction(param) {
    // 单行注释
    return param;
}
```

### 11.3 测试清单

```markdown
## 功能测试

- [ ] 用户注册
- [ ] 用户登录
- [ ] 发布动态
- [ ] 点赞功能
- [ ] 评论功能
- [ ] 话题标签
- [ ] 匿名发帖
- [ ] 加入小组
- [ ] 活动报名
- [ ] 交友匹配
- [ ] 挑战参与
- [ ] 新闻查看
- [ ] 个人资料编辑
- [ ] 管理员功能

## 兼容性测试

- [ ] Chrome 80+
- [ ] Firefox 75+
- [ ] Safari 13+
- [ ] Edge 80+
- [ ] 移动端 Safari
- [ ] Chrome Mobile

## 响应式测试

- [ ] 1920x1080 桌面
- [ ] 1366x768 笔记本
- [ ] 768x1024 平板
- [ ] 375x667 手机
```

### 11.4 更新日志

#### v1.0.0 (2026-03-29)

- ✅ 完成基础功能开发
- ✅ 实现用户认证系统
- ✅ 动态社区功能
- ✅ 学术小组功能
- ✅ 活动中心功能
- ✅ 校园交友功能
- ✅ 游戏挑战功能
- ✅ 校园资讯功能
- ✅ 管理后台功能
- ✅ 响应式设计

---

## 📞 联系方式

- 📧 邮箱: support@campuscircle.edu.cn
- 🌐 网站: https://campuscircle.edu.cn
- 📱 QQ群: 123456789
- 💬 微信: CampusCircle

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

您可以自由使用、修改和分发本项目，但请保留原作者的版权声明。

---

<div align="center">

**Made with ❤️ for NJTECH students**

**© 2026 南京工业大学 · 校园圈 CampusCircle**

</div>
