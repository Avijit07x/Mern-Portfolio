import React, { useRef } from "react";
import RefContext from "./RefContext";

type Props = {
	children: React.ReactNode;
};

const RefContextProvider: React.FC<Props> = ({ children }) => {
	const projectRef = useRef<HTMLElement | null>(null);
	const contactRef = useRef<HTMLElement | null>(null);
	return (
		<RefContext.Provider value={{ projectRef, contactRef }}>
			{children}
		</RefContext.Provider>
	);
};

export default RefContextProvider;
