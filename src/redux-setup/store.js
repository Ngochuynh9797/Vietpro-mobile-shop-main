import { createStore } from "redux";
import rootReducer from './reducers/index';
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig= {
    key:'redux-store',
    storage: storage,
    keyPrefix:"vietpro",
}
const store = createStore(persistReducer(persistConfig, rootReducer))
persistStore(store)
export default store;