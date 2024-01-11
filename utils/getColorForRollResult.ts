export default function getColorForRollResult(result: number) {
  if (result === 1) {
    return '!border-red-500 !text-red-500'
  }

  if (result === 6) {
    return '!border-green-500 !text-green-500'
  }

  return 'border-zinc-700 text-zinc-700 dark:!border-zinc-300 dark!text-zinc-300'
}
