// ========================================
// 校园圈 CampusCircle - 数据管理模块
// ========================================

const DataStore = {
    // 存储键名
    KEYS: {
        USERS: 'campus_circle_users',
        CURRENT_USER: 'campus_circle_current_user',
        POSTS: 'campus_circle_posts',
        COMMENTS: 'campus_circle_comments',
        GROUPS: 'campus_circle_groups',
        ACTIVITIES: 'campus_circle_activities',
        NEWS: 'campus_circle_news',
        CHALLENGES: 'campus_circle_challenges',
        LIKES: 'campus_circle_likes'
    },

    // 初始化默认数据
    init() {
        if (!localStorage.getItem(this.KEYS.USERS)) {
            const defaultUsers = [
                {
                    id: 'admin',
                    username: 'admin',
                    password: 'admin123',
                    studentId: '20240001',
                    department: '计算机科学与技术',
                    isAdmin: true,
                    createdAt: Date.now()
                },
                {
                    id: 'user001',
                    username: '小明同学',
                    password: '123456',
                    studentId: '2021010001',
                    department: '计算机科学与技术',
                    isAdmin: false,
                    createdAt: Date.now() - 86400000 * 30,
                    bio: '热爱编程，享受代码的乐趣',
                    interests: ['编程', '游戏', '音乐'],
                    avatar: 'M'
                },
                {
                    id: 'user002',
                    username: '学霸小李',
                    password: '123456',
                    studentId: '2020010002',
                    department: '机械工程',
                    isAdmin: false,
                    createdAt: Date.now() - 86400000 * 20,
                    bio: '每天进步一点点',
                    interests: ['学习', '读书', '运动'],
                    avatar: 'L'
                },
                {
                    id: 'user003',
                    username: '文艺小王',
                    password: '123456',
                    studentId: '2022010003',
                    department: '人文与社会科学',
                    isAdmin: false,
                    createdAt: Date.now() - 86400000 * 10,
                    bio: '喜欢文学和艺术',
                    interests: ['文学', '摄影', '旅行'],
                    avatar: 'W'
                }
            ];
            localStorage.setItem(this.KEYS.USERS, JSON.stringify(defaultUsers));
        }

        if (!localStorage.getItem(this.KEYS.POSTS)) {
            const defaultPosts = [
                {
                    id: 'post001',
                    userId: 'user002',
                    username: '学霸小李',
                    avatar: 'L',
                    content: '今天在图书馆学习了一整天，收获满满！#学习打卡 #考研加油 期末考试马上就要到了，大家一起加油呀！',
                    tags: ['学习打卡', '考研加油'],
                    isAnonymous: false,
                    likes: 42,
                    createdAt: Date.now() - 3600000 * 2,
                    type: 'normal'
                },
                {
                    id: 'post002',
                    userId: 'anonymous',
                    username: '匿名用户',
                    avatar: 'A',
                    content: '食堂的麻辣香锅真的太好吃了！强烈推荐！#美食推荐 #校园美食',
                    tags: ['美食推荐', '校园美食'],
                    isAnonymous: true,
                    likes: 88,
                    createdAt: Date.now() - 3600000 * 5,
                    type: 'normal'
                },
                {
                    id: 'post003',
                    userId: 'user001',
                    username: '小明同学',
                    avatar: 'M',
                    content: '今天完成了一个有趣的项目，把Python爬虫和Flask框架结合起来了，感觉很有成就感！#学霸心得 #编程学习',
                    tags: ['学霸心得', '编程学习'],
                    isAnonymous: false,
                    likes: 65,
                    createdAt: Date.now() - 3600000 * 8,
                    type: 'normal'
                },
                {
                    id: 'post004',
                    userId: 'anonymous',
                    username: '匿名用户',
                    avatar: 'A',
                    content: '每天早起的日子真的很难熬，但是想到梦想又充满动力！#日常分享 #校园生活',
                    tags: ['日常分享', '校园生活'],
                    isAnonymous: true,
                    likes: 56,
                    createdAt: Date.now() - 86400000,
                    type: 'normal'
                },
                {
                    id: 'post005',
                    userId: 'user003',
                    username: '文艺小王',
                    avatar: 'W',
                    content: '校园里的樱花开了，好美啊！春天来了，大家多出去走走吧！#校园风景 #春天',
                    tags: ['校园风景', '春天'],
                    isAnonymous: false,
                    likes: 120,
                    createdAt: Date.now() - 86400000 * 2,
                    type: 'normal'
                }
            ];
            localStorage.setItem(this.KEYS.POSTS, JSON.stringify(defaultPosts));
        }

        if (!localStorage.getItem(this.KEYS.COMMENTS)) {
            const defaultComments = [
                {
                    id: 'comment001',
                    postId: 'post001',
                    userId: 'user001',
                    username: '小明同学',
                    avatar: 'M',
                    content: '一起加油！考研必胜！',
                    createdAt: Date.now() - 3600000
                },
                {
                    id: 'comment002',
                    postId: 'post001',
                    userId: 'user003',
                    username: '文艺小王',
                    avatar: 'W',
                    content: '学霸带带我！',
                    createdAt: Date.now() - 1800000
                },
                {
                    id: 'comment003',
                    postId: 'post003',
                    userId: 'user002',
                    username: '学霸小李',
                    avatar: 'L',
                    content: '太厉害了！求带飞！',
                    createdAt: Date.now() - 3600000 * 6
                }
            ];
            localStorage.setItem(this.KEYS.COMMENTS, JSON.stringify(defaultComments));
        }

        if (!localStorage.getItem(this.KEYS.GROUPS)) {
            const defaultGroups = [
                {
                    id: 'group001',
                    name: 'Python编程小组',
                    description: '热爱Python的同学们聚集地，分享代码、学习经验',
                    category: '学术',
                    members: 156,
                    icon: 'fab fa-python',
                    color: '#3776ab',
                    posts: 89,
                    createdAt: Date.now() - 86400000 * 30
                },
                {
                    id: 'group002',
                    name: '考研交流群',
                    description: '为考研学子提供资料分享、经验交流的平台',
                    category: '学术',
                    members: 324,
                    icon: 'fas fa-graduation-cap',
                    color: '#667eea',
                    posts: 156,
                    createdAt: Date.now() - 86400000 * 60
                },
                {
                    id: 'group003',
                    name: '篮球爱好者',
                    description: '热爱篮球的同学们的聚集地，约球、比赛、健身',
                    category: '运动',
                    members: 98,
                    icon: 'fas fa-basketball',
                    color: '#f59e0b',
                    posts: 45,
                    createdAt: Date.now() - 86400000 * 20
                },
                {
                    id: 'group004',
                    name: '摄影协会',
                    description: '用镜头记录校园美好瞬间，分享摄影技巧',
                    category: '兴趣',
                    members: 67,
                    icon: 'fas fa-camera',
                    color: '#10b981',
                    posts: 78,
                    createdAt: Date.now() - 86400000 * 45
                },
                {
                    id: 'group005',
                    name: '音乐俱乐部',
                    description: '吉他、钢琴、K歌爱好者聚集地',
                    category: '兴趣',
                    members: 82,
                    icon: 'fas fa-music',
                    color: '#ec4899',
                    posts: 34,
                    createdAt: Date.now() - 86400000 * 15
                },
                {
                    id: 'group006',
                    name: '数学爱好者',
                    description: '探索数学之美，解决数学难题',
                    category: '学术',
                    members: 45,
                    icon: 'fas fa-square-root-alt',
                    color: '#8b5cf6',
                    posts: 23,
                    createdAt: Date.now() - 86400000 * 10
                }
            ];
            localStorage.setItem(this.KEYS.GROUPS, JSON.stringify(defaultGroups));
        }

        if (!localStorage.getItem(this.KEYS.ACTIVITIES)) {
            const defaultActivities = [
                {
                    id: 'act001',
                    title: '校园跑步挑战赛',
                    description: '为期一周的校园跑步活动，完成即有机会获得精美礼品',
                    date: Date.now() + 86400000 * 5,
                    location: '南京工业大学操场',
                    organizer: '体育部',
                    participants: 89,
                    maxParticipants: 200,
                    icon: 'fas fa-running',
                    color: '#10b981',
                    status: 'upcoming'
                },
                {
                    id: 'act002',
                    title: '编程马拉松大赛',
                    description: '48小时coding挑战，展示你的编程实力',
                    date: Date.now() + 86400000 * 10,
                    location: '计算机学院报告厅',
                    organizer: '计算机协会',
                    participants: 45,
                    maxParticipants: 100,
                    icon: 'fas fa-code',
                    color: '#667eea',
                    status: 'upcoming'
                },
                {
                    id: 'act003',
                    title: '校园歌手大赛',
                    description: '唱响青春，展现你的音乐才华',
                    date: Date.now() - 86400000 * 3,
                    location: '大学生活动中心',
                    organizer: '文艺部',
                    participants: 156,
                    maxParticipants: 200,
                    icon: 'fas fa-microphone',
                    color: '#ec4899',
                    status: 'end'
                },
                {
                    id: 'act004',
                    title: '摄影展：校园四季',
                    description: '用镜头记录校园的春夏秋冬',
                    date: Date.now() - 86400000 * 7,
                    location: '图书馆展厅',
                    organizer: '摄影协会',
                    participants: 78,
                    maxParticipants: 100,
                    icon: 'fas fa-images',
                    color: '#f59e0b',
                    status: 'end'
                }
            ];
            localStorage.setItem(this.KEYS.ACTIVITIES, JSON.stringify(defaultActivities));
        }

        if (!localStorage.getItem(this.KEYS.NEWS)) {
            const defaultNews = [
                {
                    id: 'news001',
                    title: '关于举办2026年春季校园运动会的通知',
                    content: '学校将于4月15日举办春季运动会，包括田赛、径赛等多个项目，欢迎同学们积极报名参加...',
                    category: '通知',
                    author: '体育部',
                    createdAt: Date.now() - 3600000 * 3,
                    views: 1256,
                    likes: 89
                },
                {
                    id: 'news002',
                    title: '图书馆新增自习座位预约系统',
                    content: '为方便同学们使用图书馆资源，图书馆新增自习座位预约系统，可通过校园网或APP进行预约...',
                    category: '服务',
                    author: '图书馆',
                    createdAt: Date.now() - 86400000,
                    views: 2341,
                    likes: 156
                },
                {
                    id: 'news003',
                    title: '校园美食节即将开幕',
                    content: '为期一周的校园美食节将于下周一开始，各地美食齐聚校园，让同学们不用出校门就能品尝美味...',
                    category: '活动',
                    author: '后勤保障部',
                    createdAt: Date.now() - 86400000 * 2,
                    views: 3456,
                    likes: 234
                },
                {
                    id: 'news004',
                    title: '2026年考研初试成绩公布',
                    content: '2026年硕士研究生招生考试初试成绩现已公布，考生可通过研究生招生信息网查询成绩...',
                    category: '学业',
                    author: '研究生院',
                    createdAt: Date.now() - 86400000 * 5,
                    views: 5678,
                    likes: 123
                },
                {
                    id: 'news005',
                    title: '校园网络升级改造通知',
                    content: '信息中心将对校园网络进行全面升级，预计工期两周，届时可能会有短暂网络中断...',
                    category: '通知',
                    author: '信息中心',
                    createdAt: Date.now() - 86400000 * 3,
                    views: 890,
                    likes: 45
                }
            ];
            localStorage.setItem(this.KEYS.NEWS, JSON.stringify(defaultNews));
        }

        if (!localStorage.getItem(this.KEYS.CHALLENGES)) {
            const defaultChallenges = [
                {
                    id: 'challenge001',
                    name: '七天运动打卡',
                    description: '连续7天完成运动打卡，每天至少30分钟',
                    icon: 'fas fa-running',
                    color: '#10b981',
                    participants: 234,
                    reward: '运动达人手环',
                    duration: '7天'
                },
                {
                    id: 'challenge002',
                    name: '读书分享挑战',
                    description: '在一周内读完一本书，并分享读后感',
                    icon: 'fas fa-book-open',
                    color: '#667eea',
                    participants: 156,
                    reward: '电子阅读券',
                    duration: '7天'
                },
                {
                    id: 'challenge003',
                    name: '每日一单词',
                    description: '每天学习并记忆10个英语单词',
                    icon: 'fas fa-language',
                    color: '#f59e0b',
                    participants: 345,
                    reward: '英语词典',
                    duration: '30天'
                },
                {
                    id: 'challenge004',
                    name: '早起挑战',
                    description: '连续14天早上7点前起床打卡',
                    icon: 'fas fa-sun',
                    color: '#ec4899',
                    participants: 189,
                    reward: '早餐券',
                    duration: '14天'
                }
            ];
            localStorage.setItem(this.KEYS.CHALLENGES, JSON.stringify(defaultChallenges));
        }
    },

    // 获取数据
    get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    // 保存数据
    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // 生成唯一ID
    generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    // 获取所有用户
    getUsers() {
        return this.get(this.KEYS.USERS) || [];
    },

    // 根据ID获取用户
    getUserById(id) {
        const users = this.getUsers();
        return users.find(u => u.id === id);
    },

    // 添加用户
    addUser(user) {
        const users = this.getUsers();
        user.id = this.generateId('user');
        user.createdAt = Date.now();
        user.isAdmin = false;
        users.push(user);
        this.set(this.KEYS.USERS, users);
        return user;
    },

    // 获取当前登录用户
    getCurrentUser() {
        return this.get(this.KEYS.CURRENT_USER);
    },

    // 设置当前登录用户
    setCurrentUser(user) {
        if (user) {
            this.set(this.KEYS.CURRENT_USER, user);
        } else {
            localStorage.removeItem(this.KEYS.CURRENT_USER);
        }
    },

    // 获取所有动态
    getPosts() {
        return this.get(this.KEYS.POSTS) || [];
    },

    // 添加动态
    addPost(post) {
        const posts = this.getPosts();
        post.id = this.generateId('post');
        post.createdAt = Date.now();
        post.likes = 0;
        posts.unshift(post);
        this.set(this.KEYS.POSTS, posts);
        return post;
    },

    // 删除动态
    deletePost(postId) {
        const posts = this.getPosts();
        const filtered = posts.filter(p => p.id !== postId);
        this.set(this.KEYS.POSTS, filtered);
    },

    // 获取所有评论
    getComments() {
        return this.get(this.KEYS.COMMENTS) || [];
    },

    // 获取某条动态的评论
    getCommentsByPostId(postId) {
        const comments = this.getComments();
        return comments.filter(c => c.postId === postId);
    },

    // 添加评论
    addComment(comment) {
        const comments = this.getComments();
        comment.id = this.generateId('comment');
        comment.createdAt = Date.now();
        comments.push(comment);
        this.set(this.KEYS.COMMENTS, comments);
        return comment;
    },

    // 获取所有小组
    getGroups() {
        return this.get(this.KEYS.GROUPS) || [];
    },

    // 获取所有活动
    getActivities() {
        return this.get(this.KEYS.ACTIVITIES) || [];
    },

    // 获取所有新闻
    getNews() {
        return this.get(this.KEYS.NEWS) || [];
    },

    // 获取所有挑战
    getChallenges() {
        return this.get(this.KEYS.CHALLENGES) || [];
    },

    // 格式化时间
    formatTime(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        if (diff < 60000) {
            return '刚刚';
        } else if (diff < 3600000) {
            return Math.floor(diff / 60000) + '分钟前';
        } else if (diff < 86400000) {
            return Math.floor(diff / 3600000) + '小时前';
        } else if (diff < 86400000 * 7) {
            return Math.floor(diff / 86400000) + '天前';
        } else {
            const date = new Date(timestamp);
            return `${date.getMonth() + 1}月${date.getDate()}日`;
        }
    },

    // 格式化日期
    formatDate(timestamp) {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    },

    // 清空所有数据（用于测试）
    clearAll() {
        Object.values(this.KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    }
};

// 导出数据管理模块
window.DataStore = DataStore;
