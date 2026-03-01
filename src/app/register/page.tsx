"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [isBank, setIsBank] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
                fullName,
                role: isBank ? "BANK" : "USER"
            })
        });

        if (!res.ok) {
            const data = await res.json();
            setError(data.error || "Ошибка регистрации");
        } else {
            setSuccess(true);
            setTimeout(() => router.push("/login"), 2000);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-[var(--bg-color)]">
            <div className="bg-shape shape-1 w-96 h-96 opacity-40"></div>

            <div className="glass p-10 rounded-3xl shadow-xl w-full max-w-md relative z-10 mx-4 my-10">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold">Регистрация в системе</h2>
                </div>

                {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium border border-red-200">{error}</div>}
                {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm font-medium border border-green-200">Успешно! Перенаправление на вход...</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">ФИО / Название организации</label>
                        <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 outline-none backdrop-blur-sm focus:ring-2 focus:ring-[#E84C22]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 outline-none backdrop-blur-sm focus:ring-2 focus:ring-[#E84C22]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Пароль</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 outline-none backdrop-blur-sm focus:ring-2 focus:ring-[#E84C22]"
                        />
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                        <input
                            type="checkbox"
                            id="isBank"
                            checked={isBank}
                            onChange={(e) => setIsBank(e.target.checked)}
                            className="w-5 h-5 accent-[#E84C22] rounded cursor-pointer"
                        />
                        <label htmlFor="isBank" className="text-sm font-medium text-gray-700 cursor-pointer">
                            Я регистрирую аккаунт <b>Банка-партнера</b>
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-glow btn-block w-full mt-4">
                        Зарегистрироваться
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    Уже есть аккаунт? <Link href="/login" className="hover:text-[#E84C22] transition underline underline-offset-4">Войти</Link>
                </div>
            </div>
        </div>
    );
}
