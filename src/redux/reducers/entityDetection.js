// const initialEntity = {entities: {intent: [{value: ""}]}}
export const entityInfo = (state = [], action) => {
    switch (action.type) {
        case 'SET_ENTITY_INFO':
            console.log("HEHHEHE")
            return action.text
        default:
            return state
    }
}

export const entityPostState = (state = "", action) => {
    switch (action.type) {
        case 'SET_POST_ENTITY_STATE':
            return action.state
        default:
            return state
    }
}

export const entities = (state = [], action) => {
    switch (action.type) {
        case 'SET_ENTITIES':
            return action.entities
        default:
            return state
    }
}

export const selectSentence = (state = "", action) => {
    switch (action.type) {
        case 'SET_SELECT_SENTENCE':
            return action.sentence
        default:
            return state
    }
}
