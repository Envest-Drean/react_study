import { produce } from "immer";
import { actionTypes } from "./action";

export interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

interface CyclesState {
	cycles: Cycle[];
	activeCycleId: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
	switch (action.type) {
		case actionTypes.ADD_NEW_CYCLE:
			return produce(state, (draft) => {
				draft.cycles.push(action.payload.newCycle);
				draft.activeCycleId = action.payload.newCycle.id;
			});
		case actionTypes.INTERRUPT_CURRENT_CYCLE: {
			const currentCycleIndex = state.cycles.findIndex((cycle) => {
				return cycle.id === state.activeCycleId;
			});
			if (currentCycleIndex < 0) {
				return state;
			}
			return produce(state, (draft) => {
				draft.activeCycleId = null;
				draft.cycles[currentCycleIndex].interruptedDate = new Date();
			});
		}
		case actionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
			const currentCycleIndex = state.cycles.findIndex((cycle) => {
				return cycle.id === state.activeCycleId;
			});
			if (currentCycleIndex < 0) {
				return state;
			}
			return produce(state, (draft) => {
				draft.activeCycleId = null;
				draft.cycles[currentCycleIndex].finishedDate = new Date();
			});
		}
		default:
			return state;
	}
}
