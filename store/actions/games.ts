import Game from '../../models/game'

export const SET_GAMES = 'SET_GAMES'

export type GamesAction = { type: any; games: any }

export const fetchGames = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`https://igdb-api.nunogois.com/list`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`
        }
      })

      if (!response.ok) throw new Error('Something went wrong!')

      const resData = await response.json()
      const loadedGames: Game[] = []

      resData.forEach((game: any) => {
        loadedGames.push(
          new Game(
            game.id,
            game.name,
            `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`,
            new Date(game.first_release_date * 1000)
              .toISOString()
              .split('T')[0],
            game.platforms.map((p: any) => `https:${p.platform_logo.url}`),
            +game.total_rating.toFixed()
          )
        )
      })

      dispatch({
        type: SET_GAMES,
        games: loadedGames
      })
    } catch (err) {
      throw err
    }
  }
}
