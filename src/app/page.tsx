"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const { data: session } = useSession();
  const [loanAmount, setLoanAmount] = useState(15000);
  const [loanDays, setLoanDays] = useState(7);
  const [promoVisible, setPromoVisible] = useState(true);

  // Constants
  const BASE_RATE = 0.008; // 0.8% per day
  const PROMO_DAYS_LIMIT = 7;
  const PROMO_AMOUNT_LIMIT = 15000;

  useEffect(() => {
    // 0% promotion logic check
    if (loanDays <= PROMO_DAYS_LIMIT && loanAmount <= PROMO_AMOUNT_LIMIT) {
      setPromoVisible(true);
    } else {
      setPromoVisible(false);
    }
  }, [loanAmount, loanDays]);

  let totalRepayment;
  let savings = 0;

  if (promoVisible) {
    totalRepayment = loanAmount;
    savings = Math.round(loanAmount * BASE_RATE * loanDays);
  } else {
    // Calculate according to standard tariff
    const standardInterest = loanAmount * BASE_RATE * loanDays;
    totalRepayment = loanAmount + Math.round(standardInterest);
  }

  return (
    <div className="min-h-screen relative flex flex-col items-center overflow-hidden">
      {/* Dynamic Backgrounds */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>

      <Header />

      <main className="flex-1 w-full flex items-center justify-center relative z-10 my-10 md:my-20">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 max-w-7xl items-center">

          <div className="hero-content text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="badge mb-4">Доступно по всей России</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 md:mb-6">
              Умный аванс до зарплаты <br className="hidden md:block" /> <span>без переплат</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-8 md:mb-10 max-w-lg">
              Забудьте о микрозаймах со скрытыми процентами. Мы одобряем честные финансовые резервы с помощью ML-моделей за 2 минуты.
            </p>
            <ul className="hero-list space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg text-gray-700 text-left">
              <li className="relative pl-8 before:absolute before:content-[''] before:left-0 before:top-1.5 md:before:top-2 before:w-3 md:before:w-4 before:h-3 md:before:h-4 before:bg-yellow-400 before:rounded-full">Первые 7 дней — <strong>0% годовых</strong></li>
              <li className="relative pl-8 before:absolute before:content-[''] before:left-0 before:top-1.5 md:before:top-2 before:w-3 md:before:w-4 before:h-3 md:before:h-4 before:bg-yellow-400 before:rounded-full">Кэшбэк 5% за вовремя закрытые лимиты</li>
              <li className="relative pl-8 before:absolute before:content-[''] before:left-0 before:top-1.5 md:before:top-2 before:w-3 md:before:w-4 before:h-3 md:before:h-4 before:bg-yellow-400 before:rounded-full">Только паспорт, без скрытых страховок</li>
            </ul>
          </div>

          <div className="calculator-wrapper w-full max-w-md mx-auto lg:max-w-none">
            <div className="glass calculator-card p-6 md:p-10 rounded-3xl shadow-xl w-full">
              <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center md:text-left">Рассчитайте условия</h3>

              <div className="slider-group mb-6 md:mb-8">
                <div className="slider-labels flex justify-between font-semibold text-gray-600 mb-3 md:mb-4">
                  <label className="text-sm md:text-base">Сколько вам нужно?</label>
                  <span className="val-display text-2xl md:text-3xl font-extrabold text-black">{loanAmount.toLocaleString("ru-RU")} ₽</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="30000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full"
                />
                <div className="slider-bounds flex justify-between text-[10px] md:text-xs text-gray-400 font-medium mt-2">
                  <span>1 000 ₽</span>
                  <span>30 000 ₽</span>
                </div>
              </div>

              <div className="slider-group mb-6 md:mb-8">
                <div className="slider-labels flex justify-between font-semibold text-gray-600 mb-3 md:mb-4">
                  <label className="text-sm md:text-base">На какой срок?</label>
                  <span className="val-display text-2xl md:text-3xl font-extrabold text-black">{loanDays} дн.</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={loanDays}
                  onChange={(e) => setLoanDays(Number(e.target.value))}
                  className="w-full"
                />
                <div className="slider-bounds flex justify-between text-[10px] md:text-xs text-gray-400 font-medium mt-2">
                  <span>1 день</span>
                  <span className={promoVisible ? "promo-hint text-[#E84C22]" : ""}>7 дней (0%)</span>
                  <span>30 дней</span>
                </div>
              </div>

              <div className="calc-result bg-white/50 backdrop-blur-md p-4 md:p-6 rounded-2xl mb-6 md:mb-8 border border-white/50">
                {promoVisible && (
                  <div className="promo-alert flex flex-col md:flex-row bg-[#E84C22]/10 text-[#E84C22] p-3 rounded-lg mb-4 md:mb-5 font-semibold text-xs md:text-sm justify-between gap-1 border border-[#E84C22]/20 text-center md:text-left">
                    <span>🔥 Акция 0% активна</span>
                    <span>Экономия {savings.toLocaleString("ru-RU")} ₽</span>
                  </div>
                )}

                <div className="result-row flex justify-between text-gray-600 mb-2 md:mb-3 text-base md:text-lg">
                  <span>Вы берете:</span>
                  <strong className="text-black font-bold">{loanAmount.toLocaleString("ru-RU")} ₽</strong>
                </div>
                <div className="result-row flex justify-between text-gray-600 mb-2 md:mb-3 text-base md:text-lg">
                  <span>Проценты:</span>
                  <strong className="text-black font-bold">{promoVisible ? 0 : Math.round(loanAmount * BASE_RATE * loanDays).toLocaleString("ru-RU")} ₽</strong>
                </div>

                <div className="result-row total mt-4 pt-4 border-t border-gray-200/50 flex justify-between items-center">
                  <span className="text-lg md:text-xl font-bold text-black">К возврату:</span>
                  <strong className="text-2xl md:text-3xl text-[#E84C22] tracking-tighter">{totalRepayment.toLocaleString("ru-RU")} ₽</strong>
                </div>
              </div>

              <div className="d-block w-full text-center">
                {!session ? (
                  <Link href="/login" className="btn btn-primary btn-glow btn-block w-full py-3 md:py-4 md:text-lg">Получить аванс</Link>
                ) : (
                  <Link href="/dashboard" className="btn btn-primary btn-glow btn-block w-full py-3 md:py-4 md:text-lg">Оформить заявку в кабинете</Link>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
