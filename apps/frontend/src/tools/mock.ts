'use server'

type Content = {
  title: string
  duration: number
  director: string
  description: string
  image: {
    cover: string
    poster: string
  }
  peoples: {
    writers: Array<string>
    casting: Array<string>
  }
}

const mock: Array<Content> = [
  {
    duration: 8640,
    title: 'Inception',
    director: 'Christopher Nolan',
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
    image: {
      cover:
        'https://image.tmdb.org/t/p/original/b5xAbWqVNsp14lCtR2vhaURWo7G.jpg',
      poster:
        'https://image.tmdb.org/t/p/original/aej3LRUga5rhgkmRP6XMFw3ejbl.jpg',
    },
    peoples: {
      writers: ['Christopher Nolan'],
      casting: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
    },
  },
  {
    duration: 10140,
    title: 'The Martian',
    director: 'Ridley Scott',
    description:
      'An astronaut becomes stranded on Mars and must rely on his ingenuity to find a way to signal to Earth that he is alive.',
    image: {
      cover:
        'https://image.tmdb.org/t/p/original/3dPhs7hUnQLphDFzdkD407VZDYo.jpg',
      poster:
        'https://image.tmdb.org/t/p/original/7wTv70QMeSFbt3MKyewwXzuXAEv.jpg',
    },
    peoples: {
      writers: ['Drew Goddard'],
      casting: ['Matt Damon', 'Jessica Chastain', 'Kristen Wiig'],
    },
  },
  {
    duration: 6540,
    title: 'Gravity',
    director: 'Alfonso Cuarón',
    description:
      'Two astronauts work together to survive after an accident leaves them stranded in space.',
    image: {
      poster:
        'https://image.tmdb.org/t/p/original/eciB4mHMOKHR3Fnku1uu9uIroNQ.jpg',
      cover:
        'https://image.tmdb.org/t/p/original/b1yXVhXXfK7qQTeAIvtSHovFImg.jpg',
    },
    peoples: {
      writers: ['Alfonso Cuarón', 'Jonás Cuarón'],
      casting: ['Sandra Bullock', 'George Clooney'],
    },
  },
  {
    duration: 7800,
    title: 'Arrival',
    director: 'Denis Villeneuve',
    description:
      'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.',
    image: {
      cover:
        'https://image.tmdb.org/t/p/original/uKPbFF08QkRMvIAsgCh1soeyPhZ.jpg',
      poster:
        'https://image.tmdb.org/t/p/original/cAzBLiaeQckIKgb6nLiOYwqUe22.jpg',
    },
    peoples: {
      writers: ['Eric Heisserer'],
      casting: ['Amy Adams', 'Jeremy Renner', 'Forest Whitaker'],
    },
  },
]

const getMockedContents = async () => {
  return mock
}

const getMockedVideo = async () => {
  return {
    type: 'video',
    subtype: 'm3u8',
    value: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  }
}

export { getMockedVideo, getMockedContents }
