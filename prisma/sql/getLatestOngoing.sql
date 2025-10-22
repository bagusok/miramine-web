 WITH LatestEpisodes AS (
    SELECT DISTINCT ON (a.id)
      a.id as anime_id,
      e.id as episode_id,
      a.title as anime_title,
      e.title as episode_title,
      a.image_url as image_url,
      e.episode,
      a.mal_data,
      e.created_at
    FROM anime a
    INNER JOIN episode e ON e.anime_id = a.id
    WHERE a.status = 'ONGOING'
    ORDER BY a.id, e.created_at DESC
  )
  SELECT *
  FROM LatestEpisodes
  ORDER BY created_at DESC LIMIT $1 OFFSET $2;