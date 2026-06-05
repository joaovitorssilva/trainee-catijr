import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import PlaylistPage from './pages/PlaylistPage'
import ArtistPage from './pages/ArtistPage'
import './index.css'
import AlbumPage from './pages/AlbumPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/playlist/:playlistId",
        element: <PlaylistPage />
      },
      {
        path: "/artist/:artistId",
        element: <ArtistPage />
      },
      {
        path: "/album/:albumId",
        element: <AlbumPage/>
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        children: [
          {
            path: "/profile/:profileId",
            element: <ProfilePage />
          }
        ]
      },

    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
