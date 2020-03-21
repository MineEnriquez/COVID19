import React, { Component } from 'react';
import './FetchDataVirus.css';

export class FetchDataVirus extends Component {
  static displayName = FetchDataVirus.name;
  // Source: https://rapidapi.com/KishCom/api/covid-19-coronavirus-statistics/details
  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true, total: 0, totalCases: 0 };
    this.countries = { countries: [], loading: true };
      var url = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=Canada"; 
    url = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats"; 
    fetch(url, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          "x-rapidapi-key": "16183f2d8dmshfc400b5f552be7ap142362jsnc31c7e278a45"
        }
      })
      .then(response => response.json())
      .then(data => {
        var i;
        var sum = 0;
        var cases = 0;
        for (i = 0; i < data.data.covid19Stats.length; i++) {
          sum = sum + data.data.covid19Stats[i].deaths;
          cases = cases + data.data.covid19Stats[i].confirmed;
        }
        this.setState({
          forecasts: data.data.covid19Stats,
          loading: false,
          total: Number(sum).toLocaleString("en-us"),
          totalCases: Number(cases).toLocaleString("en-us")
        });
        console.log(sum);
        console.log(data.data.covid19Stats[0]);
        })
      .catch(err => {
        console.log(err);
      });

    fetch("https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com",
        "x-rapidapi-key": "16183f2d8dmshfc400b5f552be7ap142362jsnc31c7e278a45"
      }
    })
      .then(response => response.json())
      .then(data => {
        this.countries = data;
        console.log(this.countries[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static renderForecastsTable(forecasts) {
    return (
      <div>
        <div className='small-text'>
        * This program uses an API with publicly available data about current confirmed cases, deaths, and recoveries of the COVID-19 virus AKA Coronavirus compiled by Johns Hopkins University.
        </div>
        
        <table className='table table-striped table-bordered' >
          <thead>
            <tr role='rowheader' className='dataTable'>
              <th>Pais</th>
              <th>Provincia</th>
              <th>Ultima actualizacion</th>
              <th>Casos Confirmados</th>
              <th>Muertes</th>
              <th>Recuperados</th>
            </tr>
          </thead>
          <tbody>
        {forecasts.map(forecast =>
          <tr role='row' key={forecast.country + forecast.province}>
            <td>{forecast.country}</td>
            <td>{forecast.province}</td>
            <td>{forecast.lastUpdate}</td>
            <td>{forecast.confirmed}</td>
            <td>{forecast.deaths}</td>
            <td>{forecast.recovered}</td>
          </tr>
            )}
            </tbody>
        </table>

        </div>

   );
  }

  render () {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchDataVirus.renderForecastsTable(this.state.forecasts);

    return (
    
      <div>
        <h1>Reporte de occurencia</h1>
        <h4> {this.state.totalCases} casos confirmados.</h4>
        <h4> {this.state.total} personas fallecidas. </h4>
        <p>Los valores en esta tabla reflejan los ultimos datos reportados hasta la fecha bajo la columna 'Ultima actualizacion', ordenados por casos confirmados.</p>
        {contents}
      </div>
    );
  }
}
