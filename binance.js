export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);
    const symbol = url.searchParams.get('symbol') || 'BTCUSDT';
    const interval = url.searchParams.get('interval') || '1m';
    const limit = url.searchParams.get('limit') || '1';
    const binanceUrl = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
    const res = await fetch(binanceUrl);
    return new Response(await res.body, {
      status: res.status,
      headers: { 'content-type': 'application/json' }
    });
  }