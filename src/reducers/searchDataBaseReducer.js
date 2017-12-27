const initState = [
    {name: '港澳台通行证', category: '办证业务', linkPage: 'error'}, 
    { name: '护照', category: '办证业务', linkPage: 'error'},
    { name: '入台证', category: '办证业务', linkPage: 'error'}, 
    { name: '照片', category: '辅助业务', linkPage: 'error'}]

export default function reducer(state=initState, action) {
    switch(action.type){
        default:
            return state
    }
}