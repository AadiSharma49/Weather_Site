const weatherForm=document.querySelector(".weatherForm")//form
const cityInput=document.querySelector(".cityInput")//text box
const box=document.querySelector(".box")
const apiKey="c6790861eb16bc95a006006c80c7f015"

weatherForm.addEventListener("submit",async event=>
{
    event.preventDefault()

    const city=cityInput.value;

    if(city)
    {
        try{
            const weatherData=await getWeather(city)
            displayWeatherInfo(weatherData)

        }
        catch(error)
        {
            console.error(error)
            displayError(error)
        }
            
    }
    else
    {
        displayError("PLEASE ENTER A CITY !")
    }
}
)

async function getWeather(city){


    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
    const response= await fetch(apiUrl)
    console.log(response)

    if(!response.ok)
    {
        throw new Error("COULD NOT FETCH WEATHER DATA ")
    }
    else
    {
        return await response.json()
    }
}
function displayWeatherInfo(data)
{
    // console.log(data)
    const {name:city,
        main:{temp,humidity}
        ,weather:[{description,id}
        ]}=data//its array of obj , and it also a nested obj}

        box.textContent=""
        box.style.display="flex"

        const cityDisplay=document.createElement("h1")
        const tempDisplay=document.createElement("p")
        const humidityDisplay=document.createElement("p")
        const descDisplay=document.createElement("p")
        const weatherEmoji=document.createElement("p")
        const errorDisplay=document.createElement("p")


        cityDisplay.textContent=city
        cityDisplay.classList.add("cityDisplay")
        box.appendChild(cityDisplay)

        tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`
        tempDisplay.classList.add("tempDisplay")
        box.appendChild(tempDisplay)

        humidityDisplay.textContent=`Humidity:- ${humidity}`
        humidityDisplay.classList.add("humidityDisplay")
        box.appendChild(humidityDisplay)

        descDisplay.textContent=description
        descDisplay.classList.add("descDisplay")
        box.appendChild(descDisplay)

        weatherEmoji.textContent=getWeatherEmoji(id)
        weatherEmoji.classList.add("weatherEmoji")
        box.appendChild(weatherEmoji)
}

function getWeatherEmoji(weatherId)
{
    switch(true)
    {
        case (weatherId>= 200 && weatherId<300):
            return "🌦️"; 
        case (weatherId>= 300 && weatherId<400):
            return "🌧️"; 
        case (weatherId>= 500 && weatherId<600):
            return "⛈️"; 
        case (weatherId>= 600 && weatherId<700):
            return "❄️";
        case (weatherId>= 700 && weatherId<800):
         return "🌫️"; 
        case (weatherId===800):
       return "☀️"; 
        case (weatherId>= 801 && weatherId<810):
         return "☁️"; 
         default:
         return "⭐"           

    }
}

function displayError(message)
{
    const errorDisplay=document.createElement("p")
    errorDisplay.textContent=message
    errorDisplay.classList.add("errorDisplay")

    box.textContent=""
    box.style.display="flex"
    box.appendChild(errorDisplay)
}
