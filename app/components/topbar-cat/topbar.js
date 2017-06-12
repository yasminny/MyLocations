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

  handelGoTo() {
    this.props.history.push(`/locations/category/${ this.props.selectedCat }`);
  }

  handelNewItem() {
    const newCat = {name: "new", id: uuid(), isEditMode: true};
    this.props.updateStateValue('new');
    this.props.addNewCategory(newCat);

  }

  handelDeleteItem() {
    return this.props.deleteCategory(this.props.selectedCat);

  }

  handelEditItem() {
    const newEditMode = true;
    return this.props.updateCategoryEditMode(this.props.selectedCat, newEditMode);
  }

  render(props) {
    console.log(this.props.selectedLocationObj);
    return (
      <div className="topbar-comp">
        <div className="pages-actions">
          <div className="gridcontainer clearfix">
            <div className="grid-3" onClick={ () => this.handelGoTo() }>
              <div className="fmcircle-out">
                <button type="button" className="action-btn view">
                  <div className="fmcircle-border">
                    <div className="fmcircle-in">
                      <span>view</span><p className="fa fa-eye"/>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="grid-3" onClick={ () => this.handelNewItem() }>
              <div className="fmcircle-out">
                <button type="button" className="action-btn add">
                  <div className="fmcircle-border">
                    <div className="fmcircle-in">
                      <span>Add New</span><p className="fa fa-plus"/>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="grid-3" onClick={ () => this.handelDeleteItem() }>
              <div className="fmcircle-out">
                <button type="button" className="action-btn remove">
                  <div className="fmcircle-border">
                    <div className="fmcircle-in">
                      <span>Remove</span><p className="fa fa-minus"/>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="grid-3" onClick={ () => this.handelEditItem() }>
              <div className="fmcircle-out">
                <button type="button" className="action-btn edit">
                  <div className="fmcircle-border">
                    <div className="fmcircle-in">
                      <span>Edit</span><p className="fa fa-pencil"/>
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
    deleteCategory(id){
      dispatch({
        type: 'DELETE_CATEGORY',
        id
      });
    },
    addNewCategory(newCat){
      dispatch({
        type: 'ADD_NEW_CATEGORY',
        newCat
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
