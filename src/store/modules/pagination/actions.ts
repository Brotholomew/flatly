import {
    paginationAction, paginationInterface,
} from "./types";

export const setPagination = (component: string, payload: paginationInterface): paginationAction => {
    return {
        payload: payload,
        type: component
    };
}