interface Platform {
  name: string
  abbreviation: string
  logo: string
}

interface SimilarGame {
  id: number
  name: string
  image: string
}

class Game {
  id: number
  name: string
  image: string
  date: string
  platforms: Platform[]
  rating: number
  url: string
  summary: string
  genres: string[]
  themes: string[]
  modes: string[]
  companies: string[]
  screenshots: string[]
  similar: SimilarGame[]

  constructor(
    id: number,
    name: string,
    image: string,
    date: string,
    platforms: Platform[],
    rating: number,
    url: string,
    summary: string,
    genres: string[],
    themes: string[],
    modes: string[],
    companies: string[],
    screenshots: string[],
    similar: SimilarGame[]
  ) {
    this.id = id
    this.name = name
    this.image = image
    this.date = date
    this.platforms = platforms
    this.rating = rating
    this.url = url
    this.summary = summary
    this.genres = genres
    this.themes = themes
    this.modes = modes
    this.companies = companies
    this.screenshots = screenshots
    this.similar = similar
  }
}

export default Game
