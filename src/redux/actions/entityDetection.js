import {ToTvHttp} from '../../utils/totvhttp.js';
import { combineEpics } from 'redux-observable';
import Rx from 'rxjs/Rx';

function setEntityInfo(text) {
  console.log(text)
  return {
    type: 'SET_ENTITY_INFO',
    text
  }
}

function setSelectSentence(sentence) {
  console.log(sentence)
  return {
    type: 'SET_SELECT_SENTENCE',
    sentence
  }
}

export function setPostEntityState(state) {
  return {
    type: 'SET_POST_ENTITY_STATE',
    state
  }
}

export function setEntities(entities) {
  return {
    type: 'SET_ENTITIES',
    entities
  }
}

export function getEntityInfo(sentence)  {
  return function (dispatch) {
    let _params = {sentence: sentence}
    ToTvHttp.get("/v1/entities", _params).then((response) => {
      dispatch(setSelectSentence(response._text))
      dispatch(setEntityInfo(response))
    })
  }
}

export function postEntityToWit(entities)  {
  return function (dispatch) {
    dispatch(setPostEntityState("loading"))
    let _params = {"entities": entities}
    ToTvHttp.post("/v1/entities", _params).then((response) => {
      console.log(response)
      dispatch(setEntityInfo({}))
      dispatch(setPostEntityState(response.stat))
    })
  }
}

const getEntityEpic = action$ =>
action$.ofType('GET_ENTITY')
.mergeMap(action =>
  ToTvHttp.get("/v1/entities", {sentence: action.sentence})
  .flatMap(response =>
    Rx.Observable.concat(
      Rx.Observable.of(setEntityInfo(response)),
      Rx.Observable.of(setSelectSentence(response._text))
    )
  )
)

const postEntityEpic = action$ =>
action$.ofType('POST_ENTITY')
.mergeMap(action =>
  ToTvHttp.post("/v1/entities", {"entities": action.entities})
  .flatMap(response =>
    Rx.Observable.concat(
      Rx.Observable.of(setEntityInfo({})),
      Rx.Observable.of(setPostEntityState(response.stat))
    )
  )
)

export const rootEpic = combineEpics(
  getEntityEpic,
  postEntityEpic
);
