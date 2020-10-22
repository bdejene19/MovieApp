
var showGenres = [];
var movieGenres = [];

const getShowGenres = () => {
    const tvShowGenreURL = 'https://api.themoviedb.org/3/genre/tv/list?api_key=27b6fe5df9c85fb31e3d874a62a2154b&language=en-US';
    fetch(tvShowGenreURL)
    .then(res => res.json())
    .then(data => {

        showGenres.push(data.name);
        console.log(genres)
    })



}

const getMovieGenres = () => {
    const movieGenreURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=27b6fe5df9c85fb31e3d874a62a2154b&language=en-US';
    fetch(movieGenreURL) 
    .then(res => res.json())
    .then(data => {
        movieGenres.push(data.name);
    })
}


const totalGenres = (list1, list2) => {
    for (index in list1) {
        console.log(index)
    }

}