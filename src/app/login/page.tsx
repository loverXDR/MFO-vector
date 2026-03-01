"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Неверный email или пароль.");
        } else {
            router.push("/dashboard"); // Middleware will redirect BANK users
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center">
            <div className="bg-shape shape-1"></div>
            <div className="bg-shape shape-2"></div>

            <div className="glass p-10 rounded-3xl shadow-xl w-full max-w-md relative z-10 mx-4">
                <div className="text-center mb-8">
                    <div className="logo-icon bg-black text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-2xl mx-auto mb-4">₽</div>
                    <h2 className="text-2xl font-bold">Вход в кабинет</h2>
                    <p className="text-gray-500 mt-2">Умный микрофинансовый сервис</p>
                </div>

                {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium border border-red-200">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#E84C22] focus:border-transparent transition outline-none backdrop-blur-sm"
                            placeholder="user@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Пароль</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 focus:ring-2 focus:ring-[#E84C22] focus:border-transparent transition outline-none backdrop-blur-sm"
                            placeholder="••••••••"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-glow btn-block w-full mt-4">
                        Войти
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p className="mb-3">Нет аккаунта? <Link href="/register" className="font-semibold text-black hover:text-[#E84C22] transition underline underline-offset-4">Зарегистрироваться</Link></p>
                    <Link href="/" className="hover:text-[#E84C22] transition underline underline-offset-4">Вернуться на главную</Link>
                </div>
            </div>
        </div>
    );
}
