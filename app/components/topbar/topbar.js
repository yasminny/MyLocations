import './topbar.scss';
import React from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';

class Topbar extends React.Component {
  constructor(props) {
    super();
    this.handelGoTo = this.handelGoTo.bind(this);
    this.handelNewItem = this.handelNewItem.bind(this);
    this.handelDeleteItem = this.handelDeleteItem.bind(this);
    this.handelEditItem = this.handelEditItem.bind(this);
  }

  handelGoTo(){
    if(this.props.mode === "categories"){
      this.props.history.push(`/locations/category/${ this.props.selectedCat }`);
    }
    else{
      this.props.history.push(`/locations/location/${ this.props.selectedLocationId }`);
    }
  }

  handelNewItem(){
    if(this.props.mode === "categories"){
      const newCat = { name: "new", id: uuid(), isEditMode: true};
      this.props.updateStateValue('new');
      this.props.addNewCategory(newCat);
      }
    else{
      this.props.history.push(`/locations/location/new`);
    }
  }

  handelDeleteItem(){
    if(this.props.mode === "categories"){
      return this.props.deleteCategory(this.props.selectedCat);
    }
    else{
      if(this.props.mode === 'all'){
        let answer = confirm(`Deleting "${this.props.selectedLocationName}" location. Are you sure?`);
        if(answer){
          this.props.deleteLocation(this.props.selectedLocationId);
        }
      }
      else{
        this.props.deleteCategoryInLocation(this.props.selectedLocationId, this.props.mode);
      }
    }
  }

  handelEditItem(){
    if(this.props.mode === "categories"){
      const newEditMode = true;
      return this.props.updateCategoryEditMode(this.props.selectedCat, newEditMode);
    }
    else{
      //set edit mode on first-------------
      this.props.history.push(`/locations/location/${ this.props.selectedLocationId }`);
    }
  }

  render(props) {

    return (
      <div className="topbar-comp">
        <div className="pages-actions">
          <div className="gridcontainer clearfix">
            <div className="grid-3" onClick={ ()=> this.handelGoTo() }>
              <div className="fmcircle-out">
                <button type="button" className="action-btn view">
                  <div className="fmcircle-border">
                    <div className="fmcircle-in">
                      <span>view</span><p className="fa fa-eye" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="grid-3" onClick={ ()=> this.handelNewItem() }>
              <div className="fmcircle-out">
                <button type="button" className="action-btn add">
                  <div className="fmcircle-border">
                    <div className="fmcircle-in">
                      <span>Add New</span><p className="fa fa-plus" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="grid-3" onClick={ ()=> this.handelDeleteItem() }>
              <div className="fmcircle-out">
                <button type="button" className="action-btn remove">
                  <div className="fmcircle-border">
                    <div className="fmcircle-in">
                      <span>Remove</span><p className="fa fa-minus" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="grid-3" onClick={ ()=> this.handelEditItem() }>
              <div className="fmcircle-out">
                <button type="button" className="action-btn edit">
                  <div className="fmcircle-border">
                    <div className="fmcircle-in">
                      <span>Edit</span><p className="fa fa-pencil" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteLocation(id){
      dispatch({
        type: 'DELETE_LOCATION',
        id
      });
    },
    deleteCategoryInLocation(locationId, categoryId){
      dispatch({
        type: 'REMOVE_CATEGORY_FROM_LOCATION',
        locationId,
        categoryId
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

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
