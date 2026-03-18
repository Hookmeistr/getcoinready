const https = require('https');

exports.handler = async function(event, context) {
  if(event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const allowedOrigins = ['https://getcoinready.com', 'https://www.getcoinready.com', 'https://bespoke-parfait-82c32d.netlify.app'];
  const origin = event.headers.origin || '';
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  try {
    const body = JSON.parse(event.body);
    const messages = body.messages || [];
    const systemPrompt = 'You are a friendly plain-English crypto education assistant on GetCoinReady.com, a free neutral guide for everyday beginners often aged 50 and over. Answer questions about cryptocurrency simply and clearly without jargon. Always end your response with a reminder that you provide educational information only, not financial advice. Keep answers under 150 words. Be warm and patient. Never recommend specific coins to buy or predict prices.';

    const requestData = JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: systemPrompt,
      messages: messages
    });

    const response = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Length': Buffer.byteLength(requestData)
        }
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
      });
      req.on('error', reject);
      req.write(requestData);
      req.end();
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: response.body
    };

  } catch(error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': corsOrigin },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
