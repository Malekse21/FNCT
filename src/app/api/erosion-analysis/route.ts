import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { zone, allZones } = await req.json();

    const systemPrompt = `Tu es un expert géotechnique et environnemental spécialisé dans l'érosion des sols en Tunisie.
Tu travailles pour la municipalité de Tunis et ton rôle est d'analyser les données d'érosion pour fournir des recommandations pratiques.

Règles :
- Réponds TOUJOURS en français
- Sois concis et actionnable
- Structure ta réponse en sections claires
- Utilise des données chiffrées quand possible
- Mentionne le potentiel des tapis de laine comme solution de stabilisation (produit phare de l'initiative Soufi)
- Fournis un score de priorité d'intervention de 1 à 10`;

    let userPrompt: string;

    if (zone) {
      userPrompt = `Analyse cette zone d'érosion spécifique et fournis des recommandations détaillées :

Zone : ${zone.name}
Niveau de risque : ${zone.risk} (Score: ${zone.riskScore}/100)
Surface : ${zone.area_m2} m²
Type de sol : ${zone.soilType}
Pente : ${zone.slope}
Description : ${zone.description}
Protégée : ${zone.protected ? `Oui (${zone.protectedPct}%)` : "Non"}

Fournis :
1. 🔍 DIAGNOSTIC — Analyse rapide du problème
2. ⚠️ RISQUES — Conséquences si rien n'est fait (infrastructure, population, coût)
3. 🛡️ INTERVENTIONS — Actions recommandées avec la laine recyclée et autres solutions
4. 📊 ESTIMATION — Tonnage de laine nécessaire et coût estimé
5. ❓ QUESTIONS CLÉS — 3 questions que la municipalité doit se poser pour cette zone`;
    } else {
      const summary = allZones
        .map(
          (z: { name: string; risk: string; riskScore: number; area_m2: number; protected: boolean; protectedPct: number }) =>
            `- ${z.name}: ${z.risk} (${z.riskScore}/100), ${z.area_m2}m², ${z.protected ? `protégée ${z.protectedPct}%` : "non protégée"}`
        )
        .join("\n");

      userPrompt = `Voici un résumé de toutes les zones d'érosion identifiées dans le Grand Tunis :

${summary}

Fournis une analyse globale :
1. 🗺️ VUE D'ENSEMBLE — Synthèse de la situation d'érosion dans le Grand Tunis
2. 🚨 ZONES PRIORITAIRES — Classement des 3 zones les plus urgentes et pourquoi
3. 💰 IMPACT ÉCONOMIQUE — Estimation des coûts si rien n'est fait vs. coût de prévention avec la laine
4. 🌿 PLAN D'ACTION — Stratégie de déploiement des tapis de laine sur 12 mois
5. ❓ QUESTIONS STRATÉGIQUES — 5 questions que le Maire devrait poser à son équipe`;
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.6,
      max_tokens: 1500,
    });

    const content = chatCompletion.choices[0]?.message?.content || "";

    return NextResponse.json({ analysis: content });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de l'analyse. Vérifiez la clé GROQ_API_KEY.",
        analysis: null,
      },
      { status: 500 }
    );
  }
}
