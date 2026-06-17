import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import type { MusicDTO } from '../services/types'

interface PlayerState {
  currentTrack: MusicDTO | null
  isPlaying: boolean
  progress: number
  queue: MusicDTO[]
  queueIndex: number
}

type PlayerAction =
  | { type: 'PLAY'; track: MusicDTO; queue?: MusicDTO[] }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'NEXT' }
  | { type: 'PREVIOUS' }
  | { type: 'SEEK'; progress: number }
  | { type: 'SET_QUEUE'; queue: MusicDTO[] }
  | { type: 'TICK' }

interface PlayerContextType {
  currentTrack: MusicDTO | null
  isPlaying: boolean
  progress: number
  queue: MusicDTO[]
  play: (track: MusicDTO, queue?: MusicDTO[]) => void
  pause: () => void
  resume: () => void
  togglePlay: () => void
  next: () => void
  previous: () => void
  seek: (value: number) => void
  setQueue: (queue: MusicDTO[]) => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'PLAY': {
      const queue = action.queue ?? [action.track]
      const queueIndex = queue.findIndex(t => t.id === action.track.id)
      return {
        currentTrack: action.track,
        isPlaying: true,
        progress: 0,
        queue,
        queueIndex: queueIndex >= 0 ? queueIndex : 0,
      }
    }
    case 'PAUSE':
      return { ...state, isPlaying: false }
    case 'RESUME':
      if (!state.currentTrack) return state
      return { ...state, isPlaying: true }
    case 'TOGGLE_PLAY':
      if (!state.currentTrack) return state
      return { ...state, isPlaying: !state.isPlaying }
    case 'NEXT': {
      if (state.queueIndex < state.queue.length - 1) {
        const nextIndex = state.queueIndex + 1
        return { ...state, currentTrack: state.queue[nextIndex], queueIndex: nextIndex, progress: 0, isPlaying: true }
      }
      return { ...state, isPlaying: false, progress: 0 }
    }
    case 'PREVIOUS': {
      if (state.progress > 0.03) {
        return { ...state, progress: 0 }
      }
      if (state.queueIndex > 0) {
        const prevIndex = state.queueIndex - 1
        return { ...state, currentTrack: state.queue[prevIndex], queueIndex: prevIndex, progress: 0, isPlaying: true }
      }
      return { ...state, progress: 0 }
    }
    case 'SEEK':
      return { ...state, progress: action.progress }
    case 'SET_QUEUE': {
      const queue = action.queue
      const queueIndex = queue.findIndex(t => t.id === state.currentTrack?.id)
      return { ...state, queue, queueIndex: queueIndex >= 0 ? queueIndex : 0 }
    }
    case 'TICK': {
      if (!state.currentTrack) return state
      const increment = 0.1 / state.currentTrack.duration
      const next = state.progress + increment
      if (next >= 1) {
        if (state.queueIndex < state.queue.length - 1) {
          const nextIndex = state.queueIndex + 1
          return { ...state, currentTrack: state.queue[nextIndex], queueIndex: nextIndex, progress: 0 }
        }
        return { ...state, isPlaying: false, progress: 0 }
      }
      return { ...state, progress: next }
    }
  }
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, {
    currentTrack: null,
    isPlaying: false,
    progress: 0,
    queue: [],
    queueIndex: -1,
  })

  useEffect(() => {
    if (!state.isPlaying || !state.currentTrack) return
    const id = setInterval(() => dispatch({ type: 'TICK' }), 100)
    return () => clearInterval(id)
  }, [state.isPlaying, state.currentTrack])

  const play = useCallback((track: MusicDTO, queue?: MusicDTO[]) => {
    dispatch({ type: 'PLAY', track, queue })
  }, [])

  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), [])
  const resume = useCallback(() => dispatch({ type: 'RESUME' }), [])
  const togglePlay = useCallback(() => dispatch({ type: 'TOGGLE_PLAY' }), [])
  const next = useCallback(() => dispatch({ type: 'NEXT' }), [])
  const previous = useCallback(() => dispatch({ type: 'PREVIOUS' }), [])
  const seek = useCallback((value: number) => dispatch({ type: 'SEEK', progress: value }), [])
  const setQueue = useCallback((queue: MusicDTO[]) => dispatch({ type: 'SET_QUEUE', queue }), [])

  return (
    <PlayerContext.Provider value={{
      currentTrack: state.currentTrack,
      isPlaying: state.isPlaying,
      progress: state.progress,
      queue: state.queue,
      play,
      pause,
      resume,
      togglePlay,
      next,
      previous,
      seek,
      setQueue,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}
