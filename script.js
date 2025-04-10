document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const weatherDetails = document.getElementById('weather-details');
    const errorMessage = document.getElementById('error-message');
    const loading = document.getElementById('loading');
    
    // Create audio element for Cena's catchphrase
    const cenaAudio = new Audio('https://www.myinstants.com/media/sounds/and-his-name-is-john-cena-1.mp3');

    // OpenWeatherMap API Key - you should replace this with your own API key
    const apiKey = '5f472b7acba333cd8a035ea85a0d4d4c'; // Example API key, get your own from OpenWeatherMap
      // Event listener for the search button
    searchBtn.addEventListener('click', () => {
        getWeatherData();
        playJohnCenaSound();
    });

    // Event listener for the Enter key
    cityInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            getWeatherData();
            playJohnCenaSound();
        }
    });
    
    // Function to play John Cena sound
    function playJohnCenaSound() {
        cenaAudio.volume = 0.5; // Set volume to 50%
        cenaAudio.play().catch(error => {
            console.log('Audio playback prevented: ', error);
        });
    }    // Function to fetch weather data
    function getWeatherData() {
        const city = cityInput.value.trim();
        
        if (!city) {
            showError('You can\'t search for nothing! Enter a city name.');
            return;
        }

        // Show loading indicator with wrestling flair
        showLoading();
        loading.textContent = "The champ is searching...";
        
        // Clear previous results
        hideWeatherDetails();
        hideError();

        // Fetch data from OpenWeatherMap API
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayWeatherData(data);
                hideLoading();
            })
            .catch(error => {
                hideLoading();
                showError(error.message === 'City not found' ? 'YOU CAN\'T SEE THIS CITY! Try another one.' : 'Weather data tap-out! Try again later.');
            });
    }

    // Function to display weather data
    function displayWeatherData(data) {
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind: ${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
        
        showWeatherDetails();
    }

    // Helper functions for UI state management
    function showWeatherDetails() {
        weatherDetails.classList.remove('hidden');
    }

    function hideWeatherDetails() {
        weatherDetails.classList.add('hidden');
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    function hideError() {
        errorMessage.classList.add('hidden');
    }

    function showLoading() {
        loading.classList.remove('hidden');
    }

    function hideLoading() {
        loading.classList.add('hidden');
    }
});
