import './map.scss';
import React from 'react';

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.viewNewMap = this.viewNewMap.bind(this);
    this.viewNewAddress = this.viewNewAddress.bind(this);
    this.viewNewLatlng = this.viewNewLatlng.bind(this);
    this.viewEditMode = this.viewEditMode.bind(this);
    this.viewRegular = this.viewRegular.bind(this);
    this.initMap = this.initMap.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeCoor = this.handleChangeCoor.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }

  componentDidMount() {
    this.initMap();
  }

  componentDidUpdate(){
      this.initMap();
  }

  viewNewMap() {
    let marker;
    let map = new google.maps.Map(this.mapElm, {
      zoom: 13,
      center: {lat: 32.07762926680949, lng: 34.79069709777832}
    });

    google.maps.event.addListener(map, 'click', function (event) {
      const latlangNew = {lat: event.latLng.lat(), lng: event.latLng.lng()};
      let locationObject: {
        id: 0,
        name: 'new',
        address: '',
        latLng: latlangNew,
        relatedCat: [],
        isEditMode: false
      };
      func(locationObject);
      marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP
      });

    });
  }

  handleChangeName(){
console.log();
  }

  handleChangeAddress(){

  }

  handleChangeCoor(){

  }

  handelSubmit(){
console.log(this.mapElm);
  }

  viewNewAddress() {

    return (<div>
      <div id="floating-panel">
        <input id="address" type="textbox" value="tel aviv"/>
          <input id="submit" type="button" value="Find"/>
      </div>
    </div>);
  }

  viewNewLatlng() {

  }

  //use ref to get new value of text!

  viewEditMode(locObj, handelSubmit) {
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

    console.log();
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
      if (type === 'map') {
        return this.viewNewMap();
      }
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

  render() {
    return <div id="map" className="map" ref={(elem) => this.mapElm = elem }/>;
  }

}
