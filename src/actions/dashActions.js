export function add(title) {
    return {
        type: 'add',
        payload: {
            title: title
        }
    }
}