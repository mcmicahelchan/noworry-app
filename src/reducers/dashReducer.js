const initState = [{ state: 0, add: '', date: '', process: 0.30, title: '学生证' },
{ state: 2, add: '', date: '1月20日', process: 0.70, title: '身份证' },
// { state: 1, add: '番禺办事处', date: '2018-1-24 11:30', process: 0, title: '居住证' },
{ state: 0, add: '', date: '', process: 0.30, title: '学生证' },
{ state: 3, add: '', date: '2023-1-24', process: 98, title: '护照' }]

export default function reducer(state=initState, action) {
    switch(action.type){
        case 'add' :{
            return state.concat({ state: 1, add: '番禺大学城办事处', date: '2018-1-24', process: 0, title: action.payload.title })
        }
        default:
            return state
    }
}