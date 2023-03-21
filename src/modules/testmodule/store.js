import { createStore } from 'redux';
export const calendarReducer = (action,state={date:0,showDate:false}) => {
    if(action === 'display'){
        // console.log(action.value)
        return {
            date : action.value,
            showDate : true
        }
    }
    return state;
}
const store = createStore(calendarReducer);
export default store;