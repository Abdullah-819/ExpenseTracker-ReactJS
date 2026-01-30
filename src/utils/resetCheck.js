export function shouldReset(lastReset) {
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000
  return Date.now() - lastReset > THIRTY_DAYS
}
