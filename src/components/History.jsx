import React, { useContext } from 'react'
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem
} from '@mui/material';

import { passwordContext } from '../context/PasswordContext'
const History = ({isDarkMode}) => {
 const {history} = useContext(passwordContext)
  return (
    <Card
    sx={{
      maxWidth: 900,
      marginTop: 4,
      backgroundColor: isDarkMode ? 'grey.900' : 'grey.100',
      color: isDarkMode ? 'white' : 'black',
    }}
  >
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Password History
      </Typography>
      {history.length === 0 ? (
        <Typography color="text.secondary">
          No passwords generated yet.
        </Typography>
      ) : (
        <List>
          {history.map((pass, idx) => (
            <ListItem
              key={idx}
              sx={{ wordBreak: 'break-all', px: 0 }}
            >
              {pass}
            </ListItem>
          ))}
        </List>
      )}
    </CardContent>
  </Card>
  )
}

export default History