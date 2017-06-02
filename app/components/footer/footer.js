import {
  NavLink
} from 'react-router-dom';
import './footer.scss';
import React from 'react';

export default class Footer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="footer-comp">
        <div className="pages-links">
          <div className="gridcontainer clearfix">
            <div className="grid-3">
              <div className="fmcircle-out">
                <NavLink to="/categories" activeClassName="selected-nav" className="link">
                  <div className="fmcircle-border">
                    <div className="fmcircle-in">
                      <span>All Categories</span><p className="fa fa-tags" />
                    </div>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="grid-3">
              <div className="fmcircle-out">
                <NavLink to="/locations/category/all" activeClassName="selected-nav" className="link">
                  <div className="fmcircle-border">
                    <div className="fmcircle-in">
                      <span>All Locations</span><p className="fa fa-map-marker" />
                    </div>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
