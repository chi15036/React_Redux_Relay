import fetch from 'isomorphic-fetch'
const SERVER_URL = 'http://localhost:3000';

function setEntityInfo(text) {
    return {
        type: 'SET_ENTITY_INFO',
        text
    }
}

function setPostEntityState(state) {
    return {
        type: 'SET_POST_ENTITY_STATE',
        state
    }
}

export function getEntityInfo(sentence)  {
    return function (dispatch) {
        let myInit = { method: 'GET'};
        return fetch(SERVER_URL + '/v1/entities?sentence=' + sentence, myInit)
            .then(response => {
              response.json().then(data => {
                console.log(data)
                dispatch(setEntityInfo(data))
              })
            })
    }
}

export function postEntityToWit(sentence, intent)  {
    return function (dispatch) {
        dispatch(setPostEntityState(""))
        let myInit =  {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"value": intent, "expressions":[sentence]})
        };
        console.log(myInit)
        return fetch(SERVER_URL + '/v1/entities', myInit)
            .then(response => {
              response.json().then(data => {
                console.log(data)
                dispatch(setPostEntityState(data.name))
              })
            })
    }
}
