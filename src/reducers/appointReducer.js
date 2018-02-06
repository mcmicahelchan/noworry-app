const initState = {familyName:'陈', firstName: '', id:'440104192212024231', phone: '', add:'广东省广州市海珠区广雅路12幢148房', bdp:'中山', gender:'男', utype: ''}

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
        case 'addPhone': {
            return { ...state, phone: action.payload.phone }
        }
        case 'addAdd': {
            return { ...state, add: action.payload.add }
        }
        case 'addBDP': {
            return { ...state, bdp: action.payload.bdp }
        }
        case 'addGender': {
            return { ...state, gender: action.payload.gender }
        }
        case 'addUType': {
            return { ...state, utype: action.payload.utype }
        }

        default:
            return state
    }
}