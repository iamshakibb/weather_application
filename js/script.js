console.log("hello");

window.addEventListener(
  "load",
  () => {
    let longitude;
    let latitude;
    let time;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        time = position.timestamp;
        let localTimeFormat = new Date(time);
        //   const proxy = "https://cors-anywhere.herokuapp.com/";
        const apiKey = "b15d2d0b7db4b947f2524705375669c7"; /*"f39f56366820970060ab2ee35dc37a2c"*/
        const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&dt=${time}&exclude=current,daily,hourly&appid=${apiKey}&units=metric`;
        fetch(api)
          .then((response) => {
            let weather = response.json();
            return weather;
          })
          .then((weather) => {
            console.log(weather);
            let temperature = document.querySelector(".temperature .temperature_number");
            let temperatureDescription = document.querySelector(".temperature_description p");
            let time = document.querySelector(".time p");
            let icon = document.querySelector(".icon img");
            let iconCode = weather.current.weather[0].icon;
            icon.setAttribute("src", `http://openweathermap.org/img/wn/${iconCode}@2x.png`);
            temperature.textContent = weather.current.temp;
            temperatureDescription.textContent = weather.current.weather[0].main;
            time.textContent = localTimeFormat.toLocaleString();

            function sevenDaysWeather() {
              let daysWeather = document.querySelector(".days_weather .container");
              for (let i = 1; i < weather.daily.length; i++) {
                let date = new Date(weather.daily[i].dt * 1000).toLocaleDateString();

                let iconCode = weather.daily[i].weather[0].icon;
                let dailyTemperature = weather.daily[i].temp.max;
                // daysWeather.innerHTML += `<div class="text-center item${i}">
                //                             <h3>${date}</h3>
                //                             <img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon" />
                //                             <p>${dailyTemperature} <span>C</span></p>
                //                         </div>`;

                let dailyWeatherDiv = document.createElement("div");
                dailyWeatherDiv.classList.add("text-center");
                dailyWeatherDiv.innerHTML += `<h3>${date}</h3>
                                           <img class="" src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon" />
                                           <p>${dailyTemperature} <span>C</span></p>`;
                daysWeather.appendChild(dailyWeatherDiv);
                console.log(daysWeather.innerHTML);
              }
            }
            sevenDaysWeather();
          });

        const location_api = `http://ip-api.com/json/?fields=status,country,city,${latitude},${longitude}`;
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
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ],
      });
    });
  },
  false
);

// slider section

// // https://openweathermap.org/weather-conditions
