import type { PayloadAction } from "@reduxjs/toolkit";
import * as types from "../constants/authConstants";

type IGlobal = {
    error: string;
};

const initialState: IGlobal = {
    error: "",
};

const globalReducer = (
    state = initialState,
    action: PayloadAction<Partial<IGlobal>> | PayloadAction<string>
) => {
    const { type, payload } = action;

    switch (type) {
        case types.SET_ERROR: {
            // Handle both object format { error: string } and string format
            const errorMessage =
                typeof payload === "string"
                    ? payload
                    : (payload as Partial<IGlobal>)?.error || "";
            return {
                ...state,
                error: errorMessage,
            };
        }

        default:
            return state;
    }
};

export default globalReducer;
