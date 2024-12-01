import React, { createContext, ReactNode, SetStateAction, useState } from "react";

interface ContextType {
    categoryId: string | null,
    setCategoryId: React.Dispatch<SetStateAction<null | string>>
}

export const Context = createContext<ContextType>({
    categoryId: null,
    setCategoryId:() => ""
})

export const ProductContext:React.FC<{children:ReactNode}> = ({children}) => {
    const [categoryId, setCategoryId] = useState<string | null>(null)

    return(
        <Context.Provider value={{categoryId, setCategoryId}}>{children}</Context.Provider>
    )
}