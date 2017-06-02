import './locations.scss';
import Topbar from '../topbar/topbar';
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

  componentDidMount(){
    this.setState({
      catValue: this.props.match.params.catId.toString()
    });
  }

  updateStateValue(name){
    this.setState({value: name})
  }

  createLocList() {
    console.log(this.props.locations);
    return this.props.locations.map((item, index) => {
      const name = item.name;
      const id = item.id;
      const classNameIs = '' + id;
        return <li key={ id } className={ classNameIs } onClick={() => this.handelClickedLocation(id, name) }>{ name }</li>;
    })
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
    chosenLi.classList.toggle('active');
  }

  render(props) {
    const categoryId = this.props.match.params.catId.toString();
    let categoryName;
    if(categoryId !== 'all'){
      this.props.categories.forEach((item)=>{if(item.id === categoryId){ categoryName = item.name }});
    }
    else{
      categoryName = 'All';
    }

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
