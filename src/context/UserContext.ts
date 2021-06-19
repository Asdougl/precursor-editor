import { createContext } from "react";
import firebase from 'firebase/app'

export const UserContext = createContext<firebase.User | null | undefined>(undefined)