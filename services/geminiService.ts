
import { GoogleGenAI } from "@google/genai";
import { Property } from "../types";

export const getRealEstateAdvice = async (userPrompt: string, properties: Property[]) => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("מפתח API חסר. נא לוודא שהגדרות המערכת תקינות.");
      return "שגית תשמח לעזור לך באופן אישי. כרגע ישנה בעיה טכנית קלה בעוזר הדיגיטלי.";
    }

    // אתחול הלקוח בתוך הפונקציה מבטיח שימוש במפתח המעודכן ביותר
    const ai = new GoogleGenAI({ apiKey });
    
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

    const text = response.text;
    
    if (!text) {
      return "סליחה, אני מתקשה למצוא את המילים הנכונות כרגע. אנא נסה לשאול בצורה אחרת או פנה לשגית.";
    }

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "אירעה שגיאה בתקשורת עם העוזר החכם. שגית תשמח לעזור לך טלפונית ב-054-8188436.";
  }
};
