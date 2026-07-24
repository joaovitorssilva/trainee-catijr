const API_URL = import.meta.env.VITE_API_URL ?? ""

export function coverUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined

  return `${API_URL}${path}`
}
