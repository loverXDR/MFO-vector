"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Header() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

    // Helper to determine if a link is active
    const isActive = (path: string) => pathname === path;

    return (
        <header className="header w-full border-b border-[var(--border-glass)] backdrop-blur-md sticky top-0 z-50 bg-white/80">
            <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex justify-between items-center max-w-7xl">
                {/* Logo */}
                <Link href="/" className="logo flex items-center gap-2 md:gap-3 z-50">
                    <div className="logo-icon bg-black text-white w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-bold text-lg md:text-xl">
                        ₽
                    </div>
                    <div className="logo-text text-xl md:text-2xl font-bold tracking-tight">Заначка</div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="nav hidden md:flex items-center gap-8 font-medium text-gray-600">
                    <Link href="/" className={`${isActive("/") ? "text-black font-semibold" : "hover:text-black transition"}`}>
                        Главная
                    </Link>
                    <Link href="/conditions" className={`${isActive("/conditions") ? "text-black font-semibold" : "hover:text-black transition"}`}>
                        Тарифы и условия
                    </Link>
                    <Link href="/about" className={`${isActive("/about") ? "text-black font-semibold" : "hover:text-black transition"}`}>
                        О технологиях
                    </Link>

                    {/* Products Dropdown (Desktop) */}
                    <div className="relative group">
                        <button className={`hover:text-black transition flex items-center gap-1 py-4 ${pathname.startsWith("/products") ? "text-black font-semibold" : ""}`}>
                            Продукты
                            <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div className="absolute top-full -left-6 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 py-2">
                            <Link href="/products/consumer" className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors">Потребительские</Link>
                            <Link href="/products/business" className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors">Для бизнеса</Link>
                            <Link href="/products/bnpl" className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors">BNPL</Link>
                            <Link href="/products/collateral" className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors">Залоговые</Link>
                            <Link href="/products/il" className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors">IL (регулярные платежи)</Link>
                            <Link href="/products/virtual-card" className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors">Виртуальная карта</Link>
                        </div>
                    </div>
                </nav>

                {/* Action Buttons & Mobile Toggle */}
                <div className="flex items-center gap-3 md:gap-4 z-50">
                    <div className="hidden sm:block">
                        {!session ? (
                            <Link href="/login" className="btn btn-primary btn-glow px-5 py-2 rounded-full font-bold text-white text-sm">
                                Войти
                            </Link>
                        ) : (
                            <Link href={session.user?.role === "BANK" ? "/bank-dashboard" : "/dashboard"} className="btn btn-primary btn-glow px-4 py-2 rounded-full font-bold text-white text-sm whitespace-nowrap">
                                Кабинет
                            </Link>
                        )}
                    </div>

                    {/* Hamburger Menu Button (Mobile) */}
                    <button
                        className="md:hidden p-2 -mr-2 text-gray-600 hover:text-black transition focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 flex flex-col items-end justify-center gap-1.5 border-none">
                            <span className={`bg-current block transition-all duration-300 ease-out h-[2px] w-full rounded-sm ${mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
                            <span className={`bg-current block transition-all duration-300 ease-out h-[2px] w-full rounded-sm ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`bg-current block transition-all duration-300 ease-out h-[2px] w-full rounded-sm ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-300 ease-in-out flex flex-col pt-20 px-6 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col gap-6 text-xl font-medium mt-4">
                    <Link href="/" className="py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
                        Главная
                    </Link>
                    <Link href="/conditions" className="py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
                        Тарифы и условия
                    </Link>
                    <Link href="/about" className="py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>
                        О технологиях
                    </Link>

                    <div className="py-2 border-b border-gray-100 flex flex-col">
                        <button
                            className="flex items-center justify-between w-full"
                            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                        >
                            <span>Продукты</span>
                            <svg className={`w-5 h-5 transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div className={`flex flex-col gap-4 mt-4 pl-4 overflow-hidden transition-all duration-300 ${mobileProductsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <Link href="/products/consumer" className="text-gray-500 text-base" onClick={() => setMobileMenuOpen(false)}>Потребительские</Link>
                            <Link href="/products/business" className="text-gray-500 text-base" onClick={() => setMobileMenuOpen(false)}>Для бизнеса</Link>
                            <Link href="/products/bnpl" className="text-gray-500 text-base" onClick={() => setMobileMenuOpen(false)}>BNPL</Link>
                            <Link href="/products/collateral" className="text-gray-500 text-base" onClick={() => setMobileMenuOpen(false)}>Залоговые</Link>
                            <Link href="/products/il" className="text-gray-500 text-base" onClick={() => setMobileMenuOpen(false)}>IL (регулярные платежи)</Link>
                            <Link href="/products/virtual-card" className="text-gray-500 text-base" onClick={() => setMobileMenuOpen(false)}>Виртуальная карта</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 mb-10 w-full sm:hidden">
                    {!session ? (
                        <Link href="/login" className="btn btn-primary btn-glow py-4 rounded-xl font-bold text-white text-lg w-full text-center block" onClick={() => setMobileMenuOpen(false)}>
                            Войти в кабинет
                        </Link>
                    ) : (
                        <Link href={session.user?.role === "BANK" ? "/bank-dashboard" : "/dashboard"} className="btn btn-primary btn-glow py-4 rounded-xl font-bold text-white text-lg w-full text-center block" onClick={() => setMobileMenuOpen(false)}>
                            Мой Кабинет
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
