const API_READ =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2E0MjU3MWIwYTJhMTI3MzhkMGZhYTRjMjQzODRjNCIsIm5iZiI6MTc0MTA3MTk1Mi4xNzEsInN1YiI6IjY3YzZhNjUwZGQ0NmJkMmZkMzkwN2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yEjyd9DnV8rUU3eQerJ_kclflblwGpSt6MLIpux5_YE";

const BASE_URL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_READ}`,
  },
};
const url = `${BASE_URL}/movie/now_playing?language=en-US&page=1`;
const urlGenre = `${BASE_URL}/genre/movie/list?language=en`;

async function get(url) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw response.statusText;
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
(async function () {
  try {
    const [movieResult, genreResult] = await Promise.all([get(url), get(urlGenre)]);
    // mengubah hasil genre menjadi HashMap untuk memudahkan pencarian
    const genreMap = new Map();
    genreResult.genres.forEach((genre) => {
      genreMap.set(genre.id, genre.name);
    });
    // ambil data movies yang dibutuhkan saja
    const movies = movieResult.results.map((movie) => {
      const { title, backdrop_path, poster_path, release_date, genre_ids, id } = movie;
      const result = {
        id,
        title,
        backdrop_path,
        poster_path,
        release_date,
      };
      // ubah data genre_id menjadi genre name nya berdasarkan HashMap yang sudah dibuat
      const genres = genre_ids.map((id) => {
        return genreMap.get(id);
      });
      Object.assign(result, { genres });
      return result;
    });
    console.log(movies);
  } catch (err) {
    console.log(err);
  }
})();
