import {memo} from 'react'
import { makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  scoreBoard: {
    width:'150px',
    height:'480px',
    display:'flex',
    flexDirection:'column',
    alignSelf:'center',
    marginRight:'48px'
  },
  scoreText:{
    alignSelf:'center',
    fontSize:'24px',
    color:'brown',
    marginBottom: '8px'
  },
  listStyle:{
    display:'flex',
    justifyContent:'flex-start',
    flexDirection:'column',
    border: '2px solid orange',
    background: 'orange',
    overflowY:'auto'
  },
  itemStyle:{
    fontFamily: 'Rock Salt',
    width:'100%',
    borderBottom:'1px dashed red',
    alignSelf:'center'
  },
  buttonStyle:{
    marginTop: '16px',
    width:'50%',
    alignSelf:'center',
    backgroundColor:'#FFF6D5',
    cursor:'pointer',
    fontSize:'16px',
    fontWeight: 500,
    color:'brown'
  }
});
function ScoreBoard({historyList, handleResetButton}) {
  const classes = useStyles();
  return (
    <div className={classes.scoreBoard}>
      <div className={classes.scoreText}>Recent Score</div>
      {historyList.length > 0 && 
      <>
        <div className={classes.listStyle}>
          {historyList.map((item, index) => 
            <div key={item.id} className={classes.itemStyle}>{index + 1}. You {item.text}</div>
          )}
        </div>
        <button className={classes.buttonStyle} onClick={handleResetButton}>clear</button>
      </>}
    </div>
  )
}

ScoreBoard.propTypes = {
  historyList: PropTypes.shapeOf({}).isRequired, 
  handleResetButton: PropTypes.func.isRequired
}

export default memo(ScoreBoard)