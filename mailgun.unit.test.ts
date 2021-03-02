import { sendMessage } from './mailgun';
import Mailgun from 'mailgun-js';

const DOMAIN = 'gupy.com.br';

jest.mock('mailgun-js', () => {
  const mockMailgun = {
    messages: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  return jest.fn(() => mockMailgun);
});

describe('Mailgun', () => {
  describe('sendMessage', () => {
    it('should return message key when valid message is passed', async () => {
      const message = {
        from: `no-reply@${DOMAIN}`,
        to: `someone@${DOMAIN}`,
        subject: 'Some subject',
        html: '<b>Hello world</b>',
      };
      const response = {
        message: "Queued. Thank you.",
        id: "<1234@gupy.com.br>",
      };

      const mailgun = new Mailgun({
        apiKey: 'XXX',
        domain: DOMAIN
      });

      mailgun.messages().send.mockResolvedValueOnce(response);

      const result = await sendMessage(message);

      expect(mailgun.messages).toBeCalled();
      expect(mailgun.messages().send).toBeCalledWith(message);
      expect(result).toBe(response);
    });
  });
});