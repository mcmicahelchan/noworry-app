const initState = [{name: '车管所', linkPage: 'error'}, {name: '护照', linkPage: 'error'}, {name: '交通银行', linkPage: 'error'}, {name: '港澳通行证', linkPage: 'info'}]

export default function reducer(state=initState, action) {
    switch(action.type){
        case 'add' :{
            return state.concat({name: action.payload.name, linkPage:'error'})
        }
        case 'delSearchHis': {
            return []
        }
        default:
            return state
    }
}