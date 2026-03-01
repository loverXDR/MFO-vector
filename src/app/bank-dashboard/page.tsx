"use client";

import { useSession, signOut } from "next-auth/react";

export default function BankDashboard() {
    const { data: session } = useSession();

    return (
        <div className="min-h-screen relative bg-gray-50">
            <nav className="header border-b border-gray-200 bg-white sticky top-0 z-50">
                <div className="container mx-auto px-6 h-16 flex justify-between items-center max-w-7xl">
                    <div className="font-bold text-lg flex items-center gap-2">
                        <span className="bg-black text-white px-2 py-1 rounded text-sm">B2B</span>
                        Панель Инвестора
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-600">{session?.user?.name} (Bank)</span>
                        <button onClick={() => signOut({ callbackUrl: '/' })} className="text-sm text-red-500 font-semibold hover:text-red-700">Выйти</button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-10 max-w-7xl">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Аналитика портфеля</h1>
                        <p className="text-gray-500 mt-2">Агрегированные данные об одобренных авансах платформы Заначка</p>
                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition">Выгрузить отчет .csv</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Объем выданных средств</h3>
                        <span className="text-3xl font-bold">12 450 000 ₽</span>
                        <div className="mt-2 text-sm text-green-600 font-medium">↑ 14% за месяц</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Средний ML-скор заемщиков</h3>
                        <span className="text-3xl font-bold">84.2%</span>
                        <div className="mt-2 text-sm text-green-600 font-medium">Высокая надежность портфеля</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Активных сделок</h3>
                        <span className="text-3xl font-bold">412</span>
                        <div className="mt-2 text-sm text-gray-400 font-medium">Средний чек: 30 200 ₽</div>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-6 text-gray-900">Управление лимитами (API Заглушка)</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center h-64 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className="text-gray-900 font-semibold text-lg">Автоматическое управление лимитами</h3>
                    <p className="text-gray-500 max-w-md mt-2">Ваша стратегия инвестирования полностью доверена ML-алгоритмам Заначки. В следующих версиях здесь появится ручная настройка риск-профиля.</p>
                </div>

            </main>
        </div>
    );
}
