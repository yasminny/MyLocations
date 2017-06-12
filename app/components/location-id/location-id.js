import './location-id.scss';
import Topbar from '../topbar-loc-id/topbar';
import Map from '../map/map';
import React from 'react';
import {connect} from 'react-redux';
// import { scriptLoader } from 'react-async-script-loader';
import uuid from 'uuid';


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
    // this.createCatList = this.createCatList.bind(this);
    // this.createRelevantCatList = this.createRelevantCatList.bind(this);
    // this.updateStateValue = this.updateStateValue.bind(this);
    this.howToSearch = this.howToSearch.bind(this);
  }

  // shouldComponentUpdate() {
  //   // let script = document.createElement('script');
  //   // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCBn-LhgjMLDgfUUL9YWjvNeY12ojBbHkM&callback=initMap";
  //   // document.body.appendChild(script);
  //   // document.querySelector('body').innerHTML += `<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBn-LhgjMLDgfUUL9YWjvNeY12ojBbHkM" onLoad={console.log('help')}></script>`;
  //
  //
  //     // console.log(locationObj);
  //     // this.setState((prevState, props) => {
  //     //   return {locationObject: prevState.locationObject = locationObj};
  //     // });
  //     // this.setState({
  //     //   locationObject: locationObj
  //     // });
  //     this.forceUpdate({locationObject: locationObj})
  //
  //   console.log(this.state.locationObject);
  //   return true;
  // }
  // updateStateValue(obj) {
  //   this.setState({locationObject: obj})
  // }
  // initMap(type, func) {
  //   const locationId = this.props.match.params.locId.toString();
  //   if (locationId === 'new') {
  //   //   if (type === 'map') {
  //   //     let marker;
  //   //     let map = new google.maps.Map(this.mapElm, {
  //   //       zoom: 13,
  //   //       center: {lat: 32.07762926680949, lng: 34.79069709777832}
  //   //     });
  //   //
  //   //     google.maps.event.addListener(map, 'click', function (event) {
  //   //       console.log(func);
  //   //       const latlangNew = { lat: event.latLng.lat(), lng: event.latLng.lng()};
  //   //       let locationObject: {
  //   //         id: 0,
  //   //         name: 'new',
  //   //         address: '',
  //   //         latLng: latlangNew,
  //   //         relatedCat: [],
  //   //         isEditMode: false
  //   //       };
  //   //       func(locationObject);
  //   //       marker = new google.maps.Marker({
  //   //         position: event.latLng,
  //   //         map: map,
  //   //         draggable: true,
  //   //         animation: google.maps.Animation.DROP
  //   //       });
  //   //
  //   //     });
  //   //     console.log(this.state);
  //   //   }
  //     if (type === 'address') {
  //
  //     }
  //     if (type === 'latlng') {
  //     }
  //   }
  //   else {
  //     let locObj;
  //     this.props.locations.forEach((item) => {
  //       if (item.id === locationId) {
  //         locObj = item;
  //       }
  //     });
  //     if (locObj.isEditMode) {
  //
  //       let templatePartOne = `<form>
  //         <label>
  //           Name:
  //           <input type="text" placeholder=${locObj.name} onchange=${this.handleChange}/>
  //         </label>
  //         <label>
  //           Address:
  //           <input type="text" placeholder=${locObj.address} onchange=${this.handleChange}/>
  //         </label>
  //         <label>
  //           Coordinates:
  //           <input type="text" placeholder=${locObj.latLng.lat + ', ' + locObj.latLng.lng} onchange=${this.handleChange}/>
  //         </label>`;
  //
  //       let templatePartTwo = `<input type="submit" value="Submit"/>
  //       </form>`;
  //
  //       let relatedCategories = [];
  //       locObj.relatedCat.map((id) => {
  //           return this.props.categories.map((cat) => {
  //             if (cat.id === id.toString()) {
  //               templatePartOne += `<input type="checkbox" checked="true">${cat.name}</input>`;
  //             }
  //             else {
  //               templatePartOne += `<input type="checkbox">${cat.name}</input>`;
  //             }
  //           })
  //         }
  //       );
  //       relatedCategories.map((name) => {
  //
  //       });
  //
  //       let templatefull = templatePartOne + templatePartTwo;
  //       let map = new google.maps.Map(this.mapElm, {
  //         zoom: 12,
  //         center: locObj.latLng,
  //         mapTypeId: 'terrain'
  //       });
  //
  //       let infowindow = new google.maps.InfoWindow({
  //         content: templatefull
  //       });
  //
  //       let marker = new google.maps.Marker({
  //         map: map,
  //         animation: google.maps.Animation.DROP,
  //         position: locObj.latLng
  //       });
  //
  //       infowindow.open(map, marker);
  //     }
  //     else {
  //       let relatedCategories = [];
  //       locObj.relatedCat.map((id) => {
  //           return this.props.categories.map((cat) => {
  //             if (cat.id === id.toString()) {
  //               return relatedCategories.push(cat.name);
  //             }
  //           })
  //         }
  //       );
  //
  //       let templatePartOne = `<div id="info">
  //           <p class="name">Name: ${ locObj.name }</p>
  //           <p>Address: ${ locObj.address }</p>
  //           <p>Coordinates: ${ locObj.latLng.lat + ', ' + locObj.latLng.lng }</p>
  //           <p>Categories:</p>
  //            <ul>`;
  //       let templatePartTwo = `</ul></div>`;
  //       relatedCategories.map((name) => {
  //         templatePartOne += `<li>${name}</li>`;
  //       });
  //
  //       let templatefull = templatePartOne + templatePartTwo;
  //
  //       let map = new google.maps.Map(this.mapElm, {
  //         zoom: 12,
  //         center: locObj.latLng,
  //         mapTypeId: 'terrain'
  //       });
  //
  //       let infowindow = new google.maps.InfoWindow({
  //         content: templatefull
  //       });
  //
  //       let marker = new google.maps.Marker({
  //         map: map,
  //         animation: google.maps.Animation.DROP,
  //         position: locObj.latLng
  //       });
  //
  //       infowindow.open(map, marker);
  //     }
  //   }
  // }
  //
  // createCatList(id) {
  //   return <ul className="categories" ref={(elem) => this.catElm = elem }>
  //     { this.props.categories.map((item) => {
  //       return <li key={ item.id }>
  //         <label className="checkbox">
  //           { item.name }
  //           <input type="checkbox"
  //                  name={item.id}
  //             // checked={ this.isLocationInThisCategory(id)}
  //             // onChange={this.handleInputChange}
  //           />
  //           <span className="indicator"/>
  //         </label>
  //       </li>
  //     })}
  //   </ul>
  // }

  howToSearch() {
    return <div id="map" className="map" ref={(elem) => this.mapElm = elem }>
      <div className="new-btns">
        <p>Please selecet how you wish to search for a new address</p>
        <button type="button" value='via map' onClick={ () => this.initMap('map', this.updateStateValue)}>via map
        </button>
        <button type="button" onClick={ () => this.initMap('address')}>via address search</button>
        <button type="button" onClick={ () => this.initMap('latlng')}>via coordinates</button>
      </div>
      {/*<div id="map" className="map" ref={(elem) => this.mapElm = elem }/>*/}
    </div>
  }

  createLocationView(location) {
    if (location.name === 'New') {
      return <div className="map-view">
        <h1>Selected Location: <input type="text" placeholder="new" /></h1>
        { this.howToSearch()}
      </div>
    }
    else {
      return <div className="map-view">
        <h1>Selected Location: { location.name }</h1>
        <Map locationObject={ location }
             updateLocationStateObj={ this.updateStateValue }
             categories={ this.props.categories }/>
        {/*<div id="map" className="map" ref={(elem) => this.mapElm = elem }/>*/}
      </div>
    }
  }

  setLocationObject(){
    const locationId = this.props.match.params.locId.toString();
    let locationObj;
    if (locationId !== 'new') {
      this.props.locations.forEach((item) => {
        if (item.id === locationId) {
          return locationObj = item;
        }
      });
    }
    else {
      locationObj = {
        id: uuid(),
        name: 'New',
        address: '',
        latLng: {lat: 32.07762926680949, lng: 34.79069709777832},
        relatedCat: [],
        isEditMode: true
      };
    }
    return locationObj;
  }

  render(props) {
    const locationObj = this.setLocationObject();
    return (
      <div className="location-id-comp">
        <Topbar
          selectedLocationObj={ locationObj }
          {...this.props}
        />
        { this.createLocationView(locationObj) }
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
