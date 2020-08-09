import {createStore, combineReducers, /*applyMiddleware*/} from "redux";
/*import logger from "redux-logger";*/
import TaxiReducer from "./reducers/TaxiseriveReducer";
import BusinessReducer from "./reducers/BusinessReducer";
import BusinessTourReducer from "./reducers/BusinessTourReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import {reducer as formReducer} from "redux-form";
export default createStore(combineReducers({
    taxi: TaxiReducer, form: formReducer, business: BusinessReducer, business_tour: BusinessTourReducer
}), {}, composeWithDevTools(/*applyMiddleware(logger)*/));