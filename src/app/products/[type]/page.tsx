import Link from "next/link";
import { notFound } from "next/navigation";
import { Car, Building2, ShoppingBag, Home, CalendarClock, CreditCard, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Dynamic content definitions based on product types
const productsData: Record<string, { title: string; subtitle: string; description: React.ReactNode; features: { title: string, desc: string }[]; icon: React.FC<any>; ctaText?: string; ctaLink?: string }> = {
    consumer: {
        title: "Потребительские залоговые кредиты",
        subtitle: "Финансовая свобода для реализации крупных планов без переплат",
        description: (
            <>
                <p className="mb-4">Наш сервис предлагает эффективное решение для получения крупных сумм на значимые цели — покупку или ремонт автомобиля, ремонт квартиры, а также другие важные события (путешествия, свадьба).</p>
                <p>Предоставляя ликвидное обеспечение, вы минимизируете риски сервиса. За счет этого мы можем предложить вам <b>увеличенные лимиты</b> и <b>сниженную процентную ставку</b> по сравнению со стандартными микрозаймами.</p>
            </>
        ),
        features: [
            { title: "Срок кредитования", desc: "Гибкие периоды от нескольких месяцев до 5 лет." },
            { title: "Залог", desc: "ПТС или недвижимость остаются в вашей собственности." },
            { title: "Целевое использование", desc: "Подходит для масштабных жизненных проектов." }
        ],
        icon: Car,
        ctaText: "Оставить заявку под залог",
        ctaLink: "/login"
    },
    business: {
        title: "Финансирование малого и среднего предпринимательства",
        subtitle: "Надежный капитал для непрерывного роста вашей компании",
        description: (
            <>
                <p className="mb-4">Развитие бизнеса требует стабильного притока средств. Наш продукт создан специально для компаний, которым нужно быстро пополнить оборотные средства, закупить новое оборудование или расширить сеть (например, открыть новые торговые точки).</p>
                <p>Мы рассматриваем в качестве залога транспортные средства или коммерческую/жилую недвижимость, что обеспечивает юридическую прозрачность и гарантирует вам выгодные бизнес-тарифы.</p>
            </>
        ),
        features: [
            { title: "Оборотный капитал", desc: "Быстрое покрытие кассовых разрывов и закупки." },
            { title: "Масштабирование", desc: "Средства на запуск новых направлений." },
            { title: "Индивидуальный график", desc: "Выплаты адаптированы под сезонность вашего бизнеса." }
        ],
        icon: Building2,
        ctaText: "Подать заявку для бизнеса",
        ctaLink: "/login"
    },
    bnpl: {
        title: "Buy Now, Pay Later (BNPL)",
        subtitle: "Рассрочка нового поколения для комфортного шопинга",
        description: (
            <>
                <p className="mb-4">Модель BNPL обеспечивает максимальное удобство: вы совершаете покупку в магазинах наших партнеров прямо сейчас, а расплачиваетесь за нее равными частями в течение нескольких месяцев.</p>
                <p>Это технологичное решение не требует первоначального взноса, скрытых страховок или дополнительных комиссий, если вы соблюдаете график. BNPL помогает распределять бюджет без стресса для кошелька.</p>
            </>
        ),
        features: [
            { title: "Оплата долями", desc: "Прозрачный график: обычно 4 или 6 равных платежей." },
            { title: "Моментально", desc: "Оформление прямо на кассе или в корзине интернет-магазина." },
            { title: "Никаких переплат", desc: "При соблюдении сроков вы платите только стоимость товара." }
        ],
        icon: ShoppingBag,
        ctaText: "Оформить BNPL-лимит",
        ctaLink: "/login"
    },
    collateral: {
        title: "Залоговые кредиты с крупным лимитом",
        subtitle: "Максимальные суммы под надежное обеспечение",
        description: (
            <>
                <p className="mb-4">Флагманский продукт нашей линейки, предназначенный для опытных заемщиков. Если вам нужна сумма, превышающая стандартные лимиты МФО, залоговое кредитование — оптимальный выбор.</p>
                <p>Ваше имущество продолжает работать на вас, пока вы пользуетесь предоставленным депозитом. Мы гарантируем полную конфиденциальность, быстрое оформление документов и премиальное сопровождение на весь период договора.</p>
            </>
        ),
        features: [
            { title: "Крупные суммы", desc: "Одобрение бюджетов, недоступных в стандартных тарифах." },
            { title: "Минимальная ставка", desc: "Самые выгодные условия благодаря обеспечению." },
            { title: "Быстрая оценка", desc: "Онлайн-предварительная оценка залога за 15 минут." }
        ],
        icon: Home,
        ctaText: "Рассчитать залог",
        ctaLink: "/login"
    },
    il: {
        title: "Индивидуальные займы (Installment Loans)",
        subtitle: "Финансовая поддержка с прогнозируемой нагрузкой",
        description: (
            <>
                <p className="mb-4">В отличие от традиционных займов «до зарплаты» (PDL), мы переходим на модель IL — займы с регулярными, заранее известными платежами (еженедельными или ежемесячными).</p>
                <p>Такой подход помогает вам более грамотно управлять личными финансами, избегать просрочек и равномерно распределять долговую нагрузку без неожиданных скачков.</p>
            </>
        ),
        features: [
            { title: "Регулярные платежи", desc: "Понятный график погашения 1 или 2 раза в месяц." },
            { title: "Долгосрочное партнерство", desc: "Отличный вариант как для новых, так и для текущих клиентов." },
            { title: "Финансовая стабильность", desc: "Отсутствие огромного единоразового перевода в конце срока." }
        ],
        icon: CalendarClock,
        ctaText: "Получить IL-займ",
        ctaLink: "/login"
    },
    "virtual-card": {
        title: "Виртуальная кредитная карта",
        subtitle: "Непрерывный доступ к финансовому резерву в смартфоне",
        description: (
            <>
                <p className="mb-4">Наше видение будущего — это моментальная эмиссия виртуальных карт с возобновляемым кредитным лимитом. Продукт позволяет вам расплачиваться в интернете и обычных терминалах (через Mir Pay).</p>
                <p>Лимит восстанавливается при каждом погашении. Наличие беспроцентного грейс-периода делает карту полноценным и крайне удобным инструментом на каждый день.</p>
            </>
        ),
        features: [
            { title: "Возобновляемый лимит", desc: "Погасили часть долга — средства снова доступны." },
            { title: "Грейс-период", desc: "Возможность пользоваться деньгами бесплатно до определенного срока." },
            { title: "Моментальный выпуск", desc: "Карта доступна в личном кабинете сразу после одобрения." }
        ],
        icon: CreditCard,
        ctaText: "Заказать виртуальную карту",
        ctaLink: "/login"
    }
};

export default async function ProductPage({ params }: { params: Promise<{ type: string }> }) {
    const resolvedParams = await params;
    const product = productsData[resolvedParams.type];

    // Fallback to 404 if the type doesn't match
    if (!product) {
        return notFound();
    }

    const Icon = product.icon;

    return (
        <div className="min-h-screen relative flex flex-col items-center bg-[var(--bg-color)] overflow-hidden">
            <div className="bg-shape shape-1 md:w-[500px] md:h-[500px] w-[300px] h-[300px]" style={{ right: 0, left: 'auto', opacity: 0.2 }}></div>
            <div className="bg-shape shape-2" style={{ top: '10%', opacity: 0.2 }}></div>

            <Header />

            <main className="flex-1 w-full max-w-5xl py-12 md:py-24 px-4 md:px-6 relative z-10 flex flex-col justify-center">
                <div className="mb-10 md:mb-14 text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 md:mb-8">
                        <Icon size={32} className="md:w-10 md:h-10" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 md:mb-6">
                        {product.title}
                    </h1>
                    <p className="text-lg md:text-2xl text-[#E84C22] font-semibold max-w-3xl mx-auto">
                        {product.subtitle}
                    </p>
                </div>

                <div className="glass p-6 md:p-14 rounded-3xl shadow-soft bg-white/80 border border-white/50">
                    <div className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 md:mb-12 max-w-3xl mx-auto text-left md:text-center">
                        {product.description}
                    </div>

                    <div className="border-t border-gray-200/60 pt-8 md:pt-10">
                        <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">Особенности и преимущества</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                            {product.features.map((feature, idx) => (
                                <div key={idx} className="bg-gray-50 p-5 md:p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#E84C22] flex items-center justify-center font-bold mb-3 md:mb-4">
                                        {idx + 1}
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 md:mt-14 text-center">
                        <Link href={product.ctaLink || "/login"} className="btn btn-primary btn-glow inline-flex border border-transparent items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-4 text-base md:text-lg rounded-full font-bold group hover:-translate-y-1 transition-transform w-full md:w-auto justify-center">
                            {product.ctaText || "Оформить продукт"}
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
