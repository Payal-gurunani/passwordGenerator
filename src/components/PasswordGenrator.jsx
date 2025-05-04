import React ,{ useContext, useEffect, useRef, useState} from 'react'
import { generatePassword } from '../utils/passUtils'
import { passwordContext } from '../context/PasswordContext'
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Slider,
  Checkbox,
  FormControlLabel,
  Box
} from '@mui/material';

const PasswordGenrator = ({isDarkMode}) => {
  const [password , setPassword] = useState('')
  const [length, setLength] = useState(4)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [copied, setCopied] = useState(false)
  const passRef = useRef(null)
  const {addPass} = useContext(passwordContext)


    useEffect(() => {
    const newPass = generatePassword(length, {
      upper: true, 
      lower: true, 
      numbers: number,
      symbols: character,
    });
    setPassword(newPass);
    addPass(newPass)
  }, [length, number, character]);

  const copyPassword = ()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
    // alert("Copied!")
    setCopied(true)
    setTimeout(()=>setCopied(false),2000)
  }
  return (
    <Card sx={{ maxWidth: 500, marginTop: 4, backgroundColor: isDarkMode ? 'grey.900' : 'grey.100', color: isDarkMode ? 'white' : 'black' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          🔐 Password Generator
        </Typography>

        <Box display="flex" gap={1} alignItems="center" mb={2}>
          <TextField
            inputRef={passRef}
            fullWidth
            label="Generated Password"
            value={password}
            InputProps={{ readOnly: true }}
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={copyPassword}>
            Copy
          </Button>
        </Box>

        <Box mb={2}>
          <Typography gutterBottom>Password Length: {length}</Typography>
          <Slider
            value={length}
            onChange={(e, newValue) => setLength(newValue)}
            min={4}
            max={128}
            step={1}
            valueLabelDisplay="auto"
          />
        </Box>

        <FormControlLabel
          control={<Checkbox checked={number} onChange={() => setNumber(prev => !prev)} />}
          label="Include Numbers"
        />
        <FormControlLabel
          control={<Checkbox checked={character} onChange={() => setCharacter(prev => !prev)} />}
          label="Include Special Characters"
        />

        {copied && (
          <Typography sx={{ mt: 2 }} color="success.main">
            Copied!
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default PasswordGenrator
