import './categories.scss';
import Topbar from '../topbar/topbar';
import React from 'react';
import {connect} from 'react-redux';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 'new',
      selectedCat: 'all'
    };
    this.createCatList = this.createCatList.bind(this);
    this.handelClickedCat = this.handelClickedCat.bind(this);
    this.handelBlurAndEnter = this.handelBlurAndEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateStateValue = this.updateStateValue.bind(this);
  }

  handelBlurAndEnter(id) {
    const newEditMode = false;
    this.props.updateCategoryEditMode(id, newEditMode);
    this.props.updateCategoryName(id, this.state.value);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateCategoryName(id, this.state.value);
  }

  updateStateValue(name){
    this.setState({value: name})
  }

  createCatList() {
    return this.props.categories.map((item) => {
      const name = item.name;
      const id = item.id;
      const classNameIs = '' + id;
      if (!item.isEditMode) {
        return <li key={ id } className={ classNameIs } onClick={() => this.handelClickedCat(id, name) }>{ name }</li>;
      }
      else {
        return <li key={ id }>
          <form onSubmit={ this.handleSubmit}>
            <input type="text"
                   autoFocus={ true }
                   onBlur={() => this.handelBlurAndEnter(id)}
                   onKeyDown={(event) => {
                     if (event.key === 'Enter') {
                       return this.handelBlurAndEnter(id);
                     }
                   }}
                   onChange={ this.handleChange }
                   value={ this.state.value }/>
          </form>
        </li>;
      }
    })
  }

  handelClickedCat(id, name) {
    this.setState({selectedCat: id});
    this.setState({value: name});
    const liElem = this.catElm.querySelectorAll('li');
    liElem.forEach((li) => {
      if (li.classList.contains('active')) {
        li.classList.remove('active')
      }
    });
    let chosenLi;
    liElem.forEach((li) => {
      if (li.classList.contains(id)) {
        return chosenLi = li
      }
    });
    chosenLi.classList.toggle('active');
  }

  render(props) {
    return (
      <div className="categories-comp">
        <Topbar
          updateStateValue={ this.updateStateValue }
          mode={ "categories" }
          selectedCat={ this.state.selectedCat }
          ulElem={ this.catElm }
          {...this.props}
        />
        <h1>Categories</h1>
        <ul className="categories" ref={(cat) => this.catElm = cat }>
          { this.createCatList() }
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
    categories: stateData.categories
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
