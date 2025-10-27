const bonobono = document.getElementById('bonobono');

let posX = 100;
let posY = 150;

let targetX = posX;
let targetY = posY;

let followMouse = true; // 마우스 따라오기 모드
const speed = 0.005;     // 따라오는 속도
let directionX = 1;     // 혼자놀기 좌우 방향
let velX = 2;           // 혼자놀기 속도

// 마우스 위치 업데이트
document.addEventListener('mousemove', (e) => {
    if (followMouse) {
        targetX = e.clientX - bonobono.clientWidth / 2;
        targetY = e.clientY - bonobono.clientHeight / 2;
    }
});

// 좌클릭하면 모드 전환
document.addEventListener('click', () => {
    followMouse = !followMouse;
});

function animateBonobono() {
    const container = document.getElementById('container');
    const maxX = container.clientWidth - bonobono.clientWidth;
    const maxY = container.clientHeight - bonobono.clientHeight;

    if (followMouse) {
        // 마우스 따라가기
        posX += (targetX - posX) * speed;
        posY += (targetY - posY) * speed;
    } else {
        // 혼자 놀기: 좌우 이동
        posX += velX * directionX;
        // 벽에 부딪히면 반전
        if (posX <= 0 || posX >= maxX) directionX *= -1;

        // 살짝 위아래 흔들림
        posY += Math.sin(Date.now() * 0.005) * 1.5;
    }

    // 좌우 뒤집기
    const direction = (followMouse ? ((targetX >= posX) ? 1 : -1) : directionX);

    bonobono.style.left = posX + 'px';
    bonobono.style.top = posY + 'px';
    bonobono.style.transform = `scaleX(${direction})`;

    requestAnimationFrame(animateBonobono);
}

animateBonobono();
