import { useContext, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  IconButton,
  Tooltip,
  Box,
  InputAdornment,
  TextField,
} from '@mui/material';
import { ContentCopy, Visibility, VisibilityOff } from '@mui/icons-material';
import { passwordContext } from '../context/PasswordContext';

const History = ({ isDarkMode }) => {
  const { history, setHistory } = useContext(passwordContext);
  const [copied, setCopied] = useState(false);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  // Function to check strength of the password (similar to PasswordGenerator)
  const checkStrength = (password, options) => {
    const lengthIsGood = password.length >= 8
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);

    const allConditionsMet =
      lengthIsGood &&
      hasUpper &&
      hasLower &&
      hasNumber &&
      hasSymbol;

    if (allConditionsMet) {
      return { label: 'Strong', color: 'green' };
    } else if (password.length >=6){
      return { label: 'Moderate', color: 'orange' };
    } else {
      return { label: 'Weak', color: 'red' };
    }
  };

  const handleCopy = (text) => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setHistory(prev => prev.filter(p => p !== text));
    } catch (error) {
      console.error('Failed to copy');
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('passwordHistory');
  };

  const toggleVisibility = (index) => {
    setVisibleIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
if(history.length==0){
  return null;
}
  return (
    <div className={isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}>
      <div className='min-h-screen flex flex-col items-center justify-center p-4'>
        <h1 className='text-3xl font-bold mb-4'>
          Generated Passwords
        </h1>
        <p className='mb-6 text-center'>View your previously generated passwords.</p>

        <div className='rounded-2xl p-6 w-full max-w-lg shadow-lg'>
          {history.length === 0 ? (
            <Typography color='text.secondary'>No passwords generated yet.</Typography>
          ) : (
            <List>
              {history.slice(0,16).map((pass, idx) => {
                const strength = checkStrength(pass); // Use the checkStrength function
                return (
                  <ListItem
                    key={idx}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 1,
                      px: 0,
                      py: 1,
                      wordBreak: 'break-word',
                      borderBottom: '1px solid',
                      borderColor: isDarkMode ? 'grey.800' : 'grey.300',
                    }}
                  >
                    <TextField
                      variant="standard"
                      value={visibleIndexes.includes(idx) ? pass : '•'.repeat(pass.length)}
                      InputProps={{
                        readOnly: true,
                        disableUnderline: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title={visibleIndexes.includes(idx) ? 'Hide' : 'Show'}>
                              <IconButton onClick={() => toggleVisibility(idx)} size="small">
                                {visibleIndexes.includes(idx) ? (
                                  <VisibilityOff fontSize="small" />
                                ) : (
                                  <Visibility fontSize="small" />
                                )}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Copy">
                              <IconButton onClick={() => handleCopy(pass)} size="small">
                                <ContentCopy fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      inputProps={{
                        style: {
                          color: isDarkMode ? 'white' : 'black',
                          fontFamily: 'monospace',
                          fontSize: '0.9rem',
                        },
                      }}
                    />

                    {/* Display Password Strength */}
                    <span
                      className="font-semibold text-sm whitespace-nowrap"
                      style={{ color: strength.color }}
                    >
                      {strength.label}
                    </span>


                  </ListItem>
                );
              })}
            </List>
          )}

          {history.length > 0 && (
            <Box mt={2} textAlign='center'>
              <IconButton
                onClick={clearHistory}
                size='small'
                color='error'
                variant='text'
                className='bg-teal-400 hover:bg-teal-500 text-black font-semibold px-4 py-2 rounded-lg'
              >
                Clear 
              </IconButton>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
