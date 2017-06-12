import './locations.scss';
import Topbar from '../topbar-loc/topbar';
import React from 'react';
import {connect} from 'react-redux';

class Locations extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      catValue: '',
      selectedLocationName: ''
    };
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

  render(props) {
    const categoryId = this.props.match.params.catId.toString();
    let categoryName;
    if (categoryId !== 'all') {
      this.props.categories.forEach((item) => {
        if (item.id === categoryId) {
          categoryName = item.name
        }
      });
    }
    else {
      categoryName = 'All';
    }

    console.log(this.props.selectedLocationObj);

    return (
      <div className="locations-comp">
        <Topbar
          updateStateValue={ this.updateStateValue }
          mode={ this.state.catValue }
          selectedLocationId={ this.state.value }
          selectedLocationName={ this.state.selectedLocationName }
          ulElem={ this.locElm }
          {...this.props}
        />
        <h1>Selected Category view: { categoryName }</h1>
        <ul className="locations" ref={(elem) => this.locElm = elem }>
          { this.createLocList() }
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
