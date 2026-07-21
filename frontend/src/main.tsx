import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PlayerProvider } from '@/context/PlayerContext'

import App from './components/layout/App'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import PlaylistPage from './pages/PlaylistPage'
import ArtistPage from './pages/ArtistPage'
import AlbumPage from './pages/AlbumPage'
import NowPlayingPage from './pages/NowPlayingPage'
import SearchPage from './pages/SearchPage'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <NotFoundPage />
      },
      {
        path: "/playlist/:playlistId",
        element: <PlaylistPage />,
        errorElement: <NotFoundPage />
      },
      {
        path: "/artist/:artistId",
        element: <ArtistPage />,
        errorElement: <NotFoundPage />
      },
      {
        path: "/album/:albumId",
        element: <AlbumPage />,
        errorElement: <NotFoundPage />
      },
      {
        path: "/search",
        element: <SearchPage />,
        errorElement: <NotFoundPage />
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        errorElement: <NotFoundPage />,
        children: [
          {
            path: "/profile/:profileId",
            element: <ProfilePage />,
            errorElement: <NotFoundPage />
          }
        ]
      },

    ]
  },
  {
    path: "/now-playing",
    element: <NowPlayingPage/>,
    errorElement: <NotFoundPage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlayerProvider>
      <RouterProvider router={router} />
    </PlayerProvider>
  </StrictMode>,
)
