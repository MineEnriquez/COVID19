import React, { Component } from 'react';
import './FetchDataVirus.css';

export class FetchDataVirus extends Component {
  static displayName = FetchDataVirus.name;

  //constructor(props) {
  //  super(props);
  //  this.state = { forecasts: [], loading: true };
  //  var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  //  var targetUrl = 'https://ghoapi.azureedge.net/api';
  //  fetch(proxyUrl + targetUrl)
  //    .then(response => response.json())
  //    .then(contents => {
  //      console.log(contents.value[1])
  //      this.setState({
  //        forecasts: contents.value, loading: false
  //      })
  //    })
  //    .catch(() => console.log("Can’t access " + targetUrl + " response. Blocked by browser?"));
  //}
  // Source: https://rapidapi.com/KishCom/api/covid-19-coronavirus-statistics/details
  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };
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
        this.setState({ forecasts: data.data.covid19Stats, loading: false });
        console.log(data.data.covid19Stats[1]);
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

    //$(document).ready(function () {
    //  $('#dtOrderExample').DataTable({
    //    "order": [[3, "desc"]]
    //  });
    //  $('.dataTables_length').addClass('bs-select');
    //});
  }

  static renderForecastsTable(forecasts) {
    return (
      <div>
        <div className='small-text'>
        * This program uses an API with publicly available data about current confirmed cases, deaths, and recoveries of the COVID-19 virus AKA Coronavirus compiled by Johns Hopkins University. Accepts: country as filter parameter, otherwise returns all stats. Country name must match exactly with what is in the data (URL encoded spaces and punctuation) For some reason RapidAPI counts 304 "Not Modified" responses as "errors". This is the reason for the high "error count" of this API.
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
        <table>
          <tr>
            <td>
              <h1>Reporte de occurencia</h1>
            </td>
            <td className='right-justified'>
                * Todos los paises.
            </td>
            </tr>
        </table>

        <p>Los valores en esta tabla reflejan los ultimos datos reportados hasta la fecha bajo la columna 'Ultima actualizacion', ordenados por casos confirmados.</p>
        {contents}
      </div>
    );
  }
}
