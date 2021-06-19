import firebase from 'firebase/app'

export interface ProtectedViewProps {
    user: firebase.User
}