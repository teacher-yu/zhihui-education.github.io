// 网站主脚本文件
class EducationWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupNavbarScroll();
        this.setupMobileMenu();
        this.setupAnimations();
        this.setupCourseCards();
        this.setupFormValidation();
        this.setupScrollReveal();
    }

    // 平滑滚动
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // 导航栏滚动效果
    setupNavbarScroll() {
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'rgba(102, 126, 234, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                header.style.backdropFilter = 'none';
            }

            // 隐藏/显示导航栏
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
        });
    }

    // 移动端菜单
    setupMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
            });

            // 点击链接后关闭菜单
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuBtn.innerHTML = '☰';
                });
            });
        }
    }

    // 动画效果
    setupAnimations() {
        // 观察器配置
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // 观察需要动画的元素
        document.querySelectorAll('.course-card, .feature-item, .stat-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    // 课程卡片交互
    setupCourseCards() {
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            // 点击卡片展开详情
            card.addEventListener('click', () => {
                this.toggleCourseDetails(card);
            });

            // 键盘导航支持
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleCourseDetails(card);
                }
            });
        });
    }

    toggleCourseDetails(card) {
        const details = card.querySelector('.course-details');
        if (details) {
            details.classList.toggle('expanded');
        }
    }

    // 表单验证
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, '此字段为必填项');
                isValid = false;
            } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
                this.showError(input, '请输入有效的邮箱地址');
                isValid = false;
            } else {
                this.clearError(input);
            }
        });
        
        return isValid;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showError(input, message) {
        this.clearError(input);
        input.style.borderColor = '#ff6b6b';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.5rem';
        input.parentNode.appendChild(errorDiv);
    }

    clearError(input) {
        input.style.borderColor = '';
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    // 滚动显示动画
    setupScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // 工具函数：节流
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // 工具函数：防抖
    debounce(func, delay) {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new EducationWebsite();

    // 添加加载动画
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">智慧教育</div>
            <div style="width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        </div>
    `;
    
    document.body.appendChild(loader);

    // 页面加载完成后隐藏加载动画
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1000);
    });

    // 添加键盘快捷键
    document.addEventListener('keydown', (e) => {
        // ESC键回到顶部
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // 数字键快速导航
        if (e.ctrlKey && e.key >= '1' && e.key <= '5') {
            const sections = ['home', 'courses', 'about', 'features', 'contact'];
            const index = parseInt(e.key) - 1;
            const target = document.getElementById(sections[index]);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // 添加滚动进度条
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #ff6b6b, #667eea);
        width: 0%;
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / (docHeight - winHeight)) * 100;
        progressBar.style.width = progress + '%';
    });
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .course-details {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    
    .course-details.expanded {
        max-height: 200px;
    }
    
    /* 打印样式 */
    @media print {
        .cta-button, header, footer {
            display: none !important;
        }
        
        body {
            color: black !important;
            background: white !important;
        }
    }
`;
document.head.appendChild(style);