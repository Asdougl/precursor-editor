import React, { useContext } from 'react'
import { Stripes } from '../components/Stripes'
import { LinkButton } from '../components/LinkButton'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { UserContext } from '../context/UserContext'
import { auth } from '../firebase'

const Navbar = () => {
    const user = useContext(UserContext)

    const logout = () => {
        auth.signOut()
    }

    return (
        <div className="w-screen h-16 flex items-center justify-between px-6 shadow">
            <Link to="/" className="h-full flex items-center gap-4">
                <Stripes className="h-full" />
                <h1 className="text-2xl font-bold">Precursor</h1>
            </Link>
            <div>
                {user ? (
                    <div className="flex gap-2 items-center">
                        <div>Welcome {user.displayName}</div>
                        <Button color="link" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                ) : (
                    <LinkButton to="/login">Login</LinkButton>
                )}
            </div>
        </div>
    )
}

export default Navbar
