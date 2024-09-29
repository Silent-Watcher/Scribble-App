import type { Content } from 'mailgen';

export function email(verificationLink: string): Content {
  return {
    body: {
      title: 'Hello dear User',
      intro: "Welcome to Mailgen! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with Mailgen, please click here:',
        button: {
          color: '#1E429F',
          text: 'Verify Your Email',
          link: verificationLink,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
}
