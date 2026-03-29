// ========================================
// 校园圈 CampusCircle - 主应用逻辑
// ========================================

(function() {
    'use strict';

    // 初始化数据
    DataStore.init();

    // 当前页面状态
    let currentPage = 'home';
    let currentUser = DataStore.getCurrentUser();

    // DOM 元素
    const mainContent = document.getElementById('main-content');
    const authSection = document.getElementById('auth-section');
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    const postModal = new bootstrap.Modal(document.getElementById('postModal'));
    const userMenuModal = new bootstrap.Modal(document.getElementById('userMenuModal'));
    const toastElement = document.getElementById('toast');

    // ========================================
    // 工具函数
    // ========================================

    function showToast(message, type = 'success') {
        const toastMessage = document.getElementById('toastMessage');
        const toastIcon = document.getElementById('toastIcon');
        
        toastMessage.textContent = message;
        
        if (type === 'success') {
            toastIcon.className = 'fas fa-check-circle text-success me-2';
        } else if (type === 'error') {
            toastIcon.className = 'fas fa-times-circle text-danger me-2';
        } else if (type === 'warning') {
            toastIcon.className = 'fas fa-exclamation-circle text-warning me-2';
        }
        
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
    }

    function getInitials(name) {
        return name.charAt(0).toUpperCase();
    }

    // ========================================
    // 认证相关
    // ========================================

    function renderAuthSection() {
        if (currentUser) {
            authSection.innerHTML = `
                <div class="user-avatar-btn" id="userMenuBtn" title="${currentUser.username}">
                    <i class="fas fa-user"></i>
                </div>
            `;
            
            document.getElementById('userMenuBtn').addEventListener('click', () => {
                userMenuModal.show();
                document.getElementById('menuUsername').textContent = currentUser.username;
                document.getElementById('menuUserDept').textContent = currentUser.department || '南京工业大学';
                
                const adminLink = document.getElementById('goToAdmin');
                if (currentUser.isAdmin) {
                    adminLink.style.display = 'block';
                } else {
                    adminLink.style.display = 'none';
                }
            });
        } else {
            authSection.innerHTML = `
                <div class="auth-buttons d-flex gap-2">
                    <button class="btn btn-login" data-bs-toggle="modal" data-bs-target="#loginModal">
                        <i class="fas fa-sign-in-alt me-1"></i>登录
                    </button>
                    <button class="btn btn-register" data-bs-toggle="modal" data-bs-target="#registerModal">
                        <i class="fas fa-user-plus me-1"></i>注册
                    </button>
                </div>
            `;
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        const users = DataStore.getUsers();
        const user = users.find(u => 
            (u.username === username || u.studentId === username) && u.password === password
        );
        
        if (user) {
            currentUser = user;
            DataStore.setCurrentUser(user);
            loginModal.hide();
            renderAuthSection();
            showToast(`欢迎回来，${user.username}！`);
            renderPage(currentPage);
        } else {
            showToast('用户名或密码错误', 'error');
        }
    }

    function handleRegister(e) {
        e.preventDefault();
        
        const username = document.getElementById('regUsername').value;
        const studentId = document.getElementById('regStudentId').value;
        const department = document.getElementById('regDepartment').value;
        const password = document.getElementById('regPassword').value;
        const passwordConfirm = document.getElementById('regPasswordConfirm').value;
        
        if (password !== passwordConfirm) {
            showToast('两次密码输入不一致', 'error');
            return;
        }
        
        const users = DataStore.getUsers();
        if (users.some(u => u.username === username)) {
            showToast('用户名已存在', 'error');
            return;
        }
        
        if (users.some(u => u.studentId === studentId)) {
            showToast('学号已注册', 'error');
            return;
        }
        
        const newUser = {
            username,
            studentId,
            department,
            password,
            avatar: getInitials(username)
        };
        
        DataStore.addUser(newUser);
        registerModal.hide();
        showToast('注册成功，请登录！');
        document.getElementById('loginUsername').value = username;
        loginModal.show();
    }

    function handleLogout() {
        currentUser = null;
        DataStore.setCurrentUser(null);
        userMenuModal.hide();
        renderAuthSection();
        showToast('已退出登录');
        navigateTo('home');
    }

    // ========================================
    // 页面导航
    // ========================================

    function navigateTo(page) {
        currentPage = page;
        
        // 更新导航高亮
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });
        
        renderPage(page);
    }

    function renderPage(page) {
        switch(page) {
            case 'home':
                renderHomePage();
                break;
            case 'community':
                renderCommunityPage();
                break;
            case 'study':
                renderStudyPage();
                break;
            case 'activities':
                renderActivitiesPage();
                break;
            case 'friends':
                renderFriendsPage();
                break;
            case 'games':
                renderGamesPage();
                break;
            case 'news':
                renderNewsPage();
                break;
            case 'profile':
                renderProfilePage();
                break;
            case 'admin':
                renderAdminPage();
                break;
            default:
                renderHomePage();
        }
    }

    // ========================================
    // 首页
    // ========================================

    function renderHomePage() {
        const posts = DataStore.getPosts().slice(0, 5);
        const groups = DataStore.getGroups().slice(0, 4);
        const activities = DataStore.getActivities().filter(a => a.status === 'upcoming');
        const users = DataStore.getUsers().filter(u => !u.isAdmin).slice(0, 6);
        
        mainContent.innerHTML = `
            <!-- 页头 -->
            <div class="page-header">
                <div class="container">
                    <h1><i class="fas fa-graduation-cap me-2"></i>欢迎来到校园圈</h1>
                    <p>连接校园，共享青春 - 南京工业大学专属社交平台</p>
                </div>
            </div>
            
            <!-- 统计卡片 -->
            <div class="container">
                <div class="stats-section">
                    <div class="row g-4">
                        <div class="col-md-3 col-6">
                            <div class="stat-card fade-in">
                                <div class="stat-icon purple"><i class="fas fa-users"></i></div>
                                <div class="stat-number">${DataStore.getUsers().length}</div>
                                <div class="stat-label">注册用户</div>
                            </div>
                        </div>
                        <div class="col-md-3 col-6">
                            <div class="stat-card fade-in" style="animation-delay: 0.1s">
                                <div class="stat-icon pink"><i class="fas fa-comments"></i></div>
                                <div class="stat-number">${DataStore.getPosts().length}</div>
                                <div class="stat-label">动态总数</div>
                            </div>
                        </div>
                        <div class="col-md-3 col-6">
                            <div class="stat-card fade-in" style="animation-delay: 0.2s">
                                <div class="stat-icon green"><i class="fas fa-users-circle"></i></div>
                                <div class="stat-number">${DataStore.getGroups().length}</div>
                                <div class="stat-label">兴趣小组</div>
                            </div>
                        </div>
                        <div class="col-md-3 col-6">
                            <div class="stat-card fade-in" style="animation-delay: 0.3s">
                                <div class="stat-icon blue"><i class="fas fa-calendar-check"></i></div>
                                <div class="stat-number">${activities.length}</div>
                                <div class="stat-label">精彩活动</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 快捷入口 -->
            <div class="container mt-5">
                <h4 class="mb-4"><i class="fas fa-th-large me-2 text-primary"></i>快捷入口</h4>
                <div class="row g-4">
                    <div class="col-md-3" onclick="navigateTo('community')">
                        <div class="feature-card">
                            <div class="feature-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                                <i class="fas fa-comments"></i>
                            </div>
                            <h5>动态社区</h5>
                            <p>分享校园生活，记录美好瞬间</p>
                        </div>
                    </div>
                    <div class="col-md-3" onclick="navigateTo('study')">
                        <div class="feature-card">
                            <div class="feature-icon" style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);">
                                <i class="fas fa-book"></i>
                            </div>
                            <h5>学术小组</h5>
                            <p>加入学习小组，共享学习资源</p>
                        </div>
                    </div>
                    <div class="col-md-3" onclick="navigateTo('activities')">
                        <div class="feature-card">
                            <div class="feature-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                            <h5>活动中心</h5>
                            <p>参与校园活动，丰富课余生活</p>
                        </div>
                    </div>
                    <div class="col-md-3" onclick="navigateTo('friends')">
                        <div class="feature-card">
                            <div class="feature-icon" style="background: linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%);">
                                <i class="fas fa-heart"></i>
                            </div>
                            <h5>校园交友</h5>
                            <p>认识新朋友，拓展社交圈</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 最新动态 -->
            <div class="container mt-5">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h4><i class="fas fa-fire me-2 text-danger"></i>热门动态</h4>
                            <a href="#" class="btn btn-sm btn-outline-primary" onclick="navigateTo('community'); return false;">查看更多</a>
                        </div>
                        ${posts.map(post => renderPostCard(post)).join('')}
                    </div>
                    
                    <div class="col-lg-4">
                        <!-- 热门话题 -->
                        <div class="sidebar-card mb-4">
                            <h6><i class="fas fa-hashtag me-2 text-primary"></i>热门话题</h6>
                            <div class="topic-tag" onclick="filterByTag('学习打卡')">#学习打卡</div>
                            <div class="topic-tag" onclick="filterByTag('考研加油')">#考研加油</div>
                            <div class="topic-tag" onclick="filterByTag('校园美食')">#校园美食</div>
                            <div class="topic-tag" onclick="filterByTag('运动打卡')">#运动打卡</div>
                            <div class="topic-tag" onclick="filterByTag('校园风景')">#校园风景</div>
                            <div class="topic-tag" onclick="filterByTag('日常分享')">#日常分享</div>
                        </div>
                        
                        <!-- 热门小组 -->
                        <div class="sidebar-card mb-4">
                            <h6><i class="fas fa-users me-2 text-primary"></i>热门小组</h6>
                            ${groups.map(group => `
                                <div class="group-card" style="padding: 1rem; margin-bottom: 0.5rem;">
                                    <div class="d-flex align-items-center">
                                        <div style="width: 40px; height: 40px; border-radius: 8px; background: ${group.color}; display: flex; align-items: center; justify-content: center; color: white; margin-right: 0.75rem;">
                                            <i class="${group.icon}"></i>
                                        </div>
                                        <div>
                                            <h6 style="margin-bottom: 0.1rem; font-size: 0.9rem;">${group.name}</h6>
                                            <span class="members"><i class="fas fa-user me-1"></i>${group.members}人</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- 活跃用户 -->
                        <div class="sidebar-card">
                            <h6><i class="fas fa-star me-2 text-warning"></i>活跃用户</h6>
                            <div class="row g-2">
                                ${users.map(user => `
                                    <div class="col-4 text-center">
                                        <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; margin: 0 auto;">
                                            ${user.avatar || getInitials(user.username)}
                                        </div>
                                        <small style="font-size: 0.75rem;">${user.username.substring(0, 4)}</small>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="height: 2rem;"></div>
        `;
    }

    // ========================================
    // 动态社区
    // ========================================

    function renderCommunityPage() {
        const posts = DataStore.getPosts();
        
        mainContent.innerHTML = `
            <div class="page-header">
                <div class="container">
                    <h1><i class="fas fa-comments me-2"></i>动态社区</h1>
                    <p>分享你的校园生活，与同学们互动交流</p>
                </div>
            </div>
            
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <!-- 发布入口 -->
                        ${currentUser ? `
                            <div class="post-card mb-4" style="cursor: pointer;" onclick="openPostModal()">
                                <div class="d-flex align-items-center">
                                    <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; margin-right: 0.75rem;">
                                        ${currentUser.avatar || getInitials(currentUser.username)}
                                    </div>
                                    <div style="flex: 1; padding: 0.75rem 1rem; background: #f3f4f6; border-radius: 20px; color: #6b7280;">
                                        分享你的想法...
                                    </div>
                                </div>
                            </div>
                        ` : `
                            <div class="post-card mb-4 text-center py-4">
                                <p class="text-muted mb-3">登录后即可发布动态</p>
                                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
                                    <i class="fas fa-sign-in-alt me-1"></i>登录发布
                                </button>
                            </div>
                        `}
                        
                        <!-- 动态列表 -->
                        <div id="postsContainer">
                            ${posts.length > 0 ? posts.map(post => renderPostCard(post)).join('') : renderEmptyState('暂无动态', '快来发布第一条动态吧！', 'fa-comments')}
                        </div>
                    </div>
                    
                    <div class="col-lg-4">
                        <!-- 话题分类 -->
                        <div class="sidebar-card mb-4">
                            <h6><i class="fas fa-hashtag me-2 text-primary"></i>话题分类</h6>
                            <div class="topic-tag active" onclick="filterByTag('')">全部</div>
                            <div class="topic-tag" onclick="filterByTag('学习打卡')">#学习打卡</div>
                            <div class="topic-tag" onclick="filterByTag('考研加油')">#考研加油</div>
                            <div class="topic-tag" onclick="filterByTag('校园美食')">#校园美食</div>
                            <div class="topic-tag" onclick="filterByTag('运动打卡')">#运动打卡</div>
                            <div class="topic-tag" onclick="filterByTag('日常分享')">#日常分享</div>
                            <div class="topic-tag" onclick="filterByTag('学霸心得')">#学霸心得</div>
                        </div>
                        
                        <!-- 匿名吐槽区 -->
                        <div class="sidebar-card" style="background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);">
                            <h6><i class="fas fa-mask me-2 text-secondary"></i>匿名吐槽</h6>
                            <p class="text-muted small mb-3">在这里你可以自由地分享想法</p>
                            ${currentUser ? `
                                <button class="btn btn-secondary w-100 mb-3" onclick="openAnonymousPost()">
                                    <i class="fas fa-edit me-1"></i>匿名吐槽
                                </button>
                            ` : `
                                <p class="text-center small"><a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">登录</a>后即可匿名吐槽</p>
                            `}
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="height: 2rem;"></div>
        `;
    }

    function renderPostCard(post) {
        const comments = DataStore.getCommentsByPostId(post.id);
        const commentsHtml = comments.length > 0 ? `
            <div class="comment-section">
                ${comments.slice(0, 2).map(comment => `
                    <div class="comment-item">
                        <div class="comment-avatar">${comment.avatar || getInitials(comment.username)}</div>
                        <div class="comment-content">
                            <span class="comment-author">${comment.username}</span>
                            <span class="comment-text">${comment.content}</span>
                        </div>
                    </div>
                `).join('')}
                ${comments.length > 2 ? `<small class="text-muted">还有${comments.length - 2}条评论</small>` : ''}
            </div>
        ` : '';
        
        return `
            <div class="post-card fade-in" id="post_${post.id}">
                <div class="post-header">
                    <div class="post-avatar ${post.isAnonymous ? 'anonymous' : ''}">
                        ${post.isAnonymous ? '<i class="fas fa-user-secret"></i>' : (post.avatar || getInitials(post.username))}
                    </div>
                    <div class="post-info">
                        <h6>${post.isAnonymous ? '匿名用户' : post.username}</h6>
                        <span class="post-meta">${DataStore.formatTime(post.createdAt)}</span>
                    </div>
                </div>
                ${post.tags && post.tags.length > 0 ? `
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="post-content">${post.content}</div>
                <div class="post-actions">
                    <span class="post-action ${post.liked ? 'liked' : ''}" onclick="toggleLike('${post.id}')">
                        <i class="${post.liked ? 'fas' : 'far'} fa-heart"></i>
                        <span id="likeCount_${post.id}">${post.likes}</span>
                    </span>
                    <span class="post-action" onclick="showComments('${post.id}')">
                        <i class="far fa-comment"></i>
                        ${comments.length}
                    </span>
                    <span class="post-action" onclick="sharePost('${post.id}')">
                        <i class="far fa-share-square"></i>分享
                    </span>
                    ${currentUser && (currentUser.id === post.userId || currentUser.isAdmin) ? `
                        <span class="post-action text-danger ms-auto" onclick="deletePost('${post.id}')">
                            <i class="fas fa-trash"></i>
                        </span>
                    ` : ''}
                </div>
                ${commentsHtml}
            </div>
        `;
    }

    function renderEmptyState(title, message, icon) {
        return `
            <div class="empty-state">
                <i class="fas ${icon || 'fa-inbox'}"></i>
                <h5>${title}</h5>
                <p>${message}</p>
            </div>
        `;
    }

    // ========================================
    // 学术小组
    // ========================================

    function renderStudyPage() {
        const groups = DataStore.getGroups().filter(g => g.category === '学术');
        const allGroups = DataStore.getGroups();
        
        mainContent.innerHTML = `
            <div class="page-header">
                <div class="container">
                    <h1><i class="fas fa-book me-2"></i>学术资源与学习小组</h1>
                    <p>加入学习小组，共享学习资源，共同进步</p>
                </div>
            </div>
            
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <h4 class="mb-4"><i class="fas fa-graduation-cap me-2 text-primary"></i>学术兴趣小组</h4>
                        <div class="row g-3">
                            ${groups.map(group => `
                                <div class="col-md-6">
                                    <div class="group-card">
                                        <div class="d-flex align-items-center mb-3">
                                            <div style="width: 50px; height: 50px; border-radius: 10px; background: ${group.color}; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.3rem; margin-right: 1rem;">
                                                <i class="${group.icon}"></i>
                                            </div>
                                            <div>
                                                <h6 style="margin-bottom: 0.2rem;">${group.name}</h6>
                                                <small class="text-muted"><i class="fas fa-user me-1"></i>${group.members} 成员</small>
                                            </div>
                                        </div>
                                        <p class="text-muted small mb-3">${group.description}</p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span class="badge bg-primary">${group.category}</span>
                                            <button class="btn btn-sm btn-outline-primary" onclick="joinGroup('${group.id}')">
                                                <i class="fas fa-plus me-1"></i>加入
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <h4 class="mb-4 mt-5"><i class="fas fa-palette me-2 text-success"></i>兴趣小组</h4>
                        <div class="row g-3">
                            ${allGroups.filter(g => g.category === '兴趣' || g.category === '运动').map(group => `
                                <div class="col-md-6">
                                    <div class="group-card" style="border-left-color: ${group.color};">
                                        <div class="d-flex align-items-center mb-3">
                                            <div style="width: 50px; height: 50px; border-radius: 10px; background: ${group.color}; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.3rem; margin-right: 1rem;">
                                                <i class="${group.icon}"></i>
                                            </div>
                                            <div>
                                                <h6 style="margin-bottom: 0.2rem;">${group.name}</h6>
                                                <small class="text-muted"><i class="fas fa-user me-1"></i>${group.members} 成员</small>
                                            </div>
                                        </div>
                                        <p class="text-muted small mb-3">${group.description}</p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span class="badge" style="background: ${group.color};">${group.category}</span>
                                            <button class="btn btn-sm btn-outline-primary" onclick="joinGroup('${group.id}')">
                                                <i class="fas fa-plus me-1"></i>加入
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="col-lg-4">
                        <!-- 学习资源 -->
                        <div class="sidebar-card mb-4">
                            <h6><i class="fas fa-file-alt me-2 text-primary"></i>学习资源推荐</h6>
                            <div class="list-group list-group-flush">
                                <a href="#" class="list-group-item list-group-item-action d-flex align-items-center px-0">
                                    <i class="fas fa-file-pdf text-danger me-3"></i>
                                    <div>
                                        <small class="fw-bold">高等数学复习资料</small>
                                        <small class="text-muted d-block">PDF · 2.5MB</small>
                                    </div>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action d-flex align-items-center px-0">
                                    <i class="fas fa-file-word text-primary me-3"></i>
                                    <div>
                                        <small class="fw-bold">大学物理公式汇总</small>
                                        <small class="text-muted d-block">Word · 1.2MB</small>
                                    </div>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action d-flex align-items-center px-0">
                                    <i class="fas fa-link text-success me-3"></i>
                                    <div>
                                        <small class="fw-bold">Python学习路线图</small>
                                        <small class="text-muted d-block">在线资源</small>
                                    </div>
                                </a>
                            </div>
                        </div>
                        
                        <!-- 学术问答 -->
                        <div class="sidebar-card">
                            <h6><i class="fas fa-question-circle me-2 text-warning"></i>学术问答</h6>
                            <div class="mb-3">
                                ${currentUser ? `
                                    <textarea class="form-control" placeholder="发起一个问题..." rows="2"></textarea>
                                    <button class="btn btn-primary btn-sm mt-2 w-100">发布问题</button>
                                ` : `
                                    <p class="text-center text-muted small">登录后可以发起学术问答</p>
                                `}
                            </div>
                            <div class="list-group list-group-flush">
                                <a href="#" class="list-group-item list-group-item-action px-0 py-2">
                                    <small class="fw-bold d-block mb-1">如何高效复习期末考试？</small>
                                    <small class="text-muted">5个回答 · 3小时前</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action px-0 py-2">
                                    <small class="fw-bold d-block mb-1">Python爬虫入门推荐书籍？</small>
                                    <small class="text-muted">8个回答 · 5小时前</small>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="height: 2rem;"></div>
        `;
    }

    // ========================================
    // 活动中心
    // ========================================

    function renderActivitiesPage() {
        const activities = DataStore.getActivities();
        const upcoming = activities.filter(a => a.status === 'upcoming');
        const ended = activities.filter(a => a.status === 'end');
        
        mainContent.innerHTML = `
            <div class="page-header">
                <div class="container">
                    <h1><i class="fas fa-calendar-alt me-2"></i>活动中心</h1>
                    <p>发现精彩校园活动，参与其中，乐享校园生活</p>
                </div>
            </div>
            
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <h4 class="mb-4"><i class="fas fa-clock me-2 text-success"></i>即将开始</h4>
                        <div class="row g-3">
                            ${upcoming.length > 0 ? upcoming.map(activity => `
                                <div class="col-md-6">
                                    <div class="activity-card">
                                        <div class="activity-image" style="background: linear-gradient(135deg, ${activity.color}88, ${activity.color});">
                                            <i class="${activity.icon}"></i>
                                        </div>
                                        <div class="activity-content">
                                            <span class="activity-badge upcoming">即将开始</span>
                                            <h6 class="mt-2">${activity.title}</h6>
                                            <div class="activity-meta">
                                                <p class="mb-1"><i class="far fa-calendar me-1"></i>${DataStore.formatDate(activity.date)}</p>
                                                <p class="mb-1"><i class="fas fa-map-marker-alt me-1"></i>${activity.location}</p>
                                                <p class="mb-1"><i class="fas fa-user me-1"></i>${activity.organizer}</p>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-center mt-3">
                                                <small class="text-muted"><i class="fas fa-users me-1"></i>${activity.participants}/${activity.maxParticipants}</small>
                                                ${currentUser ? `
                                                    <button class="btn btn-sm btn-primary" onclick="joinActivity('${activity.id}')">
                                                        立即报名
                                                    </button>
                                                ` : `
                                                    <button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#loginModal">
                                                        登录报名
                                                    </button>
                                                `}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('') : '<div class="col-12"><p class="text-muted text-center py-5">暂无即将开始的活动</p></div>'}
                        </div>
                        
                        <h4 class="mb-4 mt-5"><i class="fas fa-history me-2 text-secondary"></i>往期活动</h4>
                        <div class="row g-3">
                            ${ended.map(activity => `
                                <div class="col-md-6">
                                    <div class="activity-card" style="opacity: 0.8;">
                                        <div class="activity-image" style="background: linear-gradient(135deg, #9ca3af, #6b7280);">
                                            <i class="${activity.icon}"></i>
                                        </div>
                                        <div class="activity-content">
                                            <span class="activity-badge end">已结束</span>
                                            <h6 class="mt-2">${activity.title}</h6>
                                            <div class="activity-meta">
                                                <p class="mb-1"><i class="far fa-calendar me-1"></i>${DataStore.formatDate(activity.date)}</p>
                                                <p class="mb-1"><i class="fas fa-map-marker-alt me-1"></i>${activity.location}</p>
                                            </div>
                                            <div class="mt-3">
                                                <small class="text-muted"><i class="fas fa-users me-1"></i>${activity.participants}人参与</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="col-lg-4">
                        <!-- 投票区 -->
                        <div class="sidebar-card mb-4">
                            <h6><i class="fas fa-vote-yea me-2 text-primary"></i>活动投票</h6>
                            <p class="small text-muted mb-3">下次集体活动，你想去哪里？</p>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="activityVote" id="vote1" value="option1">
                                <label class="form-check-label" for="vote1">
                                    户外烧烤
                                </label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="activityVote" id="vote2" value="option2">
                                <label class="form-check-label" for="vote2">
                                    KTV唱歌
                                </label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="activityVote" id="vote3" value="option3">
                                <label class="form-check-label" for="vote3">
                                    密室逃脱
                                </label>
                            </div>
                            <button class="btn btn-primary btn-sm w-100 mt-2">投票</button>
                        </div>
                        
                        <!-- 发布活动 -->
                        ${currentUser ? `
                            <div class="sidebar-card">
                                <h6><i class="fas fa-plus-circle me-2 text-success"></i>发布活动</h6>
                                <p class="small text-muted mb-3">组织一场属于你的活动</p>
                                <button class="btn btn-success w-100" onclick="showToast('活动发布功能开发中...')">
                                    <i class="fas fa-plus me-1"></i>创建活动
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            <div style="height: 2rem;"></div>
        `;
    }

    // ========================================
    // 校园交友
    // ========================================

    function renderFriendsPage() {
        const users = DataStore.getUsers().filter(u => !u.isAdmin && u.id !== currentUser?.id);
        
        mainContent.innerHTML = `
            <div class="page-header">
                <div class="container">
                    <h1><i class="fas fa-heart me-2"></i>校园交友</h1>
                    <p>认识新朋友，拓展你的校园社交圈</p>
                </div>
            </div>
            
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <!-- 匹配用户 -->
                        <h4 class="mb-4"><i class="fas fa-users me-2 text-primary"></i>发现同学</h4>
                        <div class="row g-3">
                            ${users.map((user, index) => `
                                <div class="col-md-4 col-6">
                                    <div class="match-card fade-in" style="animation-delay: ${index * 0.1}s">
                                        <div class="match-avatar" style="background: linear-gradient(135deg, ${getRandomColor()}, ${getRandomColor()});">
                                            ${user.avatar || getInitials(user.username)}
                                        </div>
                                        <h6>${user.username}</h6>
                                        <p class="dept">${user.department || '南京工业大学'}</p>
                                        <div class="match-tags">
                                            ${(user.interests || ['学习', '运动']).slice(0, 3).map(tag => `
                                                <span class="match-tag">${tag}</span>
                                            `).join('')}
                                        </div>
                                        ${currentUser ? `
                                            <button class="btn btn-sm btn-outline-primary" onclick="sendFriendRequest('${user.id}')">
                                                <i class="fas fa-user-plus me-1"></i>加好友
                                            </button>
                                        ` : `
                                            <button class="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#loginModal">
                                                登录添加
                                            </button>
                                        `}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- 交友挑战 -->
                        <h4 class="mb-4 mt-5"><i class="fas fa-medal me-2 text-warning"></i>交友挑战</h4>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <div class="group-card">
                                    <div class="d-flex align-items-center">
                                        <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #34d399); display: flex; align-items: center; justify-content: center; color: white; margin-right: 1rem;">
                                            <i class="fas fa-running"></i>
                                        </div>
                                        <div>
                                            <h6>七天运动打卡</h6>
                                            <small class="text-muted">与好友一起运动打卡</small>
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <div class="progress" style="height: 8px;">
                                            <div class="progress-bar bg-success" style="width: 60%;"></div>
                                        </div>
                                        <small class="text-muted mt-1 d-block">156人参与</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="group-card">
                                    <div class="d-flex align-items-center">
                                        <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; margin-right: 1rem;">
                                            <i class="fas fa-book-open"></i>
                                        </div>
                                        <div>
                                            <h6>读书分享挑战</h6>
                                            <small class="text-muted">一周读完一本书</small>
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <div class="progress" style="height: 8px;">
                                            <div class="progress-bar" style="width: 40%; background: var(--primary-color);"></div>
                                        </div>
                                        <small class="text-muted mt-1 d-block">98人参与</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-4">
                        <!-- 兴趣匹配 -->
                        <div class="sidebar-card mb-4">
                            <h6><i class="fas fa-magic me-2 text-primary"></i>兴趣匹配</h6>
                            <p class="small text-muted mb-3">根据你的兴趣找到志同道合的朋友</p>
                            <div class="mb-3">
                                <div class="d-flex flex-wrap gap-2 mb-3">
                                    <span class="tag-cloud-item ${currentUser?.interests?.includes('编程') ? 'active' : ''}">编程</span>
                                    <span class="tag-cloud-item">运动</span>
                                    <span class="tag-cloud-item">音乐</span>
                                    <span class="tag-cloud-item">摄影</span>
                                    <span class="tag-cloud-item">阅读</span>
                                    <span class="tag-cloud-item">旅行</span>
                                </div>
                                <button class="btn btn-primary btn-sm w-100">开始匹配</button>
                            </div>
                        </div>
                        
                        <!-- 排行榜 -->
                        <div class="sidebar-card">
                            <h6><i class="fas fa-trophy me-2 text-warning"></i>活跃榜</h6>
                            ${users.slice(0, 5).map((user, index) => `
                                <div class="leaderboard-item">
                                    <div class="leaderboard-rank ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : 'default'}">
                                        ${index + 1}
                                    </div>
                                    <div class="leaderboard-info">
                                        <h6>${user.username}</h6>
                                        <span>${user.department || '南京工业大学'}</span>
                                    </div>
                                    <div class="leaderboard-score">${Math.floor(Math.random() * 500 + 100)}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="height: 2rem;"></div>
        `;
    }

    // ========================================
    // 游戏中心
    // ========================================

    function renderGamesPage() {
        const challenges = DataStore.getChallenges();
        
        mainContent.innerHTML = `
            <div class="page-header">
                <div class="container">
                    <h1><i class="fas fa-gamepad me-2"></i>趣味游戏与挑战</h1>
                    <p>参与趣味测试和每日挑战，赢取丰厚奖励</p>
                </div>
            </div>
            
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <!-- 趣味测试 -->
                        <h4 class="mb-4"><i class="fas fa-brain me-2 text-primary"></i>趣味测试</h4>
                        <div class="row g-3">
                            <div class="col-md-4">
                                <div class="game-card" onclick="startQuiz('personality')">
                                    <div class="game-icon" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <h6>性格测试</h6>
                                    <p>测测你的性格类型</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="game-card" onclick="startQuiz('love')">
                                    <div class="game-icon" style="background: linear-gradient(135deg, #f093fb, #f5576c);">
                                        <i class="fas fa-heart"></i>
                                    </div>
                                    <h6>爱情测试</h6>
                                    <p>你的理想型是什么样的</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="game-card" onclick="startQuiz('interest')">
                                    <div class="game-icon" style="background: linear-gradient(135deg, #11998e, #38ef7d);">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <h6>兴趣测试</h6>
                                    <p>发现你的隐藏天赋</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 每日挑战 -->
<h4 class="mb-4 mt-5"><i class="fas fa-fire me-2 text-danger"></i>每日挑战</h4>
                        <div class="row g-3">
                            ${challenges.map(challenge => `
                                <div class="col-md-6">
                                    <div class="group-card" style="border-left-color: ${challenge.color};">
                                        <div class="d-flex align-items-center mb-3">
                                            <div style="width: 50px; height: 50px; border-radius: 50%; background: ${challenge.color}; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.3rem; margin-right: 1rem;">
                                                <i class="${challenge.icon}"></i>
                                            </div>
                                            <div>
                                                <h6 style="margin-bottom: 0.2rem;">${challenge.name}</h6>
                                                <small class="text-muted"><i class="fas fa-clock me-1"></i>${challenge.duration}</small>
                                            </div>
                                        </div>
                                        <p class="text-muted small mb-2">${challenge.description}</p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <small class="text-muted"><i class="fas fa-users me-1"></i>${challenge.participants}人参与</small>
                                            <span class="badge bg-success">奖励: ${challenge.reward}</span>
                                        </div>
                                        ${currentUser ? `
                                            <button class="btn btn-sm btn-primary w-100 mt-3" onclick="joinChallenge('${challenge.id}')">
立即参与
                                            </button>
                                        ` : `
                                            <button class="btn btn-sm btn-secondary w-100 mt-3" data-bs-toggle="modal" data-bs-target="#loginModal">
                                                登录参与
                                            </button>
                                        `}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="col-lg-4">
                        <!-- 排行榜 -->
                        <div class="sidebar-card mb-4">
                            <h6><i class="fas fa-trophy me-2 text-warning"></i>挑战排行榜</h6>
                            ${challenges[0] ? `
                                <div class="text-center mb-3" style="padding: 1rem; background: linear-gradient(135deg, #667eea22, #764ba222); border-radius: 10px;">
                                    <i class="${challenges[0].icon}" style="font-size: 2rem; color: ${challenges[0].color};"></i>
                                    <h6 class="mt-2 mb-1">${challenges[0].name}</h6>
                                    <small class="text-muted">冠军: 张同学</small>
                                    <div class="text-success fw-bold mt-2">连续7天完成</div>
                                </div>
                            ` : ''}
                            <div class="list-group list-group-flush">
                                <div class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    <span><i class="fas fa-medal text-warning me-2"></i>第1名</span>
                                    <span class="fw-bold">280分</span>
                                </div>
                                <div class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    <span><i class="fas fa-medal text-secondary me-2"></i>第2名</span>
                                    <span class="fw-bold">265分</span>
                                </div>
                                <div class="list-group-item d-flex justify-content-between align-items-center px-0">
                                    <span><i class="fas fa-medal text-danger me-2"></i>第3名</span>
                                    <span class="fw-bold">250分</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 规则说明 -->
                        <div class="sidebar-card">
                            <h6><i class="fas fa-info-circle me-2 text-primary"></i>挑战规则</h6>
                            <ul class="list-unstyled small text-muted">
                                <li class="mb-2"><i class="fas fa-check text-success me-2"></i>每日完成挑战任务可获得积分</li>
                                <li class="mb-2"><i class="fas fa-check text-success me-2"></i>连续完成可获得额外奖励</li>
                                <li class="mb-2"><i class="fas fa-check text-success me-2"></i>积分可兑换精美礼品</li>
                                <li><i class="fas fa-check text-success me-2"></i>每月排行榜前10名有特别奖励</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="height: 2rem;"></div>
        `;
    }

    // ========================================
    // 校园资讯
    // ========================================

    function renderNewsPage() {
        const news = DataStore.getNews();
        
        mainContent.innerHTML = `
            <div class="page-header">
                <div class="container">
                    <h1><i class="fas fa-newspaper me-2"></i>校园资讯</h1>
                    <p>了解校园动态，获取最新资讯</p>
                </div>
            </div>
            
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <!-- 新闻列表 -->
                        ${news.map((item, index) => `
                            <div class="news-card mb-3 fade-in" style="animation-delay: ${index * 0.1}s">
                                <div class="row g-0">
                                    <div class="col-md-3">
                                        <div class="news-image h-100" style="min-height: 100px;">
                                            <i class="fas fa-newspaper"></i>
                                        </div>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="news-content">
                                            <span class="badge ${getCategoryBadge(item.category)} mb-2">${item.category}</span>
                                            <h6>${item.title}</h6>
                                            <p class="text-muted small mb-2">${item.content.substring(0, 100)}...</p>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <small class="text-muted">
                                                    <i class="fas fa-user me-1"></i>${item.author}
                                                    <i class="fas fa-eye ms-2 me-1"></i>${item.views}
                                                    <i class="fas fa-heart ms-2 me-1"></i>${item.likes}
                                                </small>
                                                <small class="text-muted">${DataStore.formatTime(item.createdAt)}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="col-lg-4">
                        <!-- 快速链接 -->
                        <div class="sidebar-card mb-4">
                            <h6><i class="fas fa-link me-2 text-primary"></i>快速链接</h6>
                            <div class="list-group list-group-flush">
                                <a href="#" class="list-group-item list-group-item-action px-0">
                                    <i class="fas fa-university me-2 text-primary"></i>学校官网
                                </a>
                                <a href="#" class="list-group-item list-group-item-action px-0">
                                    <i class="fas fa-graduation-cap me-2 text-success"></i>教务系统
                                </a>
                                <a href="#" class="list-group-item list-group-item-action px-0">
                                    <i class="fas fa-book me-2 text-info"></i>图书馆
                                </a>
                                <a href="#" class="list-group-item list-group-item-action px-0">
                                    <i class="fas fa-utensils me-2 text-warning"></i>食堂菜单
                                </a>
                            </div>
                        </div>
                        
                        <!-- Q&A -->
                        <div class="sidebar-card">
                            <h6><i class="fas fa-question-circle me-2 text-secondary"></i>校园问答</h6>
                            <div class="list-group list-group-flush">
                                <a href="#" class="list-group-item list-group-item-action px-0">
                                    <small class="fw-bold d-block mb-1">图书馆开放时间是几点？</small>
                                    <small class="text-muted">5个回答</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action px-0">
                                    <small class="fw-bold d-block mb-1">学生卡丢了怎么办理？</small>
                                    <small class="text-muted">3个回答</small>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action px-0">
                                    <small class="fw-bold d-block mb-1">如何申请勤工俭学？</small>
                                    <small class="text-muted">8个回答</small>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="height: 2rem;"></div>
        `;
    }

    // ========================================
    // 个人主页
    // ========================================

    function renderProfilePage() {
        if (!currentUser) {
            navigateTo('home');
            return;
        }
        
        const userPosts = DataStore.getPosts().filter(p => p.userId === currentUser.id);
        
        mainContent.innerHTML = `
            <div class="profile-header">
                <div class="container text-center">
                    <div class="profile-avatar">
                        ${currentUser.avatar || getInitials(currentUser.username)}
                    </div>
                    <h2 class="mb-1">${currentUser.username}</h2>
                    <p class="mb-2">${currentUser.department || '南京工业大学'}</p>
                    ${currentUser.bio ? `<p class="mb-3">${currentUser.bio}</p>` : ''}
                    <div class="profile-stats">
                        <div class="profile-stat">
                            <div class="number">${userPosts.length}</div>
                            <div class="label">动态</div>
                        </div>
                        <div class="profile-stat">
                            <div class="number">${Math.floor(Math.random() * 100 + 50)}</div>
                            <div class="label">关注</div>
                        </div>
                        <div class="profile-stat">
                            <div class="number">${Math.floor(Math.random() * 500 + 100)}</div>
                            <div class="label">粉丝</div>
                        </div>
                        <div class="profile-stat">
                            <div class="number">${Math.floor(Math.random() * 1000)}</div>
                            <div class="label">积分</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <h5 class="mb-3"><i class="fas fa-clock me-2"></i>我的动态</h5>
                        ${userPosts.length > 0 ? userPosts.map(post => renderPostCard(post)).join('') : renderEmptyState('暂无动态', '还没有发布任何动态', 'fa-comments')}
                    </div>
                    
                    <div class="col-lg-4">
                        <!-- 个人信息 -->
                        <div class="sidebar-card mb-4">
                            <h6><i class="fas fa-user me-2 text-primary"></i>个人信息</h6>
                            <ul class="list-unstyled small">
                                <li class="mb-2"><i class="fas fa-id-card me-2 text-muted"></i>学号：${currentUser.studentId}</li>
                                <li class="mb-2"><i class="fas fa-building me-2 text-muted"></i>院系：${currentUser.department}</li>
                                <li><i class="fas fa-calendar me-2 text-muted"></i>加入：${DataStore.formatDate(currentUser.createdAt)}</li>
                            </ul>
                            <button class="btn btn-outline-primary btn-sm w-100 mt-2" onclick="editProfile()">
                                <i class="fas fa-edit me-1"></i>编辑资料
                            </button>
                        </div>
                        
                        <!-- 兴趣标签 -->
                        <div class="sidebar-card mb-4">
                            <h6><i class="fas fa-tags me-2 text-primary"></i>我的兴趣</h6>
                            <div class="tag-cloud">
                                ${(currentUser.interests || ['学习', '运动', '音乐']).map(tag => `
                                    <span class="tag">${tag}</span>
                                `).join('')}
                            </div>
                            <button class="btn btn-outline-secondary btn-sm w-100 mt-3" onclick="editInterests()">
                                <i class="fas fa-plus me-1"></i>添加兴趣
                            </button>
                        </div>
                        
                        <!-- 我参与的挑战 -->
                        <div class="sidebar-card">
                            <h6><i class="fas fa-trophy me-2 text-warning"></i>我的成就</h6>
                            <div class="d-flex flex-wrap gap-2">
                                <div style="padding: 0.5rem 1rem; background: linear-gradient(135deg, #667eea22, #764ba222); border-radius: 10px; text-align: center;">
                                    <i class="fas fa-fire text-danger"></i>
                                    <div class="small fw-bold">连续7天</div>
                                </div>
                                <div style="padding: 0.5rem 1rem; background: linear-gradient(135deg, #f093fb22, #f5576c22); border-radius: 10px; text-align: center;">
                                    <i class="fas fa-star text-warning"></i>
                                    <div class="small fw-bold">活跃达人</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="height: 2rem;"></div>
        `;
    }

    // ========================================
    // 管理员页面
    // ========================================

    function renderAdminPage() {
        if (!currentUser || !currentUser.isAdmin) {
            showToast('无权限访问', 'error');
            navigateTo('home');
            return;
        }
        
        const users = DataStore.getUsers();
        const posts = DataStore.getPosts();
        const groups = DataStore.getGroups();
        
        mainContent.innerHTML = `
            <div class="page-header" style="background: linear-gradient(135deg, #1f2937, #374151);">
                <div class="container">
                    <h1><i class="fas fa-shield-alt me-2"></i>管理后台</h1>
                    <p>管理校园圈平台的用户和内容</p>
                </div>
            </div>
            
            <div class="container">
                <div class="row">
                    <!-- 侧边栏 -->
                    <div class="col-lg-3">
                        <div class="admin-sidebar">
                            <a href="#" class="admin-nav-item active" onclick="showAdminTab('overview'); return false;">
                                <i class="fas fa-chart-line"></i>数据概览
                            </a>
                            <a href="#" class="admin-nav-item" onclick="showAdminTab('users'); return false;">
                                <i class="fas fa-users"></i>用户管理
                            </a>
                            <a href="#" class="admin-nav-item" onclick="showAdminTab('posts'); return false;">
                                <i class="fas fa-comments"></i>内容管理
                            </a>
                            <a href="#" class="admin-nav-item" onclick="showAdminTab('groups'); return false;">
                                <i class="fas fa-users-circle"></i>小组管理
                            </a>
                            <a href="#" class="admin-nav-item" onclick="showAdminTab('settings'); return false;">
                                <i class="fas fa-cog"></i>系统设置
                            </a>
                        </div>
                    </div>
                    
                    <!-- 主内容区 -->
                    <div class="col-lg-9">
                        <!-- 数据概览 -->
                        <div id="adminOverview" class="admin-content">
                            <div class="row g-3 mb-4">
                                <div class="col-md-3">
                                    <div class="stat-card text-center">
                                        <div class="stat-number text-primary">${users.length}</div>
                                        <div class="stat-label">总用户</div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="stat-card text-center">
                                        <div class="stat-number text-success">${posts.length}</div>
                                        <div class="stat-label">总动态</div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="stat-card text-center">
                                        <div class="stat-number text-warning">${groups.length}</div>
                                        <div class="stat-label">兴趣小组</div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="stat-card text-center">
                                        <div class="stat-number text-danger">${DataStore.getActivities().length}</div>
                                        <div class="stat-label">活动数</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="table-responsive">
                                <h5 class="mb-3">最近动态</h5>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>内容</th>
                                            <th>发布者</th>
                                            <th>时间</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${posts.slice(0, 5).map(post => `
                                            <tr>
                                                <td><small>${post.content.substring(0, 30)}...</small></td>
                                                <td>${post.username}</td>
                                                <td><small>${DataStore.formatTime(post.createdAt)}</small></td>
                                                <td>
                                                    <button class="btn btn-sm btn-danger" onclick="adminDeletePost('${post.id}')">
                                                        <i class="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <!-- 用户管理 -->
                        <div id="adminUsers" class="admin-content" style="display: none;">
                            <div class="table-responsive">
                                <h5 class="mb-3">用户列表</h5>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>用户</th>
                                            <th>学号</th>
                                            <th>院系</th>
                                            <th>状态</th>
                                            <th>注册时间</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${users.map(user => `
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; color: white; margin-right: 0.5rem;">
                                                            ${user.avatar || getInitials(user.username)}
                                                        </div>
                                                        <span>${user.username}</span>
                                                    </div>
                                                </td>
                                                <td>${user.studentId}</td>
                                                <td><small>${user.department}</small></td>
                                                <td>
                                                    <span class="user-status ${user.isAdmin ? 'active' : 'active'}">
                                                        ${user.isAdmin ? '管理员' : '用户'}
                                                    </span>
                                                </td>
                                                <td><small>${DataStore.formatDate(user.createdAt)}</small></td>
                                                <td>
                                                    ${!user.isAdmin ? `
                                                        <button class="btn btn-sm btn-outline-danger" onclick="banUser('${user.id}')">
                                                            ${user.banned ? '解禁' : '封禁'}
                                                        </button>
                                                    ` : '-'}
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <!-- 内容管理 -->
                        <div id="adminPosts" class="admin-content" style="display: none;">
                            <div class="table-responsive">
                                <h5 class="mb-3">动态管理</h5>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>内容预览</th>
                                            <th>发布者</th>
                                            <th>点赞</th>
                                            <th>时间</th>
                                            <th>操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${posts.map(post => `
                                            <tr>
                                                <td><small>${post.id.substring(0, 8)}...</small></td>
                                                <td><small>${post.content.substring(0, 25)}...</small></td>
                                                <td>${post.username}</td>
                                                <td>${post.likes}</td>
                                                <td><small>${DataStore.formatTime(post.createdAt)}</small></td>
                                                <td>
                                                    <button class="btn btn-sm btn-danger" onclick="adminDeletePost('${post.id}')">
                                                        删除
                                                    </button>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <!-- 小组管理 -->
                        <div id="adminGroups" class="admin-content" style="display: none;">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h5 class="mb-0">兴趣小组</h5>
                                <button class="btn btn-primary btn-sm" onclick="addGroup()">
                                    <i class="fas fa-plus me-1"></i>添加小组
                                </button>
                            </div>
                            <div class="row">
                                ${groups.map(group => `
                                    <div class="col-md-6 mb-3">
                                        <div class="group-card">
                                            <div class="d-flex justify-content-between align-items-start">
                                                <div class="d-flex align-items-center">
                                                    <div style="width: 40px; height: 40px; border-radius: 8px; background: ${group.color}; display: flex; align-items: center; justify-content: center; color: white; margin-right: 0.75rem;">
                                                        <i class="${group.icon}"></i>
                                                    </div>
                                                    <div>
                                                        <h6 style="margin-bottom: 0.1rem;">${group.name}</h6>
                                                        <small class="text-muted">${group.members}成员</small>
                                                    </div>
                                                </div>
                                                <button class="btn btn-sm btn-outline-danger" onclick="deleteGroup('${group.id}')">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- 系统设置 -->
                        <div id="adminSettings" class="admin-content" style="display: none;">
                            <div class="sidebar-card">
                                <h6><i class="fas fa-cog me-2"></i>系统设置</h6>
                                <form>
                                    <div class="mb-3">
                                        <label class="form-label">平台名称</label>
                                        <input type="text" class="form-control" value="校园圈 CampusCircle">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">平台描述</label>
                                        <textarea class="form-control" rows="2">南京工业大学校园社交平台</textarea>
                                    </div>
                                    <div class="mb-3 form-check">
                                        <input type="checkbox" class="form-check-input" id="allowAnonymous" checked>
                                        <label class="form-check-label" for="allowAnonymous">允许匿名发帖</label>
                                    </div>
                                    <button type="button" class="btn btn-primary" onclick="showToast('设置已保存')">保存设置</button>
                                </form>
                                
                                <hr class="my-4">
                                
                                <h6 class="text-danger"><i class="fas fa-exclamation-triangle me-2"></i>危险操作</h6>
                                <button class="btn btn-outline-danger btn-sm" onclick="if(confirm('确定要清空所有数据吗？此操作不可恢复！')) { DataStore.clearAll(); location.reload(); }">
                                    <i class="fas fa-trash me-1"></i>清空所有数据
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="height: 2rem;"></div>
        `;
    }

    // ========================================
    // 辅助函数
    // ========================================

    function getRandomColor() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#11998e', '#38ef7d', '#f59e0b', '#ec4899', '#06b6d4'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function getCategoryBadge(category) {
        const badges = {
            '通知': 'bg-danger',
            '活动': 'bg-success',
            '学业': 'bg-primary',
            '服务': 'bg-info'
        };
        return badges[category] || 'bg-secondary';
    }

    // ========================================
    // 交互函数
    // ========================================

    function openPostModal() {
        postModal.show();
    }

    function openAnonymousPost() {
        document.getElementById('anonymousPost').checked = true;
        postModal.show();
    }

    function handlePostSubmit(e) {
        e.preventDefault();
        
        if (!currentUser) {
            showToast('请先登录', 'warning');
            return;
        }
        
        const content = document.getElementById('postContent').value;
        const tagsInput = document.getElementById('postTags').value;
        const isAnonymous = document.getElementById('anonymousPost').checked;
        
        if (!content.trim()) {
            showToast('内容不能为空', 'error');
            return;
        }
        
        const tags = tagsInput ? tagsInput.split(/[,，#]/).filter(t => t.trim()) : [];
        
        const post = {
            userId: isAnonymous ? 'anonymous' : currentUser.id,
            username: currentUser.username,
            avatar: currentUser.avatar || getInitials(currentUser.username),
            content: content,
            tags: tags,
            isAnonymous: isAnonymous,
            type: 'normal'
        };
        
        DataStore.addPost(post);
        postModal.hide();
        document.getElementById('postForm').reset();
        showToast('发布成功！');
        renderPage(currentPage);
    }

    function toggleLike(postId) {
        if (!currentUser) {
            showToast('请先登录', 'warning');
            return;
        }
        
        const posts = DataStore.getPosts();
        const post = posts.find(p => p.id === postId);
        
        if (post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            DataStore.set(DataStore.KEYS.POSTS, posts);
            
            const likeCount = document.getElementById(`likeCount_${postId}`);
            if (likeCount) {
                likeCount.textContent = post.likes;
            }
            
            const likeBtn = document.querySelector(`#post_${postId} .post-action.liked, #post_${postId} .post-action:nth-child(1)`);
            if (likeBtn) {
                likeBtn.classList.toggle('liked', post.liked);
                likeBtn.querySelector('i').className = post.liked ? 'fas fa-heart' : 'far fa-heart';
            }
        }
    }

    function showComments(postId) {
        showToast('评论功能开发中...');
    }

    function sharePost(postId) {
        if (navigator.share) {
            navigator.share({
                title: '校园圈动态',
                text: '来看看校园圈里的有趣动态！',
                url: window.location.href
            });
        } else {
            showToast('链接已复制，快去分享吧！');
        }
    }

    function deletePost(postId) {
        if (confirm('确定要删除这条动态吗？')) {
            DataStore.deletePost(postId);
            showToast('删除成功');
            renderPage(currentPage);
        }
    }

    function filterByTag(tag) {
        navigateTo('community');
        // 可以添加标签过滤逻辑
        if (tag) {
            showToast(`正在筛选 #${tag} 相关内容`);
        }
    }

    function joinGroup(groupId) {
        if (!currentUser) {
            showToast('请先登录', 'warning');
            return;
        }
        showToast('加入成功！');
    }

    function joinActivity(activityId) {
        if (!currentUser) {
            showToast('请先登录', 'warning');
            return;
        }
        showToast('报名成功！');
    }

    function sendFriendRequest(userId) {
        if (!currentUser) {
            showToast('请先登录', 'warning');
            return;
        }
        showToast('好友请求已发送！');
    }

    function joinChallenge(challengeId) {
        if (!currentUser) {
            showToast('请先登录', 'warning');
            return;
        }
        showToast('挑战参与成功！');
    }

    function startQuiz(type) {
        showToast(`${type === 'personality' ? '性格' : type === 'love' ? '爱情' : '兴趣'}测试开发中...`);
    }

    function showAdminTab(tab) {
        document.querySelectorAll('.admin-content').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.admin-nav-item').forEach(el => el.classList.remove('active'));
        
        document.getElementById(`admin${tab.charAt(0).toUpperCase() + tab.slice(1)}`).style.display = 'block';
        event.target.classList.add('active');
    }

    function adminDeletePost(postId) {
        if (confirm('确定要删除这条动态吗？')) {
            DataStore.deletePost(postId);
            showToast('删除成功');
            renderAdminPage();
        }
    }

    function banUser(userId) {
        showToast('用户状态已更新');
    }

    function deleteGroup(groupId) {
        if (confirm('确定要删除这个小组吗？')) {
            showToast('小组已删除');
        }
    }

    function addGroup() {
        showToast('添加小组功能开发中...');
    }

    function editProfile() {
        showToast('个人资料编辑功能开发中...');
    }

    function editInterests() {
        showToast('兴趣编辑功能开发中...');
    }

    // ========================================
    // 初始化
    // ========================================

    function init() {
        // 渲染认证区域
        renderAuthSection();
        
        // 绑定导航点击事件
        document.querySelectorAll('.nav-link[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(link.dataset.page);
            });
        });
        
        // 绑定表单提交事件
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
        document.getElementById('registerForm').addEventListener('submit', handleRegister);
        document.getElementById('postForm').addEventListener('submit', handlePostSubmit);
        
        // 绑定快捷标签点击
        document.querySelectorAll('.quick-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const input = document.getElementById('postTags');
                input.value = input.value ? input.value + ' ' + tag.dataset.tag : tag.dataset.tag;
            });
        });
        
        // 绑定用户菜单
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
        document.getElementById('goToProfile').addEventListener('click', () => {
            userMenuModal.hide();
            navigateTo('profile');
        });
        document.getElementById('goToSettings').addEventListener('click', () => {
            userMenuModal.hide();
            showToast('个人设置功能开发中...');
        });
        document.getElementById('goToAdmin').addEventListener('click', () => {
            userMenuModal.hide();
            navigateTo('admin');
        });
        
        // 渲染首页
        renderHomePage();
        
        // 将全局函数暴露给window
        window.navigateTo = navigateTo;
        window.openPostModal = openPostModal;
        window.openAnonymousPost = openAnonymousPost;
        window.toggleLike = toggleLike;
        window.showComments = showComments;
        window.sharePost = sharePost;
        window.deletePost = deletePost;
        window.filterByTag = filterByTag;
        window.joinGroup = joinGroup;
        window.joinActivity = joinActivity;
        window.sendFriendRequest = sendFriendRequest;
        window.joinChallenge = joinChallenge;
        window.startQuiz = startQuiz;
        window.showAdminTab = showAdminTab;
        window.adminDeletePost = adminDeletePost;
        window.banUser = banUser;
        window.deleteGroup = deleteGroup;
        window.addGroup = addGroup;
        window.editProfile = editProfile;
        window.editInterests = editInterests;
    }

    // DOM加载完成后初始化
    document.addEventListener('DOMContentLoaded', init);

})();
