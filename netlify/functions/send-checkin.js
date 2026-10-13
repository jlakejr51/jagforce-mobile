export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const { toNumber, participantName } = JSON.parse(event.body);
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken  = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;
  const message = 'Hi ' + participantName + '! This is your JAGForce check-in.\n\n' +
    'Please reply with your answers on separate lines:\n\n' +
    'Q1: Rate your goal progress 1-5\n(1=Struggling, 5=Exceeding)\n\n' +
    'Q2: Any barriers? Reply YES or NO\n(If YES, briefly describe)\n\n' +
    'Q3: Support needed?\n1=Academic 2=Career 3=Personal 4=Resources 5=None\n\n' +
    'Example reply:\nQ1: 4\nQ2: NO\nQ3: 2';
  const url = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json';
  const body = new URLSearchParams({ To: toNumber, From: fromNumber, Body: message });
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(accountSid + ':' + authToken).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });
  const result = await response.json();
  if (result.sid) {
    return { statusCode: 200, body: JSON.stringify({ success: true, sid: result.sid }) };
  } else {
    return { statusCode: 500, body: JSON.stringify({ success: false, error: result.message }) };
  }
};
