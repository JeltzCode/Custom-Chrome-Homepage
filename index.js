let latitude = "35.4516992"
let longitude = "-80.822272"
let weatherUpdateTime = ""
imageLocationEl = document.querySelector("#img-loc")

fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=landscape`)
	.then(res => {if (!res.ok) {throw Error(`something went wrong (background image)`)};return res.json()})
	.then(data => {
		document.body.style.backgroundImage = `url(${data.urls.regular})`
		data.location.title === null ? imageLocationEl.innerHTML = "" : imageLocationEl.innerHTML = `${data.location.title}`
	})
	.catch(err => {document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTQzODYxMjY&ixlib=rb-1.2.1&q=80&w=1080")`})

function getTimeDate() {
	const date = new Date()
	const currentDate = date.toDateString()
	const currentTime = date.toLocaleTimeString(`en-us`, {timeStyle: `medium`})
	document.querySelector("#time").innerHTML =`${currentDate}<br>${currentTime}`
}

function getLocation() {
	navigator.geolocation.getCurrentPosition(position => {
		latitude = position.coords.latitude
		longitude = position.coords.longitude
		getWeather()
	})
}

async function getWeather() {
	weatherUpdated()
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&APPID=eefed1ff72fa299b764055111435f83c`)
		.then(res => {
			if (!res.ok) {
				throw Error("Weather data not available")
			} return res.json()
		})
		.then(data => {
			document.querySelector("#weather-data").innerHTML = `
				<img id="icon-img" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
				<span id="temp">${Math.round(data.main.temp)}º</span>`
			document.querySelector("#weather-other").innerHTML = `
				<p>🤒: ${Math.round(data.main.feels_like)}º
				   🏜️: ${data.main.humidity}%</p>
				<p id="weather-updated">Updated:${weatherUpdateTime}</p>`
		})
		.catch(err => {
			console.log(err)
			document.querySelector("#weather").innerHTML = `Weather unavailable`
		})
}

function weatherUpdated() {
	const date = new Date()
	weatherUpdateTime = date.toLocaleTimeString(`en-us`, {timeStyle: `short`})
}
	
getLocation()
getTimeDate()
setInterval(() => getTimeDate(), 1000)
setInterval(() => getWeather(), 300000)