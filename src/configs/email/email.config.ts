import mailgen from 'mailgen';

import { CONFIGS } from '../';

// template
export const mailGenerator = new mailgen({
  theme: 'default',
  product: {
    name: CONFIGS.APP.NAME,
    link: CONFIGS.APP.URL,
    logo: CONFIGS.APP.LOGO,
    copyright: `Copyright © ${new Date().getFullYear()} Scribble. All rights reserved.`,
  },
});

// transporter
