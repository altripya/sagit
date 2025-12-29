
import { Property } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'דירת 5 חדרים יוקרתית בכרמי גת',
    location: 'קריית גת, כרמי גת',
    price: 2450000,
    bedrooms: 5,
    bathrooms: 2,
    area: 125,
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    description: 'דירה חדשה ומעוצבת בלב השכונה המבוקשת. נוף פתוח, מרפסת שמש גדולה ומטבח משודרג.',
    featured: true
  },
  {
    id: '2',
    title: 'פנטהאוז מפואר עם מרפסת ענקית',
    location: 'קריית גת, כרמי גת',
    price: 3200000,
    bedrooms: 6,
    bathrooms: 3,
    area: 180,
    type: 'Penthouse',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'פנטהאוז יחיד בקומה, מעוצב אדריכלית עם מפרט טכני עשיר ונוף פנורמי לכל האזור.',
    featured: true
  },
  {
    id: '3',
    title: 'קוטג׳ פינתי בשכונה הוותיקה',
    location: 'קריית גת, רובע הפרחים',
    price: 2850000,
    bedrooms: 5,
    bathrooms: 2.5,
    area: 160,
    type: 'House',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'בית פרטי שקט ומטופח עם גינה גדולה והרבה פוטנציאל. מיקום מצוין בקרבת מוסדות חינוך.',
    featured: false
  },
  {
    id: '4',
    title: 'דירת 4 חדרים מושקעת למכירה',
    location: 'קריית גת, כרמי גת',
    price: 2150000,
    bedrooms: 4,
    bathrooms: 2,
    area: 105,
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
    description: 'דירה מוארת ומרווחת, קרובה לפארק המרכזי. מושלמת למשפחות צעירות או להשקעה.',
    featured: false
  }
];
