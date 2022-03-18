import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';

import AboutRoute from './AboutRoute';
import HeaderMenu from './HeaderMenu';
import EditProfileRoute from './Profiles/EditProfileRoute';
import ManageProfilesRoute from './Profiles/ManageProfilesRoute';
import Summary from './SummaryRoute';

const RouteView = (props) => {
  let provider;
  if (props) {
    provider = props.provider;
  }
  return (
      <>
        <div>
          <HeaderMenu provider={provider}  />
        </div>
        <div className="d-flex justify-content-center pt-1">
          <Routes>
            {provider ? <Route path="/" element={<Summary profile={props.profile} provider={provider} />} /> : null}
            <Route path="/about" element={<AboutRoute />} />
            <Route path="/manage-profiles" element={<ManageProfilesRoute />} />
            <Route path="/manage-profile/:profileName" element={<EditProfileRoute />} />
          </Routes>
      </div>
    </>
  );
}

export default RouteView;
