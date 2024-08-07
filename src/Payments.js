import React, { useEffect, useState } from 'react';
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'; // Axios를 import합니다.



const PaymentCheckoutPage = ({ token }) => {
    // 사용자가 지정한 결제 정보
    const amount = {
        currency: "KRW",
        value: 3000,
    };

    const orderId = uuidv4(); // 랜덤하게 생성된 orderId
    const orderName = "보이스 라밸 1개월 구독권";
    const customerName = "이주승";
    const customerEmail = "juseung0619@gmail.com";

    const decoded = jwtDecode(token);
    const [payment, setPayment] = useState(null);

    useEffect(() => {
        async function fetchPayment() {
            try {
                // 모듈 임포트 연동방식
                const tossPayments = await loadTossPayments(clientKey);
                const payment = tossPayments.payment({ customerKey });
                setPayment(payment);
            } catch (error) {
                console.error("Error fetching payment:", error);
            }
        }
        fetchPayment();
    }, []);
    const [isProcessing, setIsProcessing] = useState(false); // 결제 처리 상태 추가
    async function requestPayment() {
        if (!payment) {
            console.error("Payment instance is not initialized.");
            return;
        }
        setIsProcessing(true);

        // 먼저 서버에 orderId를 전송
        try {
            console.log(token);
            const response = await sendOrderIdToServer(orderId, token);
            // 서버에 전송 성공
            console.log("Order ID sent to server:", response.data);

            // 결제 요청 시작
            const paymentResult = await payment.requestPayment({
                method: "CARD",
                amount: {
                    currency: amount.currency,
                    value: amount.value,
                },
                orderId: orderId,
                orderName: orderName,
                successUrl: `${window.location.origin}/success`,
                failUrl: `${window.location.origin}/fail`,
                customerName: customerName,
                customerEmail: customerEmail,
                card: {
                    useEscrow: false,
                    flowMode: "DEFAULT",
                    useCardPoint: false,
                    useAppCardOnly: false,
                },
            });
        } catch (error) {
            console.error("Payment request failed:", error);
        } finally {
            setIsProcessing(false); // 처리 완료
        }
    }

    async function sendOrderIdToServer(orderId, token) {
        try {
            console.log(orderId)
            // 필요한 결제 정보를 서버로 전송합니다.
            // const response = await axios.post('http://localhost:8080/api/v1/payments', {
            const response = await axios.post('https://www.drinkguide.store/api/v1/payments', {
                "orderId": orderId,
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`, // Bearer 토큰 추가
                    'Content-Type': 'application/json' // JSON 형식으로 설정
                }
            });
            return response; // 서버 응답 반환
        } catch (error) {
            console.error("Failed to send order ID to server:", error);
            throw error; // 에러 발생 시 다시 throw
        }
    }

    return (
        <div>
            <h2>결제 정보</h2>
            <p>금액: {amount.value} {amount.currency}</p>
            <button onClick={requestPayment}>결제 요청</button>
        </div>
    );
};

export default PaymentCheckoutPage;
