import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
    title: "О технологиях | Заначка",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen relative flex flex-col items-center bg-[var(--bg-color)] overflow-hidden">
            <div className="bg-shape shape-1 md:w-[400px] md:h-[400px] w-[300px] h-[300px]" style={{ right: 0, left: 'auto', opacity: 0.3 }}></div>
            <div className="bg-shape shape-2" style={{ top: '20%', opacity: 0.2 }}></div>

            <Header />

            <main className="flex-1 w-full max-w-7xl pt-10 md:pt-20 pb-16 md:pb-32 px-4 md:px-6 relative z-10">
                <div className="mb-12 md:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 leading-tight">Как работают наши технологии: <br className="hidden md:block" /><span className="text-[#E84C22]">просто о сложном</span></h1>
                        <p className="text-base md:text-xl text-gray-600 leading-relaxed mb-6 md:mb-8">
                            Многие привыкли, что финансовые услуги — это долго, сложно и связано с кучей бумажек. Мы решили это изменить. Вместо живого сотрудника, который может устать или ошибиться, у нас работает умная программа (искусственный интеллект).
                        </p>

                        <div className="glass p-6 md:p-8 rounded-3xl shadow-soft">
                            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Как это выглядит для вас:</h3>
                            <ul className="space-y-4 md:space-y-6">
                                <li className="flex gap-3 md:gap-4">
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-yellow-400 shrink-0 mt-1"></div>
                                    <div>
                                        <strong className="text-base md:text-lg block mb-1">Минимум действий:</strong> Вы просто заполняете небольшую анкету на сайте. Это занимает пару минут.
                                    </div>
                                </li>
                                <li className="flex gap-3 md:gap-4">
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-yellow-400 shrink-0 mt-1"></div>
                                    <div>
                                        <strong className="text-base md:text-lg block mb-1">Умный анализ:</strong> Наш искусственный интеллект анализирует вашу заявку мгновенно. Он смотрит не только на кредитную историю, но и на множество других параметров.
                                    </div>
                                </li>
                                <li className="flex gap-3 md:gap-4">
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-yellow-400 shrink-0 mt-1"></div>
                                    <div>
                                        <strong className="text-base md:text-lg block mb-1">Моментальный результат:</strong> Компьютер принимает решение за секунды, без звонков вашим родственникам или работодателю. Если вам одобряют аванс — деньги тут же отправляются на вашу карту.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="glass bg-[#1A1A1A] text-white p-6 md:p-10 rounded-3xl font-mono text-xs md:text-sm leading-relaxed overflow-x-auto shadow-2xl md:skew-y-2 transform md:rotate-1">
                        <pre className="text-gray-300">
                            <span className="text-gray-500">{`// Так видит вас робот (в миллисекундах)`}</span><br /><br />
                            <span className="text-yellow-400">заявка</span> = получитьДанные(клиент);<br /><br />
                            <span className="text-blue-400">если</span> (Нейросеть.проверить(заявка) == <span className="text-green-400">"Надежно"</span>) {'{'}<br />
                            <span className="text-purple-400 mt-1 block pl-2 md:pl-4">выдатьАванс</span>(карта_клиента);<br />
                            {'}'} <span className="text-blue-400">иначе</span> {'{'}<br />
                            <span className="text-purple-400 mt-1 block pl-2 md:pl-4">предложитьДругойВариант</span>();<br />
                            {'}'}
                        </pre>
                    </div>
                </div>

                <div className="mb-16 md:mb-24">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 md:mb-4">О нас и наших планах</h2>
                        <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
                            МФК «Заначка» — ваш надёжный финансовый партнёр. Мы строим современную экосистему умных сервисов, где технологии работают на ваши интересы.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {/* Current Focus */}
                        <div className="glass p-6 md:p-10 rounded-3xl shadow-soft border-t-4 border-[#E84C22]">
                            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-3">
                                Сегодня
                            </h3>
                            <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-6 leading-relaxed">
                                Мы концентрируемся на технологичном микрокредитовании с понятными, регулярными платежами. Наша цель — предложить вам честный продукт без скрытых комиссий с моментальным одобрением через ИИ-скоринг. Если вы столкнулись с финансовыми трудностями в других организациях, мы готовы проконсультировать, помочь реструктуризировать долг и предложить комфортное рефинансирование.
                            </p>
                            <ul className="space-y-2 md:space-y-3 text-sm md:text-base font-medium text-gray-700">
                                <li className="flex items-center gap-2 md:gap-3"><div className="w-2 h-2 rounded-full bg-[#E84C22]"></div> Моментальная выдача на карту</li>
                                <li className="flex items-center gap-2 md:gap-3"><div className="w-2 h-2 rounded-full bg-[#E84C22]"></div> Прозрачные и регулярные платежи</li>
                                <li className="flex items-center gap-2 md:gap-3"><div className="w-2 h-2 rounded-full bg-[#E84C22]"></div> Помощь в рефинансировании кредитов</li>
                            </ul>
                        </div>

                        {/* Future Vision */}
                        <div className="glass p-6 md:p-10 rounded-3xl shadow-soft bg-gradient-to-br from-gray-50 to-orange-50/30">
                            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-3 text-black">
                                Взгляд в будущее
                            </h3>
                            <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-6 leading-relaxed">
                                Мы стремительно расширяем продуктовую линейку, чтобы вы получали все финансовые инструменты в одном месте. В ближайшие годы наша платформа пополнится инновационными сервисами для повседневных покупок и масштабных планов.
                            </p>
                            <ul className="space-y-2 md:space-y-3 text-sm md:text-base font-medium text-gray-700">
                                <li className="flex items-start gap-2 md:gap-3"><div className="w-2 h-2 rounded-full bg-gray-900 mt-2"></div> <span className="flex-1">Виртуальные карты с возобновляемым лимитом</span></li>
                                <li className="flex items-start gap-2 md:gap-3"><div className="w-2 h-2 rounded-full bg-gray-900 mt-2"></div> <span className="flex-1">Удобные рассрочки (BNPL) в любимых магазинах</span></li>
                                <li className="flex items-start gap-2 md:gap-3"><div className="w-2 h-2 rounded-full bg-gray-900 mt-2"></div> <span className="flex-1">Залоговые кредиты на крупные покупки</span></li>
                                <li className="flex items-start gap-2 md:gap-3"><div className="w-2 h-2 rounded-full bg-gray-900 mt-2"></div> <span className="flex-1">Финансирование среднего и малого бизнеса</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="glass p-8 md:p-12 rounded-3xl shadow-soft max-w-4xl mx-auto text-center border-t-4 border-[#E84C22]">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">А что с безопасностью?</h2>
                    <p className="text-base md:text-lg text-gray-600 mb-0 max-w-2xl mx-auto">
                        Все ваши данные (паспорт, телефон, номер карты) шифруются специальными банковскими алгоритмами. Ни один человек в нашей компании не может их просто так прочитать. Мы гарантируем, что ваши контактные данные никогда не будут проданы мошенникам или сторонним организациям.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
