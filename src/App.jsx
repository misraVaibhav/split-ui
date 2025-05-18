import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from './api/axios'

function App() {
  const [groupId, setGroupId] = useState(0)
  const [group, setGroup] = useState(null);

  const getGroup = async () => {
    const res = await api.get(`/groups/${groupId}`);
    setGroup(res.data);    
  };

  return (
    <>
      <p>Hi</p>
      <div className="p-4 max-w-3xl mx-auto">
        <input
          type="text"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        />
        <button
          onClick={getGroup}
        >
        Get the group
        </button>
        {group && <p>{JSON.stringify(group, null, 2)}</p>}
      </div>
    </>
  )
}

export default App
