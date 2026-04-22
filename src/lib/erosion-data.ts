/* Erosion zone data types and constants — no Leaflet dependency */

export interface ErosionZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  risk: "critique" | "élevé" | "modéré" | "faible";
  riskScore: number;
  area_m2: number;
  description: string;
  protected: boolean;
  protectedPct: number;
  soilType: string;
  slope: string;
}

export const erosionZones: ErosionZone[] = [
  { id:"z1", name:"Jebel Ressas — Versant Nord", lat:36.6175, lng:10.3239, risk:"critique", riskScore:92, area_m2:45000, description:"Pentes calcaires instables. Glissements de terrain récurrents menaçant la route régionale RR28.", protected:true, protectedPct:18, soilType:"Calcaire marneux", slope:"35-45°" },
  { id:"z2", name:"Sidi Bou Saïd — Falaises Côtières", lat:36.8708, lng:10.3464, risk:"élevé", riskScore:78, area_m2:12000, description:"Érosion côtière accélérée. Patrimoine historique menacé par le recul du trait de côte.", protected:true, protectedPct:42, soilType:"Grès tendre", slope:"60-80°" },
  { id:"z3", name:"Oued Ellil — Berges", lat:36.7834, lng:10.0659, risk:"critique", riskScore:88, area_m2:28000, description:"Berges non stabilisées. Inondations saisonnières érodant les terres agricoles.", protected:false, protectedPct:0, soilType:"Alluvions argileuses", slope:"5-15°" },
  { id:"z4", name:"Djebel Boukornine — Flanc Est", lat:36.7294, lng:10.3288, risk:"élevé", riskScore:74, area_m2:62000, description:"Zone de parc national avec érosion en ravines. Perte de couvert végétal après incendies.", protected:true, protectedPct:31, soilType:"Marne rouge", slope:"25-40°" },
  { id:"z5", name:"Mornag — Plaine Agricole Sud", lat:36.6855, lng:10.2788, risk:"modéré", riskScore:52, area_m2:85000, description:"Érosion hydrique diffuse sur parcelles cultivées. Perte de sol arable 12t/ha/an.", protected:false, protectedPct:0, soilType:"Limon argileux", slope:"2-8°" },
  { id:"z6", name:"La Marsa — Côte Nord", lat:36.8872, lng:10.3268, risk:"modéré", riskScore:55, area_m2:9500, description:"Érosion côtière modérée. Recul de plage de 2m/an mesuré par télédétection.", protected:true, protectedPct:65, soilType:"Sable dunaire", slope:"10-20°" },
  { id:"z7", name:"Ariana — Collines Raoued", lat:36.9127, lng:10.1754, risk:"élevé", riskScore:71, area_m2:34000, description:"Extension urbaine sur terrain en pente. Ruissellement intensifié par l'imperméabilisation.", protected:false, protectedPct:0, soilType:"Argile limoneuse", slope:"15-25°" },
  { id:"z8", name:"Hammam Lif — Ravin Sud", lat:36.7327, lng:10.3401, risk:"critique", riskScore:85, area_m2:18000, description:"Ravinement profond menaçant les habitations. Évacuations préventives déjà ordonnées.", protected:true, protectedPct:12, soilType:"Marne gypseuse", slope:"30-50°" },
  { id:"z9", name:"Borj Cédria — Zone Industrielle", lat:36.7106, lng:10.3876, risk:"faible", riskScore:28, area_m2:22000, description:"Sol stabilisé artificiellement. Risque résiduel sur les talus non drainés.", protected:true, protectedPct:88, soilType:"Remblai compacté", slope:"3-8°" },
  { id:"z10", name:"Sebkha Sijoumi — Pourtour Ouest", lat:36.7785, lng:10.1198, risk:"élevé", riskScore:68, area_m2:41000, description:"Salinisation et effondrement des berges de la sebkha. Routes fragilisées.", protected:false, protectedPct:0, soilType:"Sol halomorphe", slope:"1-5°" },
];

export const riskColors: Record<string, string> = {
  critique: "#A0522D",
  "élevé": "#D2691E",
  "modéré": "#DAA520",
  faible: "#6B8E23",
};
