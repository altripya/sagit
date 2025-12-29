
import { GoogleGenAI } from "@google/genai";
import { Property } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getRealEstateAdvice = async (userPrompt: string, properties: Property[]) => {
  try {
    const propertiesContext = JSON.stringify(properties.map(p => ({
      title: p.title,
      location: p.location,
      price: p.price,
      type: p.type,
      id: p.id
    })));

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `אתה עוזר נדל"ן אישי באתר של שגית פלק.
      המשתמש שאל: "${userPrompt}"
      
      אלו הנכסים הזמינים כרגע במערכת:
      ${propertiesContext}
      
      אנא ענה למשתמש בעברית רהוטה ומקצועית. 
      אם המשתמש מחפש נכס מסוים, המלץ לו על הנכסים המתאימים ביותר מהרשימה שסיפקתי.
      אם הוא שואל שאלות כלליות על נדל"ן בישראל, ענה לו בצורה מקצועית ומכבדת.
      תמיד תזכיר ששגית פלק היא המומחית שתשמח לעזור לו באופן אישי.
      שמור על תשובות קצרות וקולעות.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "סליחה, אני מתקשה לענות כרגע. אנא נסו שוב מאוחר יותר.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "אירעה שגיאה בתקשורת עם העוזר החכם. שגית תשמח לעזור לך טלפונית.";
  }
};
