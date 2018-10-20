import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import SparkLine from '../components/Chart';
import GoogleMap from '../components/google-map';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp);
    const pressure = cityData.list.map(weather => weather.main.pressure);
    const humidity = cityData.list.map(weather => weather.main.humidity);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={name}>
        <td>
          {name}
          <GoogleMap lat={lat} lng={lon} />
        </td>
        <td>
          <SparkLine data={temps} color="orange" units="K" />
        </td>
        <td>
          <SparkLine data={pressure} color="green" units="hPa" />
        </td>
        <td>
          <SparkLine data={humidity} color="purple" units="%" />
        </td>
      </tr>
    );
  }
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">City</th>
            <th scope="col">Temperature (K)</th>
            <th scope="col">Pressure (hPa)</th>
            <th scope="col">Humidity (%)</th>
          </tr>
        </thead>
        <tbody>{this.props.weather.map(this.renderWeather)}</tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);
