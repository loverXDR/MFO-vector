"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function UserDashboard() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("overview");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // New Loan State
    const [amount, setAmount] = useState(15000);
    const [term, setTerm] = useState(7);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const requestAdvance = async () => {
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch("/api/scoring", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, termDays: term })
            });
            const data = await res.json();
            setResult(data);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const navItems = [
        { id: "overview", label: "Обзор", icon: "📊" },
        { id: "new_loan", label: "Новый аванс", icon: "💸" },
        { id: "history", label: "История", icon: "📋" },
        { id: "profile", label: "Профиль", icon: "👤" }
    ];

    return (
        <div className="min-h-screen relative bg-[var(--bg-color)] flex overflow-hidden">
            <div className="bg-shape shape-1" style={{ width: '400px', height: '400px', opacity: 0.3 }}></div>
            <div className="bg-shape shape-2" style={{ width: '400px', height: '400px', opacity: 0.2 }}></div>

            {/* Mobile Topbar */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-[var(--border-glass)] z-50 flex items-center justify-between px-6 shadow-sm">
                <Link href="/" className="font-bold text-lg flex items-center gap-2">
                    <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center text-sm">₽</div>
                    Заначка
                </Link>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-2xl text-gray-800 focus:outline-none">
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`fixed md:relative top-0 left-0 h-full w-64 bg-white/80 backdrop-blur-xl border-r border-[var(--border-glass)] z-40 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 pt-16 md:pt-0 flex flex-col shadow-xl md:shadow-none`}>
                <Link href="/" className="p-4 hidden md:flex items-center gap-2 hover:opacity-80 transition">
                    <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">₽</div>
                    <div className="font-bold text-xl tracking-tight text-black">Заначка</div>
                </Link>

                <div className="flex-1 py-4 px-3 flex flex-col gap-1">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${activeTab === item.id ? 'bg-[var(--accent-orange-light)] text-[var(--accent-orange)] font-bold shadow-sm' : 'hover:bg-gray-100 text-gray-600 font-medium'}`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="p-6 mt-auto border-t border-[var(--border-glass)] bg-white/40">
                    <div className="mb-4">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Ваш аккаунт</p>
                        <p className="font-semibold text-sm text-gray-900 truncate">{session?.user?.email}</p>
                    </div>
                    <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full py-3 rounded-xl border border-red-200 bg-white text-red-500 hover:bg-red-50 hover:border-red-300 font-bold transition text-sm shadow-sm hover:shadow-md">
                        Выйти из аккаунта
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 h-screen overflow-y-auto w-full relative z-10 pt-16 md:pt-0">
                <div className="p-4 md:p-8 max-w-4xl mx-auto pb-16">
                    <header className="mb-6 lg:mb-8 flex justify-between items-end">
                        <div>
                            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3 text-black">Добрый день! 👋</h1>
                            <p className="text-gray-500 font-medium text-base">Ваша финансовая панель управления</p>
                        </div>
                    </header>

                    {/* Render Tab Content */}
                    <div className="transition-opacity duration-300">
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                                <div className="glass p-6 rounded-2xl shadow-soft flex flex-col justify-between relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent-orange)] rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                                    <div className="relative z-10">
                                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Доступный лимит</p>
                                        <h2 className="text-3xl border-b border-gray-100/50 pb-3 font-black mb-4 text-gray-900">50 000 ₽</h2>
                                        <p className="text-green-600 font-bold flex items-center gap-2 text-sm bg-green-50 w-fit px-3 py-1.5 rounded-full">
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block animate-pulse"></span> Лимит одобрен
                                        </p>
                                    </div>
                                    <div className="mt-10 relative z-10">
                                        <button onClick={() => setActiveTab('new_loan')} className="btn btn-primary btn-glow px-4 py-3 w-full text-sm">Получить деньги</button>
                                    </div>
                                </div>

                                <div className="glass p-6 rounded-2xl shadow-soft flex flex-col justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Текущий займ</p>
                                        <h2 className="text-2xl font-bold mb-1 text-gray-300">0 ₽</h2>
                                        <p className="text-gray-400 font-medium">Нет активных задолженностей</p>
                                    </div>
                                    <div className="mt-8">
                                        <div className="h-[44px] w-full rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 font-bold text-sm">
                                            Погасить долг
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-2 glass p-6 rounded-2xl shadow-soft mt-2 relative overflow-hidden">
                                    <h3 className="font-bold text-xl mb-4 text-gray-900">Специально для вас</h3>
                                    <div className="bg-gradient-to-r from-[var(--accent-orange)]/10 via-orange-100 to-[#FFBD47]/10 border border-[var(--accent-orange)]/20 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition">
                                        <div>
                                            <div className="inline-block bg-[var(--accent-orange)] text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-[0_4px_10px_rgba(232,76,34,0.3)]">АКЦИЯ</div>
                                            <h4 className="font-extrabold text-[#E84C22] text-lg mb-1">0% на первый срок до 7 дней!</h4>
                                            <p className="text-base text-gray-700 max-w-lg">Оформите первый займ и не платите проценты за первую неделю. ML-алгоритмы подберут лучшие условия.</p>
                                        </div>
                                        <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md text-3xl">
                                            🎁
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'new_loan' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="glass p-6 rounded-2xl shadow-soft relative">
                                    <h2 className="text-lg font-bold mb-4 text-gray-900">Параметры аванса</h2>

                                    <div className="slider-group mb-6">
                                        <div className="slider-labels flex justify-between font-semibold text-gray-600 mb-4 items-end">
                                            <label className="uppercase tracking-wider text-xs font-bold">Сумма</label>
                                            <span className="text-2xl font-extrabold text-black">{amount.toLocaleString()} ₽</span>
                                        </div>
                                        <input type="range" min="1000" max="50000" step="1000" value={amount} onChange={e => setAmount(Number(e.target.value))} />
                                        <div className="flex justify-between text-xs text-gray-400 mt-3 font-medium">
                                            <span>1 000 ₽</span>
                                            <span>50 000 ₽</span>
                                        </div>
                                    </div>

                                    <div className="slider-group mb-8">
                                        <div className="slider-labels flex justify-between font-semibold text-gray-600 mb-4 items-end">
                                            <label className="uppercase tracking-wider text-xs font-bold">Срок</label>
                                            <span className="text-2xl font-extrabold text-black">{term} дней</span>
                                        </div>
                                        <input type="range" min="1" max="30" step="1" value={term} onChange={e => setTerm(Number(e.target.value))} />
                                        <div className="flex justify-between text-xs text-gray-400 mt-3 font-medium">
                                            <span>1 день</span>
                                            <span>30 дней</span>
                                        </div>
                                    </div>

                                    <div className="bg-white/60 p-4 rounded-xl mb-6 border border-white/50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
                                        {term <= 7 && amount <= 15000 && (
                                            <div className="flex items-center gap-2 text-sm font-bold text-[#E84C22] bg-[#E84C22]/10 p-3 rounded-xl mb-4 border border-[#E84C22]/20">
                                                🔥 Акция 0% активна
                                            </div>
                                        )}
                                        <div className="flex justify-between text-gray-600 text-sm mb-3">
                                            <span>Вы берете:</span>
                                            <span className="font-semibold text-gray-900 text-base">{amount.toLocaleString()} ₽</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600 text-sm mb-5">
                                            <span>Проценты ({term <= 7 && amount <= 15000 ? '0' : '0.8'}% в день):</span>
                                            <span className="font-semibold text-gray-900 text-base">{term <= 7 && amount <= 15000 ? 0 : Math.round(amount * 0.008 * term).toLocaleString()} ₽</span>
                                        </div>
                                        <div className="flex justify-between border-t border-gray-200/50 pt-5 flex items-center">
                                            <span className="font-bold text-gray-900 text-lg">К возврату:</span>
                                            <span className="text-2xl font-black text-[#E84C22] tracking-tighter">
                                                {(term <= 7 && amount <= 15000 ? amount : amount + Math.round(amount * 0.008 * term)).toLocaleString()} ₽
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={requestAdvance}
                                        disabled={loading}
                                        className={`btn btn-primary btn-glow btn-block w-full py-3 text-base ${loading ? 'opacity-70 cursor-wait' : ''}`}
                                    >
                                        {loading ? "Анализ ML-модели..." : "Оформить заявку"}
                                    </button>
                                </div>

                                <div className="glass p-6 rounded-2xl shadow-soft">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Статус заявки</h2>

                                    {!result && !loading && (
                                        <div className="h-[300px] flex flex-col items-center justify-center text-center p-8 text-gray-400 border-2 border-dashed border-gray-200/60 rounded-[24px] bg-white/20">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner">🤖</div>
                                            <h4 className="font-bold text-gray-600 text-base mb-1">Ожидание заявки</h4>
                                            <p className="font-medium text-sm">Наш ИИ готов рассмотреть вашу заявку. Введите параметры и нажмите кнопку.</p>
                                        </div>
                                    )}

                                    {loading && (
                                        <div className="h-[300px] flex flex-col items-center justify-center text-[#E84C22] bg-white/40 rounded-[24px]">
                                            <div className="relative w-16 h-16 mb-6">
                                                <div className="absolute inset-0 border-4 border-[#E84C22]/20 rounded-full"></div>
                                                <div className="absolute inset-0 border-4 border-[#E84C22] border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                            <span className="font-bold text-xl animate-pulse mb-3 text-gray-900">ИИ анализирует профиль...</span>
                                            <div className="space-y-2 text-center text-sm font-medium text-gray-500">
                                                <p className="flex items-center justify-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span> Скорринг бюро кредитных историй</p>
                                                <p className="flex items-center justify-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping delay-75"></span> Оценка поведенческих факторов</p>
                                                <p className="flex items-center justify-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping delay-150"></span> Проверка антифрод</p>
                                            </div>
                                        </div>
                                    )}

                                    {result && !loading && (
                                        <div className="h-full flex flex-col justify-center">
                                            <div className={`p-6 rounded-2xl ${result.decision === 'APPROVED' ? 'bg-gradient-to-b from-green-50 to-white border border-green-200 shadow-[0_20px_40px_-15px_rgba(74,222,128,0.2)]' : 'bg-gradient-to-b from-red-50 to-white border border-red-200 shadow-[0_20px_40px_-15px_rgba(248,113,113,0.2)]'}`}>

                                                <div className="text-center mb-8">
                                                    <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm">
                                                        {result.decision === 'APPROVED' ? '🎉' : '🛡️'}
                                                    </div>
                                                    <h3 className={`text-2xl font-black ${result.decision === 'APPROVED' ? 'text-green-600' : 'text-red-500'}`}>
                                                        {result.decision === 'APPROVED' ? 'ОДОБРЕНО' : 'ОТКАЗ'}
                                                    </h3>
                                                </div>

                                                <div className="space-y-4 pt-6 border-t border-gray-200/50">
                                                    <div className="flex justify-between items-center text-base">
                                                        <span className="font-bold text-gray-600">ML Уверенность:</span>
                                                        <span className="font-black text-xl text-gray-900 bg-white px-4 py-1.5 rounded-xl shadow-sm border border-gray-100">{Math.round(result.score * 100)}%</span>
                                                    </div>

                                                    {result.decision === 'APPROVED' ? (
                                                        <div className="mt-8 pt-4">
                                                            <p className="text-sm text-green-800 font-semibold bg-green-100/50 p-4 rounded-2xl border border-green-200/50 leading-relaxed text-center">
                                                                Средства готовы к переводу. Зачисление займет не более 1 минуты.
                                                            </p>
                                                            <button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition shadow-[0_10px_20px_rgba(34,197,94,0.3)] text-lg hover:shadow-[0_15px_25px_rgba(34,197,94,0.4)] hover:-translate-y-1 transform">
                                                                Перевести на карту
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-red-800 font-semibold bg-red-100/50 p-5 rounded-2xl border border-red-200/50 mt-8 text-center leading-relaxed">
                                                            К сожалению, алгоритм выявил высокие риски. Попробуйте запросить меньшую сумму или обратитесь в поддержку.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="glass p-6 md:p-8 rounded-3xl shadow-soft">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Последние операции</h2>
                                    <button className="text-sm font-bold text-[var(--accent-orange)] hover:underline">Скачать выписку</button>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { date: '12 Марта 2026', time: '14:30', type: 'Погашение долга', amount: '- 15 000 ₽', status: 'Успешно', isPositive: false },
                                        { date: '05 Марта 2026', time: '09:15', type: 'Выдача аванса', amount: '+ 15 000 ₽', status: 'Успешно', isPositive: true },
                                        { date: '10 Февраля 2026', time: '18:45', type: 'Погашение долга', amount: '- 8 500 ₽', status: 'Успешно', isPositive: false },
                                        { date: '01 Февраля 2026', time: '11:20', type: 'Выдача аванса', amount: '+ 8 000 ₽', status: 'Успешно', isPositive: true },
                                    ].map((tx, i) => (
                                        <div key={i} className="flex justify-between items-center p-6 bg-white/40 hover:bg-white/80 rounded-[20px] transition border border-gray-100/50 hover:shadow-md cursor-default group">
                                            <div className="flex items-center gap-5">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-110 transition ${tx.isPositive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                                    {tx.isPositive ? '↓' : '↑'}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-base mb-0.5">{tx.type}</p>
                                                    <p className="text-sm text-gray-500 font-medium">{tx.date} <span className="text-gray-300 mx-1">•</span> {tx.time}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-black text-lg mb-0.5 ${tx.isPositive ? 'text-green-500' : 'text-gray-900'}`}>{tx.amount}</p>
                                                <p className="text-xs text-green-600 font-bold uppercase tracking-wider bg-green-50 inline-block px-2 py-1 rounded-md">{tx.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="glass p-6 md:p-8 rounded-3xl shadow-soft max-w-3xl">
                                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                                    <div className="w-16 h-16 rounded-full text-2xl bg-gradient-to-tr from-[var(--accent-orange)] to-[#FFBD47] text-white flex items-center justify-center text-4xl font-bold shadow-lg shadow-orange-200">
                                        {session?.user?.name?.charAt(0) || "П"}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">{session?.user?.name || "Пользователь Системы"}</h2>
                                        <p className="text-gray-500 font-medium bg-white px-3 py-1 rounded-lg inline-block border border-gray-100 shadow-sm">ID: 8092-2341-99</p>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold mb-4 text-gray-900">Личные данные</h3>
                                <div className="space-y-3 mb-6">
                                    <div className="bg-white/60 p-4 rounded-xl border border-gray-100 flex justify-between items-center hover:bg-white transition cursor-pointer group">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Email адрес</p>
                                            <p className="font-bold text-base text-gray-900">{session?.user?.email}</p>
                                        </div>
                                        <div className="text-gray-300 group-hover:text-gray-500 transition">✎</div>
                                    </div>

                                    <div className="bg-white/60 p-4 rounded-xl border border-gray-100 flex justify-between items-center hover:bg-white transition">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Статус верификации Госуслуг</p>
                                            <p className="font-bold text-lg text-green-600 flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                Подтвержден
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold mb-4 text-gray-900">Безопасность</h3>
                                <div className="space-y-4">
                                    <button className="w-full flex justify-between items-center bg-white/60 p-4 rounded-xl border border-gray-100 hover:bg-white transition text-left group">
                                        <div>
                                            <p className="font-bold text-base text-gray-900 mb-1">Сменить пароль</p>
                                            <p className="text-sm text-gray-500">Последнее изменение: 2 месяца назад</p>
                                        </div>
                                        <div className="text-gray-300 group-hover:text-gray-500 transition px-4 text-xl">→</div>
                                    </button>
                                </div>

                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}
