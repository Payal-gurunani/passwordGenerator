import { useState , useEffect } from 'react'
import './App.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { IconButton } from '@mui/material';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid' 
import  PasswordGenerator from './components/PasswordGenrator'
import History from './components/History';
import { PasswordProvider,passwordContext } from './context/PasswordContext';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() =>{
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme){
      setIsDarkMode(savedTheme === "dark")
    }
  },[])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  


  const toggletheme = () =>{
    setIsDarkMode(!isDarkMode)
  }

  const theme = createTheme({
    palette:{
      mode: isDarkMode ? 'dark':'light'
    }
  })
  return (
 <ThemeProvider theme={theme}>
  <CssBaseline />
  <div className={` flex flex-col items-center justify-center min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
    <div className='absolute top-4 right-4 '>
    <IconButton 
        onClick={toggletheme}
        className="p-2 bg-blue-400 text-white rounded-l-full m-4"
      >
       {isDarkMode ?  (
          <SunIcon className="h-5 w-5 mr-2" />
        ) : (
          <MoonIcon className="h-5 w-5 mr-2" />
        )}
      </IconButton >
    </div >
      <PasswordProvider>
          <div className={`flex flex-col lg:flex-row gap-6 w-full max-w-5xl p-4 ${history.length === 0 ? 'items-center justify-center' : ''}`}>
            <div className="flex-1">
              <PasswordGenerator isDarkMode={isDarkMode} />
            </div>
            {history.length > 0 && (
              <div className="flex-1 lg:w-1/3">
                <History isDarkMode={isDarkMode} />
              </div>
            )}
          </div>
        </PasswordProvider>
    </div>
 </ThemeProvider>
  )
}

export default App
