import moment from 'moment';

/* eslint-disable max-len */
export const feedbackBtnData = [
  {
    label: 'Efficient Chat',
  },
  {
    label: 'Helpful Resolution',
  },
  {
    label: 'Friendly Tone',
  },
  {
    label: 'Easy to Use',
  },
  {
    label: 'Bot was intelligent',
  },
  {
    label: 'Others',
  },
];

// export const chatPrompts = ['Hello', 'How to use this chatbot?'];
export const chatPrompts = [
  'How to use AI in our everyday life?',
  'ما هي بعض الاستخدامات المُدهشة للذكاء الاصطناعي في الحياة اليومية؟',
  'AI tools or apps to learn more about artificial intelligence?',
  'كيف تُظهر الأفلام والكتب الذكاء الاصطناعي؟',
  'How is AI affecting toursim?',
  'كيف يتم الاستفادة من الذكاء الاصطناعي في مجال العقارات؟',
  'Can AI chatbots revolutionize E-commerce?',
  'اقترح لي وثائقيات متعلقة بالذكاء الاصطناعي',
  'ما هي أشهر المقولات حول الذكاء الاصطناعي؟',
  'Can AI replace Human?',
];

export const dummyMessages = [{ query: 'Hello', type: 'text', timestamp: moment().format('HH:mm:ss') }];

export const dummyMessages2 = [
  { answer: 'Hello How are you doing', type: 'text', timestamp: moment().format('HH:mm:ss') },
  { query: 'What is Beyond Eris SOlutions-2', type: 'text', timestamp: moment().format('HH:mm:ss') },
  {
    answer:
      'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit ',
    type: 'text',
    timestamp: moment().format('HH:mm:ss'),
  },
  {
    query: 'ما هي أشهر المقولات حول الذكاء الاصطناعي؟',
    type: 'text',
    timestamp: moment().format('HH:mm:ss'),
  },
  {
    query: 'كيف يتم الاستفادة من الذكاء الاصطناعي في مجال العقارات؟',
    type: 'text',
    timestamp: moment().format('HH:mm:ss'),
  },
];
