import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Условия и Лимиты | Заначка",
};

export default function ConditionsPage() {
    return (
        <div className="min-h-screen relative flex flex-col items-center bg-[var(--bg-color)] overflow-hidden">
            <div className="bg-shape shape-1" style={{ opacity: 0.2 }}></div>

            <Header />

            <main className="flex-1 w-full max-w-7xl py-10 md:py-20 px-4 md:px-6 relative z-10">
                <div className="text-center mb-10 md:mb-16">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6">Честные условия для <br className="hidden md:block" />финансового резерва</h1>
                    <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">Без мелкого шрифта и скрытых комиссий. Вы заранее знаете, сколько вернете.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
                    <div className="glass p-6 md:p-8 rounded-3xl shadow-soft border-t-4 border-[#E84C22]">
                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Стартовый</h3>
                        <div className="text-3xl md:text-4xl font-extrabold text-[#E84C22] mb-2">0%*</div>
                        <div className="text-xs md:text-sm text-gray-500 mb-5 md:mb-6">*Первые 7 дней абсолютно бесплатно. Для новых клиентов.</div>
                        <ul className="space-y-2 md:space-y-3 text-sm md:text-base font-medium text-gray-700">
                            <li className="flex justify-between flex-wrap gap-2 border-b pb-2"><span>Лимит:</span> <strong>до 15 000 ₽</strong></li>
                            <li className="flex justify-between flex-wrap gap-2 border-b pb-2"><span>Срок:</span> <strong>до 21 дня</strong></li>
                            <li className="flex justify-between flex-wrap gap-2"><span>Ставка с 8 дня:</span> <strong>0.8% в день</strong></li>
                        </ul>
                    </div>

                    <div className="glass p-6 md:p-8 rounded-3xl shadow-soft relative transform lg:-translate-y-4 border-2 border-[#E84C22]">
                        <div className="absolute top-0 right-4 md:right-8 transform -translate-y-1/2 bg-[#E84C22] text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full uppercase tracking-wider">
                            Популярный
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Доверительный</h3>
                        <div className="text-3xl md:text-4xl font-extrabold text-black mb-2">0.6%</div>
                        <div className="text-xs md:text-sm text-gray-500 mb-5 md:mb-6">Сниженная ставка со второго обращения.</div>
                        <ul className="space-y-2 md:space-y-3 text-sm md:text-base font-medium text-gray-700">
                            <li className="flex justify-between flex-wrap gap-2 border-b pb-2"><span>Лимит:</span> <strong>до 30 000 ₽</strong></li>
                            <li className="flex justify-between flex-wrap gap-2 border-b pb-2"><span>Срок:</span> <strong>до 45 дней</strong></li>
                            <li className="flex justify-between flex-wrap gap-2"><span>Кэшбэк:</span> <strong>5% от суммы</strong></li>
                        </ul>
                    </div>

                    <div className="glass p-6 md:p-8 rounded-3xl shadow-soft">
                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">VIP Резерв</h3>
                        <div className="text-3xl md:text-4xl font-extrabold text-[#E84C22] mb-2">0.4%</div>
                        <div className="text-xs md:text-sm text-gray-500 mb-5 md:mb-6">Индивидуальные условия для зарплатных клиентов.</div>
                        <ul className="space-y-2 md:space-y-3 text-sm md:text-base font-medium text-gray-700">
                            <li className="flex justify-between flex-wrap gap-2 border-b pb-2"><span>Лимит:</span> <strong>до 100 000 ₽</strong></li>
                            <li className="flex justify-between flex-wrap gap-2 border-b pb-2"><span>Срок:</span> <strong>до 180 дней</strong></li>
                            <li className="flex justify-between flex-wrap gap-2"><span>Особое:</span> <strong>Кредитные каникулы</strong></li>
                        </ul>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
