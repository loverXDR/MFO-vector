import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer bg-[#111] text-white py-12 md:py-16 w-full relative z-20 mt-auto">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="footer-inner grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-12">
                    <div className="footer-info col-span-1 md:col-span-2">
                        <div className="logo logo-footer flex items-center gap-3">
                            <div className="logo-icon bg-white text-black w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl">
                                ₽
                            </div>
                            <div className="logo-text text-white text-2xl font-bold tracking-tight">Заначка</div>
                        </div>
                        <p className="mt-6 text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
                            Современный финансовый сервис с использованием ML.<br className="hidden md:block" />
                            Работаем для вас 24/7 по всей России.
                        </p>
                    </div>
                    <div className="footer-contacts">
                        <h4 className="text-white mb-4 md:mb-5 font-semibold">Служба поддержки</h4>
                        <span className="phone block text-2xl md:text-3xl font-extrabold text-white mb-4 md:mb-5 hover:text-[#E84C22] transition-colors">
                            8 (800) 123-45-67
                        </span>
                        <div className="messengers flex flex-wrap gap-4 md:gap-5">
                            <a href="#" className="bot-link text-yellow-400 font-semibold hover:text-white transition">Telegram бот</a>
                            <a href="#" className="bot-link text-yellow-400 font-semibold hover:text-white transition">WhatsApp</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom border-t border-white/10 pt-6 md:pt-8 text-gray-500 text-xs md:text-sm text-center md:text-left">
                    © {new Date().getFullYear()} Заначка Финанс Технологии. Официальная организация под контролем ЦБ РФ.
                </div>
            </div>
        </footer>
    );
}
