import './location-id.scss';
import Topbar from '../topbar/topbar';
import React from 'react';
import {connect} from 'react-redux';

class Location extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      catValue: '',
      selectedLocationName: ''
    };
    this.createLocationView = this.createLocationView.bind(this);
    this.createCatList = this.createCatList.bind(this);
    this.createLocList = this.createLocList.bind(this);
    this.handelClickedLocation = this.handelClickedLocation.bind(this);
    this.updateStateValue = this.updateStateValue.bind(this);
  }

  componentDidMount() {
    this.setState({
      catValue: this.props.match.params.catId.toString()
    });
  }

  updateStateValue(name) {
    this.setState({value: name})
  }

  createLocList() {
    const categoryId = this.props.match.params.catId.toString();
    if (categoryId !== 'all') {
      return this.props.locations.map((item) => {
        const name = item.name;
        const id = item.id;
        const classNameIs = '' + id;
        const relatedCat = item.relatedCat;
        return relatedCat.map((itemId) => {
          if (itemId.toString() === categoryId) {
            return <li key={ id } className={ classNameIs }
                       onClick={() => this.handelClickedLocation(id, name) }>{ name }</li>;
          }
        })
      })
    }
    else {
      return this.props.locations.map((item, index) => {
        const name = item.name;
        const id = item.id;
        const classNameIs = '' + id;
        return <li key={ id } className={ classNameIs }
                   onClick={() => this.handelClickedLocation(id, name) }>{ name }</li>;
      })
    }

  }

  handelClickedLocation(id, name) {
    this.setState({value: id});
    this.setState({selectedLocationName: name});
    const liElem = this.locElm.querySelectorAll('li');
    liElem.forEach((li) => {
      if (li.classList.contains('active')) {
        li.classList.remove('active');
      }
    });
    let chosenLi;
    liElem.forEach((li) => {
      if (li.classList.contains(id)) {
        return chosenLi = li;
      }
    });
    return chosenLi.classList.toggle('active');
  }

  initMap() {
  const haightAshbury = {lat: 37.769, lng: -122.446};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: haightAshbury,
    mapTypeId: 'terrain'
  });

  createCatList(id){
    return <ul className="categories" ref={(elem) => this.catElm = elem }>
      {this.props.categories.map((item) => {
        return <li key={ item.id }>
          <label className="checkbox">
            { item.name }
            <input type="checkbox"
                   name={item.id}
                   checked={ this.isLocationInThisCategory(id)}
                   onChange={this.handleInputChange}/>
            <span className="indicator"/>
          </label>
        </li>
      })}
    </ul>
  }

  createLocationView(id){
    let locationObj;
    this.props.locations.map((item)=>{
      if(item.id === id){
        return locationObj = item;
      }
    });
    if(locationObj.isEditMode){
      return <form>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Address:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Coordinates:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        { this.createCatList(id) }
        <input type="submit" value="Submit" />
        <div id="map" ref={(elem) => this.mapElm = elem }></div>
      </form>
    }
  }

  render(props) {
    const locationId = this.props.match.params.locId.toString();
    let locationName;
    if (locationId !== 'new') {
      this.props.locations.forEach((item) => {
        if (item.id === locationId) {
          locationName = item.name;
        }
      });
    }
    else {
      locationName = 'New';
    }

    return (
      <div className="location-id-comp">
        <Topbar
          updateStateValue={ this.updateStateValue }
          mode={ this.state.catValue }
          selectedLocationId={ this.state.value }
          selectedLocationName={ this.state.selectedLocationName }
          ulElem={ this.locElm }
          {...this.props}
        />
        <h1>Selected Location: { locationName }</h1>
        { this.createLocationView(locationId) }
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
