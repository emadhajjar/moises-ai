import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

const AUDIO_URL =
  'https://github.com/moises-ai/frontend-platform-test/raw/refs/heads/main/public/assets/audio/';
const IMAGE_URL =
  'https://github.com/moises-ai/frontend-platform-test/raw/refs/heads/main/public/assets/images/';

const SONGS = [
  {
    id: 848,
    related: [77_649_302, 11_428_620, 9_226_019, 6_072_496],
    song: {
      album: {
        title: 'Abbey Road',
        year: 1998,
      },
      artist: 'The Beatles',
      files: {
        audio: 'song-1.mp3',
        coverArt: 'beatles-cover.jpeg',
        poster: 'beatles-poster.png',
      },
      title: 'Let It Be',
    },
  },
  {
    id: 12_047_958,
    related: [6_242_641_284, 13_475_611],
    song: {
      album: {
        title: 'Night Visions',
        year: 2007,
      },
      artist: 'Imagine Dragons',
      files: {
        audio: 'song-2.mp3',
        coverArt: 'imagine-dragons-cover.jpeg',
        poster: 'imagine-dragons-poster.png',
      },
      title: 'Radioactive',
    },
  },
  {
    id: 77_649_302,
    related: [10_831_664, 703, 12_047_958, 9_226_019],
    song: {
      album: {
        title: 'I Miss You',
        year: 2011,
      },
      artist: 'blink-182',
      files: {
        audio: 'song-2.mp3',
        coverArt: 'blink-cover.jpeg',
        poster: 'blink-182-poster.png',
      },
      title: 'I Miss You',
    },
  },
  {
    id: 11_428_620,
    related: [],
    song: {
      album: {
        title: 'Greatest Hits, Vol.1',
        year: 2003,
      },
      artist: 'Ray Charles',
      files: {
        audio: 'song-1.mp3',
        coverArt: 'ray-cover.jpeg',
        poster: 'ray-poster.png',
      },
      title: 'Hit the Road Jack',
    },
  },
  {
    id: 13_475_611,
    related: [848, 77_649_302],
    song: {
      album: {
        title: 'Wasting Light',
        year: 1998,
      },
      artist: 'Foo Fighters',
      files: {
        audio: 'song-2.mp3',
        coverArt: 'ff-cover.jpeg',
        poster: 'ff-poster.png',
      },
      title: 'These Days',
    },
  },
  {
    id: 703,
    song: {
      album: {
        title: 'Origins (Deluxe)',
        year: 1996,
      },
      artist: 'Imagine Dragons',
      files: {
        audio: 'song-1.mp3',
        coverArt: 'imagine-dragons-cover.jpeg',
        poster: 'imagine-dragons-poster-2.png',
      },
      title: 'Natural',
    },
  },
  {
    id: 10_831_664,
    related: [13_475_611, 459, 9_226_019, 703],
    song: {
      album: {
        title: 'Led Zeppelin IV (Deluxe Edition)',
        year: 2001,
      },
      artist: 'Led Zeppelin',
      files: {
        audio: 'song-2.mp3',
        coverArt: 'led-cover.jpeg',
        poster: 'led-poster.png',
      },
      title: 'Stairway to Heaven (Remaster)',
    },
  },
  {
    id: 6_242_641_284,
    related: [703, 10_831_664, 860, 848, 12_047_958],
    song: {
      album: {
        title: 'Love',
        year: 1968,
      },
      artist: '100% The Beatles',
      files: {
        audio: 'song-1.mp3',
        coverArt: 'beatles-cover.jpeg',
        poster: 'beatles-poster.png',
      },
      title: 'Come Together',
    },
  },
  {
    id: 459,
    related: [77_649_302, 848, 6_242_641_284, 6_072_496, 11_428_620],
    song: {
      album: {
        title: 'Back To Black',
        year: 2006,
      },
      artist: 'Amy Winehouse',
      files: {
        audio: 'song-2.mp3',
        coverArt: 'amy-cover.jpeg',
        poster: 'amy-poster.jpeg',
      },
      title: "You Know I'm No Good",
    },
  },
  {
    id: 9_226_019,
    related: [12_047_958, 11_428_620, 459, 860],
    song: {
      album: {
        title: 'The Definitive Collection',
        year: 1958,
      },
      artist: 'Stevie Wonder',
      files: {
        audio: 'song-1.mp3',
        coverArt: 'steve-cover.jpeg',
        poster: 'steve-poster.png',
      },
      title: 'I Just Called To Say I Love You',
    },
  },
  {
    id: 6_072_496,
    related: [848, 860, 13_475_611, 703, 9_226_019],
    song: {
      album: {
        title: 'Ray Charles at Newport',
        year: 1982,
      },
      artist: 'Genius + Soul - Ray Charles',
      files: {
        audio: 'song-2.mp3',
        coverArt: 'ray-cover-2.jpeg',
        poster: 'ray-poster.png',
      },
      title: "I've Got a Woman",
    },
  },
  {
    id: 860,
    related: [6_242_641_284, 6_072_496, 77_649_302],
    song: {
      album: {
        title: 'Pop Feelings',
        year: 1971,
      },
      artist: 'Pink Floyd',
      files: {
        audio: 'song-1.mp3',
        coverArt: 'pink-cover.jpeg',
        poster: 'pink-poster.png',
      },
      title: 'Wish You Were Here',
    },
  },
];

const environmentFilePath = `../../../../conf/${process.env.NODE_ENV ?? 'dev'}.env`;

dotenv.config({ path: environmentFilePath });

const prisma = new PrismaClient();

try {
  console.log(`Start seeding ...`);

  // Create songs
  await prisma.song.createMany({
    data: SONGS.map(({ id, song }) => ({
      albumTitle: song.album.title,
      albumYear: song.album.year,
      artist: song.artist,
      audio: AUDIO_URL + song.files.audio,
      cover: IMAGE_URL + song.files.coverArt,
      id,
      poster: IMAGE_URL + song.files.poster,
      title: song.title,
    })),
    skipDuplicates: true,
  });

  // update related
  for (const { id, related } of SONGS) {
    if (related != undefined) {
      await prisma.song.update({
        data: {
          relatedSongs: {
            connect: related.map((songId) => ({
              id: songId,
            })),
          },
        },
        where: { id },
      });
    }
  }
} catch (error) {
  console.error(error);
}

await prisma.$disconnect();
