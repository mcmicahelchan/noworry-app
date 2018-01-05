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

export function addPhone(value) {
    return {
        type: 'addPhone',
        payload: {
            phone: value,
        }
    }
}

export function addAdd(value) {
    return {
        type: 'addAdd',
        payload: {
            add: value,
        }
    }
}

export function addBDP(value) {
    return {
        type: 'addBDP',
        payload: {
            bdp: value,
        }
    }
}

export function addGender(value) {
    return {
        type: 'addGender',
        payload: {
            gender: value,
        }
    }
}
export function addUType(value) {
    return {
        type: 'addUType',
        payload: {
            utype: value,
        }
    }
}