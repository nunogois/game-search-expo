import Game from '../../models/game'

export const SET_GAMES = 'SET_GAMES'

export type GamesAction = { type: any; games: any }

export const fetchGames = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`https://api.igdb.com/v4/games`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ',
          'Client-ID': ''
        },
        body: `fields id, first_release_date, platforms.platform_logo.url, cover.url, total_rating;
        search "mario";
        where version_parent = null;`
      })

      if (!response.ok) throw new Error('Something went wrong!')

      const resData = await response.json()
      const loadedGames: Game[] = []

      resData.forEach((game: any) => {
        loadedGames.push(
          new Game(
            game.id,
            game.name,
            `https:${game.cover.url.replace('t_thumb', 't_cover_small')}`,
            new Date(game.first_release_date * 1000)
              .toISOString()
              .split('T')[0],
            game.platforms.map((p: any) => p.platform_logo.url),
            game.total_rating.toFixed()
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
