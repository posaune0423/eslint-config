// Triggers no-restricted-syntax (banning React.* namespace types).

import type React from "react";

export type InputHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

export type OptionalChildren = React.PropsWithChildren;
