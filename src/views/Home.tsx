import React from 'react'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { firestore } from '../firebase'
import { ProtectedViewProps } from '../types/route'
import { Workspace } from '../types/timeline'
import { Loader } from '../components/Loader'
import { Link } from 'react-router-dom'
import { FancyLoader } from '../components/FancyLoader'

const Home = ({ user }: ProtectedViewProps) => {
    const [workspaces, loading, error] = useCollectionDataOnce<Workspace>(
        firestore.collection('workspaces').where('owner', '==', user.uid),
        { idField: '_id' }
    )

    let view: JSX.Element | JSX.Element[]
    if (loading) {
        view = <FancyLoader />
    } else if (error) {
        view = <div>{error}</div>
    } else if (!workspaces) {
        view = <div>An Error has occurred</div>
    } else {
        view = (
            <div className="">
                <div className="flex items-center gap-4 pb-4">
                    <div className="flex items-center gap-1">
                        <span className="h-4 w-4 rounded-full bg-blue-dianne"></span>
                        <span className="h-4 w-4 rounded-full bg-jungle-green"></span>
                        <span className="h-4 w-4 rounded-full bg-rob-roy"></span>
                        <span className="h-4 w-4 rounded-full bg-sandy-brown"></span>
                        <span className="h-4 w-4 rounded-full bg-burnt-sienna"></span>
                    </div>
                    <h2 className="text-2xl">Your Workspaces</h2>
                </div>
                <div className="flex gap-4">
                    {workspaces.map((workspace) => (
                        <Link
                            key={workspace._id}
                            to={`editor/${workspace._id}`}
                            className="rounded border border-black bg-black text-white p-2 w-64 text-center font-semibold text-xl hover:opacity-70 hover:shadow"
                        >
                            {workspace.title}
                        </Link>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-jungle-green py-12">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl font-bold font-serif text-white">
                        Welcome {user?.displayName}
                    </h1>
                </div>
            </div>
            <div className="container mx-auto flex flex-col gap-4">{view}</div>
        </div>
    )
}

export default Home
