import useSWR from 'swr'
import Game from '../models/game'

const mapGames = (data: []) => {
  const games: Game[] = []

  data.forEach((game: any) => {
    games.push(
      new Game(
        game.id,
        game.name,
        `https:${game.cover?.url.replace('t_thumb', 't_cover_big_2x')}`,
        game.first_release_date
          ? new Date(game.first_release_date * 1000).toISOString().split('T')[0]
          : '',
        game.platforms
          ? game.platforms.map((p: any) => ({
              name: p.name,
              abbreviation: p.abbreviation,
              logo: `https:${p.platform_logo?.url}`
            }))
          : [],
        +game.total_rating?.toFixed(),
        game.url,
        game.summary,
        game.genres ? game.genres.map((g: any) => g.name) : [],
        game.themes ? game.themes.map((t: any) => t.name) : [],
        game.game_modes ? game.game_modes.map((m: any) => m.name) : [],
        game.involved_companies
          ? game.involved_companies.map((c: any) => c.company?.name)
          : [],
        game.screenshots
          ? game.screenshots.map(
              (s: any) => `https:${s.url.replace('t_thumb', 't_cover_big_2x')}`
            )
          : [],
        game.similar_games
          ? game.similar_games.map((g: any) => ({
              id: g.id,
              name: g.name,
              image: `https:${g.cover?.url.replace(
                't_thumb',
                't_cover_big_2x'
              )}`
            }))
          : []
      )
    )
  })

  return games
}

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`
    }
  })
    .then(res => res.json())
    .then(res => mapGames(res))

export const useGames = (search: string = '') => {
  const { data, error, mutate } = useSWR(
    `${process.env.API}?search=${search}`,
    fetcher
  )

  return {
    games: data ?? [],
    isLoading: !error && !data,
    error,
    reload: mutate
  }
}

export const useGame = (id: number) => {
  const { data, error, mutate } = useSWR(`${process.env.API}?id=${id}`, fetcher)

  return {
    game: data ? data[0] : undefined,
    isLoading: !error && !data,
    error,
    reload: mutate
  }
}
