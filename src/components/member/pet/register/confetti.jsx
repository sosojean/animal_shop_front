import React from 'react';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

const Confetti = () => {
    const canvasStyles = {
        position: 'fixed',
        width: '1080px',
        height: '100vh',
        marginRight: '0px',
        marginTop: '0px',

        zIndex: '3',
        pointerEvents: 'none', // 클릭 이벤트 차단

    };

    const decorateOptions = (originalOptions) => {
        return {
            ...originalOptions,
            particleCount: 200, // 조각 개수 설정
            spread: 180, // 퍼짐 정도 설정
            startVelocity: 60, // 초기 속도 설정
            ticks: 200, // 애니메이션 지속 시간 설정
            origin:  { x: 0.5, y: 1 }, // 발사 위치 설정
            shapes: ['circle', 'circle', 'square'], // 이미지 배열을 shapes로 설정
            angle: 90, // 아래 방향 (위에서 아래로 발사)

            gravity: 1.5, // 중력 설정
        };
    };





    return (

        <Fireworks
            autorun={{ speed: 0.5, duration: 3 }}
            style={canvasStyles}
            decorateOptions={decorateOptions} // 함수 실행을 위해 괄호를 추가
        />
    )
};

export default Confetti;