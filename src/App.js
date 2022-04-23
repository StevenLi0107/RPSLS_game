import { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import './App.css';
import GamePanel from './components/GamePanel';
import Header from './components/Header';
import ScoreBoard from './components/ScoreBoard';

const useStyles = makeStyles({
  container: {
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'space-between'
  },
  gameBody: {
    position:'relative',
    width:'850px',
    height:'600px',
    alignSelf:'center'
  },
  gameContainer:{
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
});

function App() {
  const classes = useStyles();
  const [isThinking, setIsThinking] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const handleResetScore = useCallback(() => setHistoryList([]), []);
  return (
    <div className={classes.container}>
      <div className={classes.gameBody}>
        <Header />
        <div className={classes.gameContainer}>
            <GamePanel 
              isThinking={isThinking} 
              handleIsThinking={setIsThinking}
              handleHistoryList={setHistoryList}
            />
            <ScoreBoard historyList={historyList} handleResetButton={handleResetScore}/>
        </div>
      </div>
    </div>
  );
}

export default App;
