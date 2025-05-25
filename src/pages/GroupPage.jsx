import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios.js'
import '../styles/GroupPage.css'

import GroupHeader from '../components/GroupHeader.jsx'
import GroupDetails from '../components/GroupDetails.jsx'

function GroupPage() {

    const { groupId } = useParams();

    const [group, setGroup] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        api.get(`/groups/${groupId}`)
            .then(res => setGroup(res.data))
            .catch(err => setError(err))
            .finally(() => setLoading(false));   
    }, [groupId]);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>{error}</p>;

    return (
        <div className="group-page h-screen flex flex-col overflow-hidden">
            <GroupHeader
                group_name={group.name}
            />
            <GroupDetails
                transactions={group.transactions}
                users={group.users}
            />
        </div>
    )
}

export default GroupPage;