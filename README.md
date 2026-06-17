# Frontend 

Breve explicação da organização de páginas e arquivos do projeto

## Estrutura de diretórios

| Diretório / Arquivo | Descrição |
|---|---|
| `assets/` | Imagens, ícones SVG e logos |
| `assets/icons/` | Ícones usados na interface (.svg) |
| `assets/*.png` | Imagens de capas, avatares, banners |
| `components/layout/` | Estrutura da página (Sidebar, Topbar, PlayerBar) |
| `components/sidebar/` | Itens da seção lateral (NavMenu, LibraryItem) |
| `components/player/` | Player de música (TrackInfo, ProgressBar, VolumeControl, PlayerControls) |
| `components/ui/` | Componentes reutilizáveis (Button, SearchBar, PlayButton, FollowButton) |
| `components/MainContent/` | Seções da HomePage (RecentlyPlayed, Playlist, Artist e Album Section) |
| `components/PlaylistContent/` | Header e tabela de músicas de uma playlist |
| `components/ArtistContent/` | Header, músicas populares e discografia do artista |
| `components/ProfileContent/` | Header, top artistas e top músicas do perfil |
| `context/` | Contextos React (PlayerContext - estado global do player) |
| `pages/` | Páginas/rotas da aplicação (Home, Playlist, Artist, Album, Profile, Search, NowPlaying, NotFound) |
| `services/` | Camada de API (axios) e tipos TypeScript |
| `services/api.ts` | Funções de requisição HTTP |
| `services/types.ts` | Interfaces DTOs (ArtistDTO, MusicDTO, PlaylistDTO, etc.) |
| `utils/` | Funções utilitárias (formatação de duração, contagem, etc.) |
| `App.tsx` | Componente raiz com layout e provedor de contexto |
| `main.tsx` | Entry point com configuração de rotas (react-router-dom) |
| `index.css` | Estilos globais e tema Tailwind (cores, scrollbar, utilitários) |

## Arquitetura

- **Roteamento**: Feito pelo `react-router-dom` com layout aninhado. O componente `App` renderiza `Topbar`, `Sidebar`, o conteúdo da rota (`Outlet`) e `PlayerBar`.
- **Estado global**: O `PlayerContext` (via `useReducer`) gerencia a fila de reprodução, faixa atual, progresso e estado de play/pause.
- **Estilos**: Tailwind CSS 4 com tema customizado no `index.css` (cores escuras estilo Spotify).
- **API**: Chamadas HTTP centralizadas em `services/api.ts` com proxy configurado no `vite.config.ts` (resolvi não ativar o CORS no backend em desenvolvimento) em `localhost:8080`.
- **Alias `@/`**: Mapeado para `src/` no `tsconfig.app.json` e `vite.config.ts`.
