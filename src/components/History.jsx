import React, { useContext, useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  IconButton,
  Tooltip,
  Button,
  Box,
  InputAdornment,
  TextField
} from '@mui/material';
import { ContentCopy, Visibility, VisibilityOff } from '@mui/icons-material';

import { passwordContext } from '../context/PasswordContext';

const History = ({ isDarkMode }) => {
  const { history, setHistory } = useContext(passwordContext);
  const [copied, setCopied] = useState(false);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('passwordHistory'));
    if (savedHistory) {
      setHistory(savedHistory);
    }
  }, [setHistory]);

  // Persist history to localStorage when it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('passwordHistory', JSON.stringify(history));
    }
  }, [history]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  return (
    <div className={isDarkMode ? "bg-black text-white" : "bg-white text-black"}>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Password History</h1>
        <p className="mb-6 text-center">
          View your previously generated passwords.
        </p>

        <div className="rounded-2xl p-6 w-full max-w-lg shadow-lg">
         

          {history.length === 0 ? (
            <Typography color="text.secondary">No passwords generated yet.</Typography>
          ) : (
            <List>
              {history.slice(0,10).map((pass, idx) =>  (
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
                </ListItem>
              ))}
            </List>
          )}

          {history.length > 0 && (
            <Box mt={2} textAlign="center">
              <Button
                onClick={clearHistory}
                size="small"
                color="error"
                variant="text"
                className="bg-teal-400 hover:bg-teal-500 text-black font-semibold px-4 py-2 rounded-lg"
              >
                {copied ? "Copied" : "Clear passwords"}
              </Button>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
