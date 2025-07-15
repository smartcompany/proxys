export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const symbol = url.searchParams.get('symbol') || 'BTCUSDT';
    const interval = url.searchParams.get('interval') || '1m';
    const limit = url.searchParams.get('limit') || '1';
    const binanceUrl = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
    const res = await fetch(binanceUrl);

    // CORS 헤더 추가 (필요시)
    const headers = new Headers(res.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.set('Access-Control-Allow-Headers', '*');

    // 바이낸스 응답을 그대로 전달
    return new Response(await res.body, {
      status: res.status,
      headers
    });
  }
}