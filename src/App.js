// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Home 컴포넌트 import
import PaymentCheckoutPage from './Payments'; // payments.js에서 import
import Success from './Success';

import { v4 as uuidv4 } from 'uuid';
import NextPage from './NextPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkout" element={<PaymentCheckoutPageWrapper />} />
                <Route path="/success" element={<Success />} />
                <Route path="/next-page" element={<NextPage />} />
            </Routes>
        </Router>
    );
};
const PaymentCheckoutPageWrapper = () => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MSwicm9sZSI6IltsaW9uNi5Ecmlua0d1aWRlLmNvbW1vbi5vYXV0aC5DdXN0b21PQXV0aDJVc2VyJDFAM2ZjODNmNjddIiwiaWF0IjoxNzIyMjY5Mjk0LCJleHAiOjMzMjU4MjY5Mjk0fQ.aO6YtoHuKWa1ywDHRmZT9A8bOOc3Kyvi6gUyqnn0MA0";

    const amount = {
        currency: "KRW",
        value: 3000,
    };

    const orderId = uuidv4(); // 랜덤하게 생성된 orderId
    const orderName = "보이스 라밸 1개월 구독권";
    const customerName = "이주승";
    const customerEmail = "juseung0619@gmail.com"

    return (
        <PaymentCheckoutPage token={token} amount={amount} orderId={orderId} orderName={orderName} customerName={customerName} customerEmail={customerEmail} />
    );
};

export default App;
