import React, { useContext } from 'react'
import { passwordContext } from '../context/PasswordContext'
const History = () => {
    const {history} = useContext(passwordContext)
  return (
    <div className="mt-6 p-4 bg-gray-900 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-2 text-white">Password History</h2>
    {history.length === 0 ? (
      <p className="text-gray-400">No passwords generated yet.</p>
    ) : (
      <ul className="list-disc pl-5 space-y-1 text-gray-300">
        {history.map((pass, idx) => (
          <li key={idx} className="break-all">{pass}</li>
        ))}
      </ul>
    )}
  </div>
  )
}

export default History