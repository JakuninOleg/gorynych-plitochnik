export const maxDemoImageBytes = 512 * 1024
export const maxDemoImageLabel = '512 КБ'

type UploadCandidate = Pick<File, 'size' | 'type'>

export function validateDemoImage(file: UploadCandidate): string | null {
  if (!file.type.startsWith('image/')) {
    return 'Поддерживаются только изображения.'
  }
  if (file.size > maxDemoImageBytes) {
    return `Файл больше ${maxDemoImageLabel}. Уменьшите изображение и повторите загрузку.`
  }
  return null
}
