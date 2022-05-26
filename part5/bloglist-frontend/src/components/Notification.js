import '../index.css'

const Notification = ({ notification }) => {

    if(notification.type === null) {
        return null 
    } else 
    
    if (notification.type === 'error') {
        return (
            <div className='error'> 
                {notification.message}
            </div>
        )
    } else 

        return (
            <div className='success'> 
                {notification.message}
            </div>
        )

}

export default Notification