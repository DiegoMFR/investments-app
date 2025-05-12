export function isTokenExpired(token: string): boolean {
  try {
    const [, payloadBase64] = token.split('.');
    if (!payloadBase64) return true;

    const payload = JSON.parse(atob(payloadBase64));
    const now = Math.floor(Date.now() / 1000);
    return !payload.exp || payload.exp < now;
  } catch (err) {
    console.error('Invalid token format:', err);
    return true;
  }
}

export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'EUR':
      return '€';
    case 'USD':
      return '$';
    case 'GBP':
      return '£';
    default:
      return currency;
  }
}