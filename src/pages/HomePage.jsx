import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import api from '../api/axios.js';

function HomePage() {
  const [groupName, setGroupName] = useState("");
  const [groupIdentifier, setGroupIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [error, setError] = useState(null);
  const [joinError, setJoinError] = useState(null);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/groups", { name: groupName });
      setGroupName("");
      navigate(`/groups/${res.data.id}`);
    } catch (err) {
      setError("Could not create group.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    setJoinLoading(true);
    setJoinError(null);
    try {
      const res = await api.get(`/groups/${groupIdentifier}`);
      setGroupIdentifier("");
      navigate(`/groups/${res.data.id}`);
    } catch (err) {
      setJoinError("Group not found.");
    } finally {
      setJoinLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-200">
      <div id="aurora-bg"></div>

      {/* Top-right join box */}
      <form
        onSubmit={handleJoin}
        className="absolute top-4 right-6 flex space-x-2 items-center z-10"
        style={{ minWidth: 0 }}
      >
        <input
          type="text"
          placeholder="Group ID"
          value={groupIdentifier}
          onChange={e => setGroupIdentifier(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          disabled={joinLoading}
        />
        <button
          type="submit"
          className="bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-800 transition shadow"
          disabled={joinLoading}
        >
          {joinLoading ? "Joining..." : "Join"}
        </button>
        {joinError && <span className="text-red-400 text-xs ml-2">{joinError}</span>}
      </form>

      <nav className="bg-gray-900 border-b border-gray-800 py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="font-bold text-xl text-emerald-400">Split</div>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center p-6">
        <form
          className="bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md card-glow border border-gray-700"
          onSubmit={handleCreate}
        >
          <h2 className="text-2xl font-semibold text-gray-100 mb-6">Enter a group name</h2>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Group name"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-emerald-700 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-emerald-800 transition shadow-lg"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
          <p className="text-gray-400 text-sm mt-4 text-center">
            Split expenses easily with friends and family
          </p>
        </form>
      </div>

      <footer className="bg-gray-900 py-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gray-500 text-sm text-center">© 2025 Split App</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
