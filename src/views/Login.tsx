import React, { useState } from 'react'
import { Stripes } from '../components/Stripes'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { LinkButton } from '../components/LinkButton'

import { auth } from '../firebase'

interface Props {
    signUp?: boolean
}

const Login = ({ signUp }: Props) => {
    // State
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const [pending, setPending] = useState(false)

    const login = (e: React.FormEvent) => {
        e.preventDefault()
        setPending(true)
        auth.signInWithEmailAndPassword(email, password)
            .catch((err) => console.log(err))
            .finally(() => setPending(false))
    }

    const register = (e: React.FormEvent) => {
        e.preventDefault()
        setPending(true)
        auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                user.user
                    ?.updateProfile({ displayName: username })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
            .finally(() => setPending(false))
    }

    return (
        <div className="grid xl:grid-cols-2 h-full">
            <div className="bg-gray-600 items-center justify-center hidden xl:flex">
                <div className="font-bold text-white text-4xl flex gap-2">
                    <Stripes className="rounded-full" />
                    Precursor
                </div>
            </div>
            <div className="p-8 h-full">
                <div className="flex rounded shadow overflow-hidden h-full mx-auto">
                    <Stripes />
                    <div className="px-8 py-6 w-full flex flex-col items-center">
                        <h2 className="text-6xl font-bold flex items-center h-20">
                            {!signUp ? 'Login' : 'Sign Up'}
                        </h2>

                        {!signUp ? (
                            <form
                                onSubmit={login}
                                className="flex flex-col max-w-md w-full"
                            >
                                <Input value={email} onChange={setEmail}>
                                    Email
                                </Input>

                                <Input
                                    value={password}
                                    onChange={setPassword}
                                    type="password"
                                >
                                    Password
                                </Input>

                                <div className="px-2 py-4">
                                    <Button
                                        className="w-full"
                                        disabled={pending}
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                </div>

                                <div className="px-2">
                                    <LinkButton
                                        to="/signup"
                                        className="block w-full"
                                    >
                                        Sign Up
                                    </LinkButton>
                                </div>

                                <div className="border-b border-gray-300 w-full my-4"></div>

                                <div className="px-2 py-4">
                                    <Button
                                        className="w-full"
                                        color="white"
                                        disabled={pending}
                                    >
                                        Login with Google
                                    </Button>
                                </div>

                                <div className="px-2 py-4">
                                    <Button
                                        className="w-full"
                                        color="white"
                                        disabled={pending}
                                    >
                                        Login with Facebook
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <form
                                onSubmit={register}
                                className="flex flex-col max-w-md w-full"
                            >
                                <Input value={username} onChange={setUsername}>
                                    Name
                                </Input>

                                <Input value={email} onChange={setEmail}>
                                    Email
                                </Input>

                                <Input
                                    value={password}
                                    onChange={setPassword}
                                    type="password"
                                >
                                    Password
                                </Input>

                                <div className="px-2 py-4">
                                    <Button
                                        className="w-full"
                                        disabled={pending}
                                        type="submit"
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
