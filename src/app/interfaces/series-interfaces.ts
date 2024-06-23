export interface Serie {
  id: number,
  name: string,
  streamingService: string,
  seasons: number,
  episodesPerSeason: number,
  description: string,
  category: string,
  ratingsCount: number,
}

export interface Comment {
  id: number
  serieId: number,
  userId: number,
  comment: string,
  rating: number
}

export interface NewSerie {
  name: string,
  streamingService: string,
  seasons: number,
  episodesPerSeason: number,
  description: string,
  category: string
}

export interface NewComment {
  serieId: number,
  userId: number,
  comment: string,
  rating: number
}

export interface FilterBar {
  search: string,
  categoryId: number,
  streamingService: string
  rating: number
}