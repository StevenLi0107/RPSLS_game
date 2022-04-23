import {memo, useMemo, useRef, useState} from 'react'
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from 'axios';
import classnames from 'classnames';
import {gameImages, computerImages, userImages} from '../img';
import {PLAY_RESULT_SERVICE_URL} from '../constants';

const useStyles = makeStyles({
  gamePanelContainer:{
    width:'600px',
    height:'552px',
    background: '#FFF6D5',
    border: '1px solid green',
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  computerPanel:{
    margin:'32px 0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  userPanel:{
    margin:'32px 0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  gameResultPanel:{

  },
  resultStyle:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  selectedItem:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  commonImageButton:{
    width:'88px',
    height: '88px',
  },
  computerImage:{
    borderRadius: '44px',
  },
  userImage:{
    cursor:'pointer', 
    borderRadius: '0px',
    '&:hover':{
      background:'orange !important'
    }
  },
  resultText:{
    fontFamily: 'Rock Salt',
    fontSize:'24px'
  },
  resultImage:{
    width:'88px',
    height: '88px',
  },
  selectedimageButton:{
    width:'64px',
    height: '64px',
    borderRadius: '32px',
    background: 'orange',
  }
});

const panelButton = [
  {id: 1, name:"rock", image:gameImages.rock, backgroundColor:'green'},
  {id: 2, name:"paper", image:gameImages.paper, backgroundColor:'blue'},
  {id: 3, name:"scissor", image:gameImages.scissor, backgroundColor:'cyan'},
  {id: 4, name:"lizard", image:gameImages.lizard, backgroundColor:'red'},
  {id: 5, name:"spock", image:gameImages.spock, backgroundColor:'gray'},
]

function GamePanel({isThinking, handleIsThinking, handleHistoryList}) {
  const classes = useStyles();
  const timerIdRef = useRef(null);
  const [computerItem, setComputerItem] = useState({});
  const [userItem, setUserItem] = useState({});
  const [gameResult, setGameResult] = useState('');

  const selectRandomState = () => {
    const randomValue = parseInt(Math.random() * 5) + 1;
    setComputerItem(panelButton.find(item => item.id === randomValue));
  }

  const handleSelectItem = async (selectedIndex) => {
    setUserItem(panelButton.find(item => item.id === selectedIndex))
    handleIsThinking(true);
    if(timerIdRef.current)
      clearTimeout(timerIdRef.current);
    timerIdRef.current = setInterval(selectRandomState, 200);

    try{
      const result = await axios.post(PLAY_RESULT_SERVICE_URL, {player:selectedIndex});
      setComputerItem(panelButton.find(item => item.id === result.data.computer));
      setGameResult(result.data.results);
      handleHistoryList(prev => {
        const newId = Math.random() * 1000;
          if(prev.length < 10)
            return [...prev, {id:newId, text:result.data.results}];
          else {
            const previousValue = [...prev];
            previousValue.shift();
            return [...previousValue, {id:newId, text:result.data.results}];
          }
        }
      )
    }
    catch(err) {
      console.error(err);
      setComputerItem({});
      setUserItem({});
      setGameResult('');
    }
    finally {
      handleIsThinking(false);
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    
  }

  const [computerImage, userImage] = useMemo(() => {
    if(isThinking) {
      return [computerImages.normalComputer, userImages.normalUser];
    }

    if(gameResult === 'win')
      return [computerImages.loseComputer, userImages.winUser];
    else if(gameResult === 'lose')
      return [computerImages.winComputer, userImages.loseUser];
    else if(gameResult === 'tie')
      return [computerImages.tieComputer, userImages.tieUser];
    else
      return [computerImages.normalComputer, userImages.normalUser];
  }, [gameResult, isThinking])

  return (
    <div className={classes.gamePanelContainer}>
      <div className={classes.computerPanel}>
        {panelButton.map(item => 
        <img 
          key={item.name} className={classnames(classes.commonImageButton, classes.computerImage)} src={item.image} 
          alt={item.name} style={{background:item.id === computerItem.id && isThinking ? 'orange' : item.backgroundColor}}
        />)}
      </div>
      <div className={classes.gameResultPanel}>
        <div className={classes.selectedItem}>
          {computerItem && <img 
            className={classes.selectedimageButton} src={computerItem.image} 
            alt={computerItem.name}
          />}
        </div>
        <div className={classes.resultStyle}>
          {computerImage && <img 
            className={classes.resultImage} src={computerImage} 
            alt="computer result"
            style={{marginLeft:'16px'}}
          />}
          {gameResult !== '' && <div className={classes.resultText}>You {gameResult}!</div>}
          {userImage && <img 
            className={classes.resultImage} src={userImage} 
            alt="user result"
            style={{marginRight:'16px'}}
          />}
        </div>
        <div className={classes.selectedItem}>
          {userItem && <img 
            className={classes.selectedimageButton} src={userItem.image} 
            style={{borderRadius: '0px'}}
            alt={userItem.name}
          />}
        </div>
      </div>
      <div className={classes.userPanel}>
        {panelButton.map((item, index) => 
        <img 
          key={item.name} className={classnames(classes.commonImageButton, classes.userImage)} src={item.image} 
          alt={item.name} style={{background:item.backgroundColor}}
          onClick={() => handleSelectItem(index + 1)}
        />)}
      </div>
    </div>
  )
}

GamePanel.propTypes = {
  isThinking: PropTypes.bool.isRequired, 
  handleIsThinking: PropTypes.func.isRequired, 
  handleHistoryList: PropTypes.func.isRequired
}

export default memo(GamePanel)