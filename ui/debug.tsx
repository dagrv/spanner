import { ReactNode } from "react";

export function Debug({ children }: { children?: ReactNode }) {
    return (
        <div className="bg-stripes bg-stripes-white bg-red-500 bg-opacity-25 absolute inset-0 z-10">
            {children}
        </div>
    )
}