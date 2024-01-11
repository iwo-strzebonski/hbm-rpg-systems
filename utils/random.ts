/*
 * From: https://github.com/iwo-strzebonski/octoturges-hbm-utils
 * Files: scripts/random.mjs, scripts/initiative/buttons.mjs
 * Credits: Iwo Strzeboński
 */

export function getRandomInt(min: number, max: number): number {
  const byteArray = new Uint8Array(1)
  window.crypto.getRandomValues(byteArray)

  const range = max - min + 1
  const maxRange = 256
  if (byteArray[0] >= Math.floor(maxRange / range) * range) return getRandomInt(min, max)
  return min + (byteArray[0] % range)
}

export function rollDice(diceAmount: number) {
  const results = Array.from({ length: diceAmount }, () => getRandomInt(1, 6))

  results.sort((a, b) => b - a)

  return {
    results,
    sum: results.reduce((a, b) => a + b, 0)
  }
}
