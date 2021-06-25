class Game {
  id: number
  name: string
  image: string
  date: string
  platforms: [string]
  rating: number

  constructor(
    id: number,
    name: string,
    image: string,
    date: string,
    platforms: [string],
    rating: number
  ) {
    this.id = id
    this.name = name
    this.image = image
    this.date = date
    this.platforms = platforms
    this.rating = rating
  }
}

export default Game
