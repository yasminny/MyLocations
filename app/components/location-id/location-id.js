import './location-id.scss';
import Topbar from '../topbar/topbar';
import React from 'react';
import {connect} from 'react-redux';
// import { scriptLoader } from 'react-async-script-loader';


class Location extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      locationName: '',
      nameValue: '',
      AddressValue: '',
      coordiatesValue: '',
      locationObject: {}
    };
    this.map = null;
    this.createLocationView = this.createLocationView.bind(this);
    this.createCatList = this.createCatList.bind(this);
    // this.createRelevantCatList = this.createRelevantCatList.bind(this);
    this.updateStateValue = this.updateStateValue.bind(this);
    this.howToSearch = this.howToSearch.bind(this);
  }

  componentDidMount() {
    // let script = document.createElement('script');
    // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCBn-LhgjMLDgfUUL9YWjvNeY12ojBbHkM&callback=initMap";
    // document.body.appendChild(script);

    // document.querySelector('body').innerHTML += `<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBn-LhgjMLDgfUUL9YWjvNeY12ojBbHkM" onLoad={console.log('help')}></script>`;

    const locationId = this.props.match.params.locId.toString();
    let locationObj;
    if (locationId !== 'new') {
      this.props.locations.forEach((item) => {
        if (item.id === locationId) {
          locationObj = item;
        }
      });
      this.setState({
        locationObject: locationObj
      });
    }
    else {
      this.setState({
        locationName: 'New',
        nameValue: 'new',
        AddressValue: 'tel aviv, Israel',
        coordiatesValue: {lat: 32.07762926680949, lng: 34.79069709777832}
      });
    }
    this.initMap();
  }


  updateStateValue(name) {
    this.setState({value: name})
  }

  initMap(type) {
    const locationId = this.props.match.params.locId.toString();
    if (locationId === 'new') {
      if (type === 'map') {
      }
      if (type === 'address') {
      }
      if (type === 'latlng') {
      }
    }
    else {
      let locObj;
      this.props.locations.forEach((item) => {
        if (item.id === locationId) {
          locObj = item;
        }
      });
      if (locObj.isEditMode) {

        let templatePartOne = `<form>
          <label>
            Name:
            <input type="text" placeholder=${locObj.name} onchange=${this.handleChange}/>
          </label>
          <label>
            Address:
            <input type="text" placeholder=${locObj.address} onchange=${this.handleChange}/>
          </label>
          <label>
            Coordinates:
            <input type="text" placeholder=${locObj.latLng.lat + ', ' + locObj.latLng.lng} onchange=${this.handleChange}/>
          </label>`;

        let templatePartTwo = `<input type="submit" value="Submit"/>
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
      else {
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
            <p class="name">Name: ${ locObj.name }</p>
            <p>Address: ${ locObj.address }</p>
            <p>Coordinates: ${ locObj.latLng.lat + ', ' + locObj.latLng.lng }</p>
            <p>Categories:</p>
             <ul>`;
        let templatePartTwo = `</ul></div>`;
        relatedCategories.map((name) => {
          templatePartOne += `<li>${name}</li>`;
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
    }
  }

  createCatList(id) {
    return <ul className="categories" ref={(elem) => this.catElm = elem }>
      { this.props.categories.map((item) => {
        return <li key={ item.id }>
          <label className="checkbox">
            { item.name }
            <input type="checkbox"
                   name={item.id}
              // checked={ this.isLocationInThisCategory(id)}
              // onChange={this.handleInputChange}
            />
            <span className="indicator"/>
          </label>
        </li>
      })}
    </ul>
  }

  howToSearch() {
    return <div>
      <p>Please selecet how you wish to search for a new address</p>
      <button type="button" value='via map' onClick={ () => this.initMap('map')}/>
      <button type="button" value='via address search' onClick={ () => this.initMap('address')}/>
      <button type="button" value='via coordinates search' onClick={ () => this.initMap('latlng')}/>
    </div>
  }

  createLocationView() {
    const locationId = this.props.match.params.locId.toString();
    let locObj;
    if (locationId !== 'new') {
      this.props.locations.forEach((item) => {
        if (item.id === locationId) {
          locObj = item;
        }
      });
    }
    else {
      locObj = locationId;
    }

    if (locObj === 'new') {
      return <div className="map-view">
        <h1>Selected Location: New</h1>
        { this.howToSearch()}
      </div>
    }
    else {
      return <div className="map-view">
        <h1>Selected Location: { locObj.name }</h1>
        <div id="map" className="map" ref={(elem) => this.mapElm = elem }/>
      </div>

    }

  }

  render(props) {

    return (
      <div className="location-id-comp">
        <Topbar
          updateStateValue={ this.updateStateValue }
          mode={ 'location-id' }
          selectedLocationObj={ this.state.locationObject }
          selectedLocationName={ this.state.locationName }
          mapElem={ this.mapElm }
          {...this.props}
        />
        { this.createLocationView() }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateCategoryName(id, name){
      dispatch({
        type: 'UPDATE_CATEGORY_NAME',
        id,
        name
      });
    },
    updateCategoryEditMode(id, mode){
      dispatch({
        type: 'UPDATE_CATEGORY_EDITMODE',
        id,
        mode
      });
    }
  }
}

function mapStateToProps(stateData) {
  return {
    categories: stateData.categories,
    locations: stateData.locations
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
