import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = 'https://image.tmdb.org/t/p/original';

function Row({ title, fetchUrl, isLargeRow }) {
	// short trem memory state
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');

	// when the row appers to the screen use useEffect
	// evertime row load give new result
	useEffect(() => {
		// if [] , run once when the row loads, and dont run it again
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			// http://api.themoviesdb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]);

	// console.log(movies);

	const opts = {
		height: '390',
		width: '100%',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	const handleClick = (movie) => {
		if (trailerUrl) {
			setTrailerUrl('');
		} else {
			movieTrailer(movie?.name || '')
				.then((url) => {
					// https://www.youtube.com/watch?v=Z_7CF29ppmY
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get('v'));
				})
				.catch((error) => console.log(error));
		}
	};

	// A Snippet of code which run on a specific condition/variable

	return (
		<div className='row'>
			<h2>{title}</h2>

			<div className='row__posters'>
				{movies.map((movie) => (
					<img
						key={movie.id}
						onClick={() => handleClick(movie)}
						className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
						src={`${base_url}${
							isLargeRow ? movie.poster_path : movie.backdrop_path
						}`}
						alt={movie.name}
					/>
				))}
			</div>

			{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
		</div>
	);
}

export default Row;
