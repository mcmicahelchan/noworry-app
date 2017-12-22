export function modify(name, phone) {
    return {
        type: 'modify',
        payload: {
            name: name,
            phone: phone,
        }
    }
}