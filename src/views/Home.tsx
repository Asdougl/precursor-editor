import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { LinkButton } from '../components/LinkButton'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { firestore } from '../firebase'
import { ProtectedViewProps } from '../types/route'
import { Workspace } from '../types/timeline'
import { Loader } from '../components/Loader'
import { Link } from 'react-router-dom'

const Home = ({ user }: ProtectedViewProps) => {
    const [workspaces, loading, error] = useCollectionDataOnce<Workspace>(
        firestore.collection('workspaces').where('owner', '==', user.uid),
        { idField: '_id' }
    )

    let view: JSX.Element | JSX.Element[]
    if (loading) {
        view = <Loader />
    } else if (error) {
        view = <div>{error}</div>
    } else if (!workspaces) {
        view = <div>An Error has occurred</div>
    } else {
        view = workspaces.map((workspace) => (
            <Link
                to={`editor/${workspace._id}`}
                className="rounded border border-gray-300 p-2 w-64 text-center font-semibold text-xl hover:bg-gray-100 hover:shadow"
            >
                {workspace.title}
            </Link>
        ))
    }

    return (
        <div className="p-8">
            <div className="container mx-auto flex flex-col gap-4">
                <h1 className="text-3xl font-bold flex gap-4">
                    <div className="flex items-center gap-1">
                        <span className="h-4 w-4 rounded-full bg-blue-dianne"></span>
                        <span className="h-4 w-4 rounded-full bg-jungle-green"></span>
                        <span className="h-4 w-4 rounded-full bg-rob-roy"></span>
                        <span className="h-4 w-4 rounded-full bg-sandy-brown"></span>
                        <span className="h-4 w-4 rounded-full bg-burnt-sienna"></span>
                    </div>
                    <div className="text-gray-700">
                        Welcome {user?.displayName}
                    </div>
                </h1>

                {view}
            </div>
        </div>
    )
}

export default Home
