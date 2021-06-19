import React from 'react'
import { hot } from 'react-hot-loader/root'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Home from './views/Home'
import Landing from './views/Landing'
import Workspace from './views/Workspace'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import { UserContext } from './context/UserContext'

import Login from './views/Login'
import LoadingPage from './views/LoadingPage'

const App = () => {
    const [authUser, loading] = useAuthState(auth)

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Router>
                <UserContext.Provider value={authUser}>
                    <Navbar />
                    {loading ? (
                        <LoadingPage />
                    ) : (
                        <Switch>
                            {/* Default Route */}

                            <Route path="/" exact>
                                {authUser ? (
                                    <Home user={authUser} />
                                ) : (
                                    <Landing />
                                )}
                            </Route>

                            {/* Authenticated Routes */}

                            <Route path="/editor/:workspaceid">
                                {authUser ? (
                                    <Workspace user={authUser} />
                                ) : (
                                    <Redirect to="/login" />
                                )}
                            </Route>

                            {/* Authentication Routes */}

                            <Route path="/login">
                                {authUser ? <Redirect to="/" /> : <Login />}
                            </Route>
                            <Route path="/signup">
                                {authUser ? (
                                    <Redirect to="/" />
                                ) : (
                                    <Login signUp />
                                )}
                            </Route>

                            {/* Catchall Route */}

                            <Route path="*">
                                <Redirect to="/" />
                            </Route>
                        </Switch>
                    )}
                </UserContext.Provider>
            </Router>
        </div>
    )
}

export default hot(App)
