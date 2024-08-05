import { useContext } from "react"
import { declareAndProvideContext } from "./declaredContext"


export const useAndCompileContext = () => useContext(declareAndProvideContext)