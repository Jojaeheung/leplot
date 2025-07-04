// 부드러운 스크롤 효과
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// 스크롤 시 헤더 효과
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 254, 249, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--warm-white)';
        header.style.backdropFilter = 'none';
    }
});

// 디저트 아이템 클릭 효과
document.querySelectorAll('.dessert-item').forEach(item => {
    item.addEventListener('click', function() {
        // 클릭 시 반짝이는 효과
        this.style.animation = 'none';
        this.offsetHeight; // 리플로우 강제 실행
        this.style.animation = 'sparkle 0.6s ease-in-out';
        
        // 랜덤 디저트 이모지로 변경
        const desserts = ['🍰', '🧁', '🍪', '🍩', '🥐', '🍮', '🎂', '🥧'];
        const randomDessert = desserts[Math.floor(Math.random() * desserts.length)];
        this.textContent = randomDessert;
        
        setTimeout(() => {
            this.style.animation = 'float 3s ease-in-out infinite';
        }, 600);
    });
});

// 카드 호버 시 랜덤 컬러 효과
document.querySelectorAll('.featured-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const colors = ['#EA8F8F', '#F4A6A6', '#FFB74D', '#AED581', '#64B5F6'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.borderLeft = `5px solid ${randomColor}`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderLeft = 'none';
    });
});

// 로고 클릭 시 애니메이션
document.querySelector('.logo-circle').addEventListener('click', function() {
    this.style.animation = 'logoSpin 1s ease-in-out';
    
    setTimeout(() => {
        this.style.animation = 'none';
    }, 1000);
});

// 스크롤 시 요소들 페이드인 효과
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

// 관찰할 요소들 설정
document.querySelectorAll('.featured-card, .about-text, .section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.2) rotate(90deg); }
        50% { transform: scale(1.3) rotate(180deg); }
        75% { transform: scale(1.2) rotate(270deg); }
        100% { transform: scale(1) rotate(360deg); }
    }
    
    @keyframes logoSpin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
    }
`;
document.head.appendChild(style);

// 현재 시간에 따른 인사말 변경
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingElement = document.querySelector('.hero-title');
    
    if (greetingElement) {
        let greeting;
        if (hour < 12) {
            greeting = '좋은 아침, 달콤한 하루를 시작하세요 ☀️';
        } else if (hour < 18) {
            greeting = '달콤한 오후를 선물하는 곳 🌤️';
        } else {
            greeting = '달콤한 저녁을 선물하는 곳 🌙';
        }
        
        // 기존 제목 유지하되, 서브타이틀을 동적으로 변경
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            subtitle.textContent = greeting;
        }
    }
}

// 페이지 로드 시 인사말 설정
document.addEventListener('DOMContentLoaded', updateGreeting);

// 로딩 애니메이션
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});