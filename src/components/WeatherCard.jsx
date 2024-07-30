import React, { useRef, useState } from 'react';
import './styles/WeatherCard.css'

const WeatherCard = ({ weather, temp, setCity }) => {
	const [isCelcius, setIsCelcius] = useState(true);
	const changeDegrees = () => {
		setIsCelcius(!isCelcius);
	};

	const handleSubmit = (e) => {
		e.preventDefault ();
		setCity(inputSearch.current.value)
	}

	const inputSearch = useRef();

	return (
		<section className='card flex-container'>
			<h1 className='card__title'>Weather App</h1>
			<h2 className='card__country'>
				{weather?.name}, {weather?.sys.country}
			</h2>
			<form onSubmit={handleSubmit}>
				<input type="search" placeholder='Search By City' ref={inputSearch}/>
			</form>
			<button className='button__search'>Search</button>
			<article className='card__body grid-container'>
				<div className='card__image-container'>
					<img
						className='card__image'
						src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
						alt={weather?.weather[0].main}
					/>
				</div>
				<article className='info grid__container'>
					<h3 className='info__title'>{weather?.weather[0].description}</h3>
					<ul className='info__list grid-container'>
						<li className='info__item'>
							<span className='info__label grid-container'>Wind Speed:</span>
							<span className='info__value grid-container'>{weather?.wind.speed} m/S</span>
						</li>
						<li className='info__item'>
							<span className='info__label grid-container'>Clouds:</span>
							<span className='info__value grid-container'>{weather?.clouds.all} %</span>
						</li>
						<li className='info__item'>
							<span  className='info__label grid-container'>Pressure:</span>
							<span className='info__value grid-container'>{weather?.main.pressure} hPa</span>
						</li>
					</ul>
				</article>
				<h2 className='card__temp'> {isCelcius ? `${temp.celcius}°C` : `${temp.fahrenheit}°F`} </h2>
				<button className='card__btn' onClick={changeDegrees}>Change to  {isCelcius ? '°F' : '°C'}</button>
			</article>
		</section>
	);
};

export default WeatherCard;
