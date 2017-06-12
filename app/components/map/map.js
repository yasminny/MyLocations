import './map.scss';
import React from 'react';
import uuid from 'uuid';

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {};

    // this.viewNewMap = this.viewNewMap.bind(this);
    this.viewNewAddress = this.viewNewAddress.bind(this);
    this.viewNewLatlng = this.viewNewLatlng.bind(this);
    this.viewEditMode = this.viewEditMode.bind(this);
    this.viewRegular = this.viewRegular.bind(this);
    this.initMap = this.initMap.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeCoor = this.handleChangeCoor.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
    this.getLatLng = this.getLatLng.bind(this);
    this.createCategories = this.createCategories.bind(this);
  }

  componentDidMount() {
    this.initMap();
  }

  componentDidUpdate() {
    this.initMap();
  }

  // viewNewMap() {
  //   let marker;
  //   let map = new google.maps.Map(this.mapElm, {
  //     zoom: 13,
  //     center: {lat: 32.07762926680949, lng: 34.79069709777832}
  //   });
  //
  //   google.maps.event.addListener(map, 'click', function (event) {
  //     const latlangNew = {lat: event.latLng.lat(), lng: event.latLng.lng()};
  //     let locationObject: {
  //       id: 0,
  //       name: 'new',
  //       address: '',
  //       latLng: latlangNew,
  //       relatedCat: [],
  //       isEditMode: false
  //     };
  //     func(locationObject);
  //     marker = new google.maps.Marker({
  //       position: event.latLng,
  //       map: map,
  //       draggable: true,
  //       animation: google.maps.Animation.DROP
  //     });
  //
  //   });
  // }

  handleChangeName() {
    console.log();
  }

  handleChangeAddress() {

  }

  handleChangeCoor() {

  }

  handelSubmit() {
    console.log(this.mapElm);
  }

  viewNewAddress() {
    this.addContainerElem.classList.remove('hidden');
    let map = new google.maps.Map(this.mapElm, {
      zoom: 8,
      center: {lat: -34.397, lng: 150.644}
    });
    let geocoder = new google.maps.Geocoder();

    this.submitElem.addEventListener('click', function () {
      this.geocodeAddress(geocoder, map);
    });
  }

  geocodeAddress(geocoder, resultsMap) {
    let address = this.addElem.value;
    geocoder.geocode({'address': address}, function (results, status) {
      if (status === 'OK') {
        console.log(results);
        resultsMap.setCenter(results[0].geometry.location);
        let marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      }
      else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  viewNewLatlng() {
    this.latLngContainerElem.classList.remove('hidden');
  }

  viewEditMode(locObj, handelSubmit) {
    this.formElem.classList.remove('hidden');
    let templatePartOne = `<form onsubmit="handelSubmit()">
          <label>
            Name:
            <input type="text" value=${locObj.name} class="name-input" onchange=${this.handleChangeName}/>
          </label>
          <label>
            Address:
            <input type="text" value=${locObj.address} class="address-input" onchange=${this.handleChangeAddress}/>
          </label>
          <label>
            Coordinates:
            <input type="text" value=${locObj.latLng.lat + ', ' + locObj.latLng.lng}  class="coordinates-input" onchange=${this.handleChangeCoor}/>
          </label>`;
    let templatePartTwo = `<input type="submit" value="Save"/>
        </form>`;

    let relatedCategories = [];
    locObj.relatedCat.map((id) => {
        return this.props.categories.map((cat) => {
          if (cat.id === id.toString()) {
            templatePartOne += `<input type="checkbox" checked="true">${cat.name}</input>`;
          }
          else {
            templatePartOne += `<input type="checkbox">${cat.name}</input>`;
          }
        })
      }
    );
    relatedCategories.map((name) => {

    });

    let templatefull = templatePartOne + templatePartTwo;
    let map = new google.maps.Map(this.mapElm, {
      zoom: 12,
      center: locObj.latLng,
      mapTypeId: 'terrain'
    });

    let infowindow = new google.maps.InfoWindow({
      content: templatefull
    });

    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: locObj.latLng
    });

    infowindow.open(map, marker);


  }

  viewRegular(locObj) {
    let relatedCategories = [];
    locObj.relatedCat.map((id) => {
        return this.props.categories.map((cat) => {
          if (cat.id === id.toString()) {
            return relatedCategories.push(cat.name);
          }
        })
      }
    );

    let templatePartOne = `<div id="info">
            <p>Address: ${ locObj.address }</p>
            <p>Coordinates: ${ locObj.latLng.lat + ', ' + locObj.latLng.lng }</p>
            <p>Categories:</p>
             <ul>`;
    let templatePartTwo = `</ul></div>`;
    relatedCategories.map((name) => {
      templatePartOne += `<li>${name}</li>`;
    });

    let templateFull = templatePartOne + templatePartTwo;

    let map = new google.maps.Map(this.mapElm, {
      zoom: 12,
      center: locObj.latLng,
      mapTypeId: 'terrain'
    });

    let infowindow = new google.maps.InfoWindow({
      content: templateFull
    });

    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: locObj.latLng
    });

    infowindow.open(map, marker);
  }

  initMap(type, func) {
    const locationId = this.props.locationObject.id;
    if (locationId === 'new') {
      // if (type === 'map') {
      //   return this.viewNewMap();
      // }
      if (type === 'address') {
        return this.viewNewAddress();
      }
      if (type === 'latlng') {
        return this.viewNewLatlng();
      }
    }
    else {
      let locObj = this.props.locationObject;
      if (locObj.isEditMode) {
        return this.viewEditMode(locObj, this.handelSubmit());
      }
      else {
        return this.viewRegular(locObj);
      }
    }
  }

  getLatLng(){
    const newObject = {
      id: uuid(),
      name: 'New',
      address: '?',
      latLng: {lat: this.latElem.value, lng: this.lngElem.value},
      relatedCat: [],
      isEditMode: true
    };
    this.latLngContainerElem.classList.add('hidden');
    this.viewEditMode(newObject);
  }

  createCategories(){

  }

  render() {
    return <div>
      <div id="form hidden" ref={(elem) => this.formElem = elem}>
        <table>
          <tr><td>Name:</td> <td><input type='text' id='name'/> </td> </tr>
          <tr><td>Address:</td> <td><input type='text' id='address'/> </td> </tr>
          <tr><td>Type:</td> <td><select id='type'> +
            { this.createCategories() }
            <option value='restaurant'>restaurant</option>
          </select> </td></tr>
          <tr><td/><td><input type='button' value='Save' onClick={}/></td></tr>
        </table>
      </div>
      <div className="lat-lng-section hidden" ref={(elem) => this.latLngContainerElem = elem}>
        <label>
          Latitude:
          <input type="number" ref={(elem) => this.latElem = elem}/>
        </label>
        <label>
          Longitude:
          <input type="number" ref={(elem) => this.lngElem = elem}/>
        </label>
        <button type="submit" onClick={ this.getLatLng }>Find</button>
      </div>
      <div className="floating-panel hidden" ref={(elem) => this.addContainerElem = elem}>
        <input className="address" type="textbox" ref={(elem) => this.addElem = elem}/>
        <input className="submit" type="button" value="Find" ref={(elem) => this.submitElem = elem}/>
      </div>
      <div id="map" className="map" ref={(elem) => this.mapElm = elem }/>
    </div>;
  }

}
