# CATI Spotify

Clone do Spotify desenvolvido como projeto trainee da CATI JR.

## Resumo das principais alterações

Este pull request introduz o **frontend completo** da aplicação, construído com **React + TypeScript + Vite**. Antes disso, o repositório continha apenas o backend (Spring Boot). As mudanças incluem:

- **Páginas**: Home, Playlist, Artista, Perfil, Busca, Álbum e Now Playing
- **Player**: Player persistente com controles de play/pause, skip, barra de progresso, controle de volume e informações da faixa
- **Navegação**: Sidebar responsiva com menu de navegação e itens de biblioteca, além de uma topbar funcional
- **Seções de conteúdo**: Seções de reproduzidos recentemente, álbuns, artistas e playlists com cards e tabelas de faixas
- **Perfil**: Cabeçalho, top artistas e top faixas
- **Componentes de UI**: Botão reutilizável, barra de busca, botão de play, botão seguir, barra de busca da biblioteca
- **Camada de API**: Serviço baseado em Axios com DTOs tipados e endpoints
- **Assets**: Ícones SVG e imagens placeholder
- **Infraestrutura**: Configuração Vite + TypeScript + ESLint + PNPM workspaces

## Arquivos alterados

| Arquivo | Tipo de alteração |
|---|---|
| `README.md` | documentação |
| `frontend/.gitignore` | configuração |
| `frontend/eslint.config.js` | configuração |
| `frontend/index.html` | entrada |
| `frontend/package.json` | configuração |
| `frontend/pnpm-lock.yaml` | dependências |
| `frontend/tsconfig.json` | configuração |
| `frontend/tsconfig.app.json` | configuração |
| `frontend/tsconfig.node.json` | configuração |
| `frontend/vite.config.ts` | configuração |
| `frontend/src/main.tsx` | entrada |
| `frontend/src/index.css` | estilos globais |
| `frontend/src/services/api.ts` | serviço |
| `frontend/src/services/types.ts` | tipos |
| `frontend/src/utils/FormatDuration.tsx` | utilitário |
| `frontend/src/utils/FormatPlayCount.tsx` | utilitário |
| `frontend/src/utils/utils.ts` | utilitário |
| `frontend/src/pages/ArtistPage.tsx` | página |
| `frontend/src/pages/HomePage.tsx` | página |
| `frontend/src/pages/NotFoundPage.tsx` | página |
| `frontend/src/pages/PlaylistPage.tsx` | página |
| `frontend/src/pages/ProfilePage.tsx` | página |
| `frontend/src/pages/SearchPage.tsx` | página |
| `frontend/src/components/layout/App.tsx` | componente |
| `frontend/src/components/layout/PlayerBar.tsx` | componente |
| `frontend/src/components/layout/Sidebar.tsx` | componente |
| `frontend/src/components/layout/Topbar.tsx` | componente |
| `frontend/src/components/player/ProgressBar.tsx` | componente |
| `frontend/src/components/player/TrackInfo.tsx` | componente |
| `frontend/src/components/sidebar/LibraryItem.tsx` | componente |
| `frontend/src/components/sidebar/NavMenu.tsx` | componente |
| `frontend/src/components/ui/Button.tsx` | componente |
| `frontend/src/components/ui/PlayButton.tsx` | componente |
| `frontend/src/components/ui/SearchBar.tsx` | componente |
| `frontend/src/components/ArtistContent/ArtistHeader.tsx` | componente |
| `frontend/src/components/ArtistContent/DiscographySection.tsx` | componente |
| `frontend/src/components/ArtistContent/PopularTrack.tsx` | componente |
| `frontend/src/components/ArtistContent/PopularTrackRow.tsx` | componente |
| `frontend/src/components/MainContent/AlbumSection/AlbumCard.tsx` | componente |
| `frontend/src/components/MainContent/AlbumSection/AlbumSection.tsx` | componente |
| `frontend/src/components/MainContent/ArtistSection/ArtistCard.tsx` | componente |
| `frontend/src/components/MainContent/ArtistSection/ArtistSection.tsx` | componente |
| `frontend/src/components/MainContent/PlaylistSection/PlaylistCard.tsx` | componente |
| `frontend/src/components/MainContent/PlaylistSection/PlaylistSection.tsx` | componente |
| `frontend/src/components/MainContent/RecentlyPlayedSection/RecentlyPlayed.tsx` | componente |
| `frontend/src/components/MainContent/RecentlyPlayedSection/RecentlyPlayedCard.tsx` | componente |
| `frontend/src/components/PlaylistContent/PlaylistHeader.tsx` | componente |
| `frontend/src/components/PlaylistContent/TrackTableRow.tsx` | componente |
| `frontend/src/components/PlaylistContent/TracksTable.tsx` | componente |
| `frontend/src/components/ProfileContent/ProfileHeader.tsx` | componente |
| `frontend/src/components/ProfileContent/TopArtists.tsx` | componente |
| `frontend/src/assets/spotify-logo.svg` | asset |
| `frontend/src/assets/album-cover.png` | asset |
| `frontend/src/assets/artist-banner.png` | asset |
| `frontend/src/assets/artist-cover.png` | asset |
| `frontend/src/assets/playlist-cover.png` | asset |
| `frontend/src/assets/track-cover.png` | asset |
| `frontend/src/assets/track-cover1.png` | asset |
| `frontend/src/assets/track-cover2.png` | asset |
| `frontend/src/assets/track-cover3.png` | asset |
| `frontend/src/assets/user-avatar.png` | asset |
| `frontend/src/assets/icons/artist-verified-icon.svg` | asset |
| `frontend/src/assets/icons/bell-fill-icon.svg` | asset |
| `frontend/src/assets/icons/bell-icon.svg` | asset |
| `frontend/src/assets/icons/clock-icon.svg` | asset |
| `frontend/src/assets/icons/close-now-playing-page-icon.svg` | asset |
| `frontend/src/assets/icons/download-icon.svg` | asset |
| `frontend/src/assets/icons/home-fill-icon.svg` | asset |
| `frontend/src/assets/icons/home-icon.svg` | asset |
| `frontend/src/assets/icons/open-now-playing-page-icon.svg` | asset |
| `frontend/src/assets/icons/options-icon.svg` | asset |
| `frontend/src/assets/icons/pause-icon.svg` | asset |
| `frontend/src/assets/icons/pin-icon.svg` | asset |
| `frontend/src/assets/icons/play-icon.svg` | asset |
| `frontend/src/assets/icons/search-icon.svg` | asset |
| `frontend/src/assets/icons/skip-next-icon.svg` | asset |
| `frontend/src/assets/icons/skip-prev-icon.svg` | asset |
| `frontend/src/assets/icons/user-icon.svg` | asset |
| `frontend/src/assets/icons/verified-icon.svg` | asset |
| `frontend/src/assets/icons/volume-icon.svg` | asset |

## O que não foi alterado

- **backend/** — Nenhuma alteração foi feita no backend (Spring Boot + Java). A estrutura, controllers, services, repositórios e arquivos de configuração permanecem exatamente como estavam.
