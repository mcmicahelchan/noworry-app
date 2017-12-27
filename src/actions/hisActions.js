export function addRecord(name) {
    return {
        type: 'add',
        payload: {
            name: name,
        }
    }
}

export function del() {
    return {
        type: 'delSearchHis',
        payload: {
        }
    }
}