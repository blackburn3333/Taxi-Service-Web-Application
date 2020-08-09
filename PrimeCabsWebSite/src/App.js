import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import WebSite from './containers/website';

import TourPacksExtended from './components/TourPacksExtended';
import Business from './containers/Business';
import BusinessDashboard from './containers/BusinessDashboard';
import TaxiExtended from './containers/TaxiExtended';

import AboutUs from './components/aboutus';
function App() {
  /* const customHistory = createBrowserHistory();*/
  return (
    <HashRouter>
      <Route exact path="/" component={WebSite} />
      <Route path="/getyourtaxi" component={TaxiExtended} />
      <Route
        path="/getyourtaxi/:from/:to/:pickupdate/:time/:vehicle_type/:trip_type?"
        component={TaxiExtended}
      />
      <Route path="/ourtourpackages" component={TourPacksExtended} />
      <Route
        path="/ourtourpackages/:explorePlace"
        component={TourPacksExtended}
      />
      <Route path="/aboutus" component={AboutUs} />
      <Route path="/business" component={Business} />
      <Route path="/businesshome" component={BusinessDashboard} />
    </HashRouter>
  );
}

export default App;
