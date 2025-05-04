import { useState , useEffect } from 'react'
import './App.css'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'  // Import icons
import PasswordGenrator from './components/PasswordGenrator'
import History from './components/History';
import { PasswordProvider } from './context/PasswordContext';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() =>{
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme){
      setIsDarkMode(savedTheme === "dark")
    }
  },[])

  useEffect(()=>{
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme' , isDarkMode ?'dark':'light')
  }, [isDarkMode])


  const toggletheme = () =>{
    setIsDarkMode(!isDarkMode)
  }
  return (
    <div className={` flex flex-col items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
    <div className='absolute top-4 right-4 '>
    <button
        onClick={toggletheme}
        className="p-2 bg-blue-400 text-white rounded-l-full m-4"
      >
       {isDarkMode ?  (
          <SunIcon className="h-5 w-5 mr-2" />
        ) : (
          <MoonIcon className="h-5 w-5 mr-2" />
        )}
      </button>
    </div>
     <PasswordProvider >
     <PasswordGenrator isDarkMode={isDarkMode} />
     <History isDarkMode={isDarkMode}/>
     </PasswordProvider >
    </div>
  )
}

export default App
