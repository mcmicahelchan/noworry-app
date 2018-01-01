const initState = {familyName:'陈', firstName: '', id:'440104192212024231'}

export default function reducer(state=initState, action) {
    switch(action.type){
        case 'addFamilyName' :{
            console.log('hl')
            return { ...state, familyName: action.payload.name}
        }
        case 'addFirstName': {
            return { ...state, firstName: action.payload.name }
        }
        case 'addID': {
            return { ...state, id: action.payload.id }
        }
        default:
            return state
    }
}