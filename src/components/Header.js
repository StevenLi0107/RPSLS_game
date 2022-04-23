import {memo} from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    width:'100%',
    height:'48px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    fontSize:'48px',
    margin: '32px 0px'
  },
  titleColor:{
    color:'brown'
  }
});
function Header() {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <div className={classes.titleColor}>
        Rock Paper Scissor Lizard Spock Game
      </div>
    </div>
  )
}

export default memo(Header);