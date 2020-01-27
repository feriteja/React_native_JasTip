import {combineReducers} from 'redux';

import journalReducer from './journalReducer';
import dataJournalReducer from './dataJournalReducer';
import dataOrderReducer from './dataOrderReducer';
import cartItemReducer from './cartItemReducer';
import itemCountReducer from './itemCountReducer';

const rootReducer = combineReducers({
  journalReducer,
  dataJournalReducer,
  dataOrderReducer,
  cartItemReducer,
  itemCountReducer,
});

export default rootReducer;
