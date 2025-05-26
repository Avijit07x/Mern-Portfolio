import { createContext, RefObject } from "react";

export interface IRefContext {
	projectRef: RefObject<HTMLElement | null>;
	contactRef: RefObject<HTMLElement | null>;
}

const RefContext = createContext<IRefContext>({
	projectRef: { current: null },
	contactRef: { current: null },
});

export default RefContext;
