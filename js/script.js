window.addEventListener("load", () => {
  let longitude;
  let latitude;
  let time;
  if (navigator.geolocation) {
    // getting longitude and latitude by geolocaion
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      time = position.timestamp;
      let localTimeFormat = new Date(time);

      // weather api address and api key
      const apiKey = "b15d2d0b7db4b947f2524705375669c7";
      const api = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&dt=${time}&exclude=current,daily,hourly&appid=${apiKey}&units=metric`;

      //calling the weather api
      fetch(api)
        .then((response) => {
          let weather = response.json();
          return weather;
        })
        .then((weather) => {
          let temperature = document.querySelector(".temperature .temperature_number");
          let temperatureDescription = document.querySelector(".temperature_description p");
          let time = document.querySelector(".time p");
          let icon = document.querySelector(".icon img");

          //getting the weather icon code
          let iconCode = weather.current.weather[0].icon;

          //getting the weather icon img
          icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconCode}@2x.png`);
          temperature.textContent = weather.current.temp;
          temperatureDescription.textContent = weather.current.weather[0].main;
          time.textContent = localTimeFormat.toLocaleString();
          sevenDaysWeather();
          slider();

          //function for creating dynamic div of daily weather
          function sevenDaysWeather() {
            let daysWeather = document.querySelector(".days_weather .container");
            for (let i = 1; i < weather.daily.length; i++) {
              let date = new Date(weather.daily[i].dt * 1000).toLocaleDateString();
              let iconCode = weather.daily[i].weather[0].icon;
              let dailyWeatherDescription = weather.daily[i].weather[0].main;
              let dailyTemperature = weather.daily[i].temp.max;
              let dailyWeatherDiv = document.createElement("div");
              dailyWeatherDiv.classList.add("text-center");
              dailyWeatherDiv.innerHTML += `<h4>${date}</h4>
                                           <img class="center-block" src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon" />
                                           <h5>${dailyTemperature} <span>C</span></h5>
                                           <p>${dailyWeatherDescription}</p>`;
              daysWeather.appendChild(dailyWeatherDiv);
            }
          }
        });

      //location api address
      const location_api = `http://ip-api.com/json/?fields=status,country,city,${latitude},${longitude}`;

      //calling the location api
      fetch(location_api)
        .then((response) => {
          let date = response.json();
          return date;
        })
        .then((data) => {
          let location = document.querySelector(".location h2");
          location.textContent = data.city;
        });
    });
  }
});

// slider section

function slider() {
  $(document).ready(function () {
    $(".days_weather .container").slick({
      prevArrow: '<i class="fas fa-chevron-left left_arrow"></i>',
      nextArrow: '<i class="fas fa-chevron-right right_arrow"></i>',
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  });
}
