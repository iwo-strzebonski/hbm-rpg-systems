export default function getColorForRollResult(result: number, testScore = 0) {
  if ((testScore === 0 && result === 1) || (testScore > 0 && result < testScore)) {
    return '!border-red-500 !text-red-500'
  }

  if ((testScore === 0 && result === 6) || (testScore > 0 && result >= testScore)) {
    return '!border-green-500 !text-green-500'
  }

  return 'border-zinc-700 text-zinc-700 dark:!border-zinc-300 dark!text-zinc-300'
}
