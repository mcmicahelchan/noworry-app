const initState = {
    name: '可爱的用户',
    phone: '13902280012',
}

export default function reducer(state=initState, action) {
    switch(action.type){
        case 'modify' :{
            return {...state, phone: action.payload.phone, name: action.payload.name}
        }
        case 'increment': {
            return {...state, phone: phone+1}
        }
        default:
            return state
    }
}