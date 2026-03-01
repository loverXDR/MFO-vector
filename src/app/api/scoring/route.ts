import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { amount, termDays } = body;

        // Simulate heavy ML computation delay (2 seconds)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Extremely simple mock ML heuristics
        let score = 0.8; // Base probability of approval

        // Higher amounts drastically lower probability
        if (amount > 30000) score -= 0.4;
        else if (amount > 15000) score -= 0.2;

        // Longer terms lower probability
        if (termDays > 20) score -= 0.1;

        // Add some random noise to simulate complex model variance
        const noise = (Math.random() - 0.5) * 0.2; // +/- 0.1
        const finalScore = Math.max(0, Math.min(1, score + noise));

        const decision = finalScore > 0.5 ? "APPROVED" : "REJECTED";

        return NextResponse.json({
            decision,
            score: finalScore,
            message: "Scoring completed successfully"
        });

    } catch (error) {
        console.error("Scoring Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
