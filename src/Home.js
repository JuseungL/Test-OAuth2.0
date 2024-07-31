// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout'); // 결제 페이지로 이동
    };

    return (
        <div>
            <h1>홈 화면</h1>
            <button onClick={handleCheckout}>결제하기</button>
        </div>
    );
};

export default Home;
