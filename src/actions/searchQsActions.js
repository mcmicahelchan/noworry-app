export function addRecord(name) {
    return {
        type: 'add',
        payload: {
            name: name,
        }
    }
}

