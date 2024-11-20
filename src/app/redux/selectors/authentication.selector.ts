import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InitialState } from "../reducers/authentication.reducer";

const selectorState=createFeatureSelector<InitialState>('currentUser')

export const selectCurrentUser= createSelector(
selectorState,
(state)=>state.userState
)