export const createModal = (state = false, action) => {
    switch (action.type) {
        case 'OPEN_CREATE_MODAL':
            return action.open
        default:
            return state
    }
}

export const pet = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_PET':
            return [...state,action.value]
        case 'DELETE_PET':
            return action.value
        case 'UPDATE_PET':
            return action.value
        default:
            return state
    }
}