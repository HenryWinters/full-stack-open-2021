import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.notification)
  let style = {}
  if (notification === null) {
    style = {
      display: 'none'
    }
  } else 
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification