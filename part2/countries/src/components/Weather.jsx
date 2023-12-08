import styled from 'styled-components'

const Weather = ({ weather, country }) => {

  const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <Wrapper>
      <Header>Weather in {country.capital[0]}</Header>
      <Row>
        <WeatherImage src={weatherIcon}/>
        <div>
          <p>Current Temp: <b>{weather.main.temp}&deg;C</b></p>
          <p>Low of <b>{weather.main.temp_min}&deg;C</b></p>
          <p>High of <b>{weather.main.temp_max}&deg;C</b></p>
        </div>
      </Row>
      <p>Wind Speed: <b>{weather.wind.speed}m/s</b></p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const WeatherImage = styled.img`
  width: 50%;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const Header = styled.h3`
  margin-bottom: 20px;
`

export default Weather