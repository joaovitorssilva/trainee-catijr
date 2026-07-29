import type { TrackCredits } from "@/types/credits.types"

export const mockCredits: TrackCredits = {
  trackName: "Never Let Go",
  sections: [
    {
      title: "Artista",
      contributors: [
        { id: "1", name: "LNGSHOT", roles: ["Artista Principal"], isArtist: true, isFollowing: true },
      ],
    },
    {
      title: "Composição e letra",
      contributors: [
        { id: "2", name: "WOOJIN of LNGSHOT", roles: ["Arranjos", "Autores", "Letrista"] },
        { id: "3", name: "LOUIS of LNGSHOT", roles: ["Arranjos", "Autores", "Letrista"] },
        { id: "4", name: "RYUL of LNGSHOT", roles: ["Arranjos", "Autores", "Letrista"] },
        { id: "5", name: "OHUL of LNGSHOT", roles: ["Arranjos", "Autores", "Letrista"] },
        { id: "6", name: "Mehti", roles: ["Autores"] },
        { id: "7", name: "Eric Minz", roles: ["Autores", "Letrista"] },
      ],
    },
    {
      title: "Fontes",
      contributors: [
        { id: "8", name: "MORE VISION", roles: [] },
      ],
    },
  ],
}
