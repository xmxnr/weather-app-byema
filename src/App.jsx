import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';

function App() {
	const [coords, setCoords] = useState(null);
	const [weather, setWeather] = useState(null);
	const [temp, setTemp] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [showMessage, setShowMessage] = useState(false)
	const [city, setCity] = useState('')

	useEffect(() => {
		setTimeout(() => {
			setShowMessage(true);
		  }, 3000);

		const success = (position) => {
			setCoords({
				lat: position.coords.latitude,
				lon: position.coords.longitude,
			});
		};

		const error = () => {
			setHasError(true);
			setIsLoading(false);
		};
		navigator.geolocation.getCurrentPosition(success, error);
	}, []);
	useEffect(() => {
		if (coords) {
			const API_KEY = '577f7e52c26b8081d3c9d33871c70d3d';
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;
			axios
				.get(url)
				.then((res) => {
					setWeather(res.data);
					const celcius = (res.data.main.temp - 273.15).toFixed(1);
					const fahrenheit = ((celcius * 9 / 5) + 32).toFixed(1);
					setTemp({ celcius, fahrenheit });
				})
				.catch((err) => console.error(err))
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [coords, city]);

	return (
		<div className="app flex-container">
			{isLoading ? (
				<div>
					<Loader />
					{showMessage && <p>Please activate location</p>}
				</div>
			) : hasError ? (
				<h1>
					To obtain the weather of your city you must accept the permissions
				</h1>
			) : (
				<WeatherCard weather={weather} temp = {temp} setCity={setCity}/>
			)}
		</div>
	);
}

export default App;
