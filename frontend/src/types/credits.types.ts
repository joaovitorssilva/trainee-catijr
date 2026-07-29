export interface CreditContributor {
  id: string
  name: string
  roles: string[]
  isArtist?: boolean
  isFollowing?: boolean
}

export interface CreditsSection {
  title: string
  contributors: CreditContributor[]
}

export interface TrackCredits {
  trackName: string
  sections: CreditsSection[]
}