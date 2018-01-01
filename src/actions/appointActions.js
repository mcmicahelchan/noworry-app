export function addFamilyName(value) {
    return {
        type: 'addFamilyName',
        payload: {
            name: value,
        }
    }
}

export function addFirstName(value) {
    return {
        type: 'addFirstName',
        payload: {
            name: value,
        }
    }
}

export function addID(value) {
    return {
        type: 'addID',
        payload: {
            id: value,
        }
    }
}