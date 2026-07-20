import api from "../api"
import type { SearchResult } from "../../types/index.types"

export async function searchApi(
  query: string,
  signal?: AbortSignal
): Promise<SearchResult[]> {
  const response = await api.get(`/search?q=${encodeURIComponent(query)}`, { signal })
  return response.data
}
