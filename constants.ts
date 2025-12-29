
import { Property } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'פנטהאוז יוקרתי עם נוף לים',
    location: 'תל אביב, צפון ישן',
    price: 12500000,
    bedrooms: 5,
    bathrooms: 3,
    area: 220,
    type: 'Penthouse',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'פנטהאוז מדהים ביופיו עם מרפסת שמש ענקית הצופה לים התיכון. עיצוב אדריכלי ברמה הגבוהה ביותר.',
    featured: true
  },
  {
    id: '2',
    title: 'וילה מודרנית בהרצליה פיתוח',
    location: 'הרצליה פיתוח',
    price: 24000000,
    bedrooms: 7,
    bathrooms: 5,
    area: 450,
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    description: 'וילה חדשה מהניילון, בריכת שחייה פרטית, מערכות בית חכם ומטבח שף מאובזר.',
    featured: true
  },
  {
    id: '3',
    title: 'דירת גן מעוצבת ברמת אביב',
    location: 'תל אביב, רמת אביב ג\'',
    price: 6800000,
    bedrooms: 4,
    bathrooms: 2,
    area: 140,
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    description: 'דירת גן שקטה ומוארת בלב השכונה המבוקשת. גינה פרטית מטופחת של 100 מ"ר.',
    featured: false
  },
  {
    id: '4',
    title: 'לופט תעשייתי בשכונת פלורנטין',
    location: 'תל אביב, פלורנטין',
    price: 4200000,
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    description: 'לופט ייחודי עם תקרות גבוהות וחלונות ענק. מתאים למי שמחפש אופי וסטייל בלב העיר.',
    featured: false
  },
  {
    id: '5',
    title: 'מגרש לבנייה עצמית בקיסריה',
    location: 'קיסריה',
    price: 8500000,
    bedrooms: 0,
    bathrooms: 0,
    area: 1000,
    type: 'Plot',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&w=800&q=80',
    description: 'מגרש יפהפה במיקום שקט בקיסריה. פוטנציאל אדיר לבניית וילה חלומית.',
    featured: false
  },
  {
    id: '6',
    title: 'קוטג׳ מעוצב ברמת השרון',
    location: 'רמת השרון',
    price: 11200000,
    bedrooms: 6,
    bathrooms: 4,
    area: 280,
    type: 'House',
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80',
    description: 'בית משפחתי מושלם בשכונה שקטה. גינה גדולה, מרתף מאובזר וחללי אירוח מרווחים.',
    featured: false
  }
];
