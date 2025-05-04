import React, { useContext } from 'react'
import { passwordContext } from '../context/PasswordContext'
const History = ({isDarkMode}) => {
    const {history} = useContext(passwordContext)
  return (
<div>
<div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} p-4 rounded-lg shadow-md mt-6`}>
    <h2 className="text-xl font-semibold mb-2 ">Password History</h2>
    {history.length === 0 ? (
      <p className="text-gray-400">No passwords generated yet.</p>
    ) : (
      <ul className="list-disc pl-5 space-y-1 ">
        {history.map((pass, idx) => (
          <li key={idx} className="break-all">{pass}</li>
        ))}
      </ul>
    )}
  </div>
   </div>
  )
}

export default History