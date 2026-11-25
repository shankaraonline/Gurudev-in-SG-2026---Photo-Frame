/**
 * Official flyer designs for:
 * Gurudev in Singapore, Dec 2026 - The Art of Being Happy
 * (English Creative & Chinese Creative)
 */

export const DEFAULT_TEMPLATES = [
  {
    id: 'singapore-en',
    name: 'English Creative',
    lang: 'en',
    label: 'English',
    heading: 'Gurudev in Singapore, Dec 2026',
    subHeading: 'Add your photo to the frame',
    heading2: 'The Art of Being Happy',
    eventSubtitle: '6 December, Sands Expo & Convention Center',
    footerText: 'Art of Living, Singapore | The Art of Being Happy with Gurudev Sri Sri Ravi Shankar',
    width: 1024,
    height: 1024,
    aspectRatio: 1, // 1:1 square
    flyerUrl: '/English.jpeg?v=2',
    // Width increased by 4px on both sides (+8px total width: 350.8px)
    slot: {
      xPercent: 23.3,
      yPercent: 69.8,
      widthPercent: 34.26, // 350.8px (increased by 4px on both sides)
      heightPercent: 33.98, // 348.0px
      rotation: -10.5,
      borderRadius: 4,
      shape: 'rect',
      label: 'Add Your Photo Here',
      sublabel: 'Tap to choose photo'
    }
  },
  {
    id: 'singapore-zh',
    name: '中文创意 (Chinese)',
    lang: 'zh',
    label: '中文',
    heading: '古儒德夫尊者 2026年12月到访新加坡',
    subHeading: '将您的照片添加到海报相框',
    heading2: '快乐的艺术',
    eventSubtitle: '2026年12月6日 · 新加坡滨海湾金沙',
    footerText: '新加坡生活艺术 | 与大师面对面《快乐的艺术》古儒德夫尊者',
    width: 1024,
    height: 1024,
    aspectRatio: 1, // 1:1 square
    flyerUrl: '/Chines.jpeg?v=2',
    // Width increased by 4px on both sides (+8px total width: 350.8px)
    slot: {
      xPercent: 23.3,
      yPercent: 69.8,
      widthPercent: 34.26, // 350.8px (increased by 4px on both sides)
      heightPercent: 33.98, // 348.0px
      rotation: -10.5,
      borderRadius: 4,
      shape: 'rect',
      label: '在此添加您的照片',
      sublabel: '点击选择照片'
    }
  }
];

export const STORAGE_KEY_ACTIVE_TEMPLATE = 'aolsg_active_flyer_lang_v2';
