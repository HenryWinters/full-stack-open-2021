import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ username, password, setUsername, setPassword, user, setUser, setNotification }) => { 

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
              username, password,
            })
            
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
            setNotification({message: `${username} is now logged in`})
            setTimeout(() => {
                setNotification({message: null, type: null})
            }, 5000)
          } catch (exception) {
            setNotification({message: exception.response.data.error, type: 'error'})
            setTimeout(() => {
                setNotification({message: null, type: null})
            }, 5000)
          }
    }

    return (
        <div> 
            <form onSubmit={handleLogin}>
                <div>
                    username
                        <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    </div>
                    <div>
                    password
                        <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                />
                </div>
                <button type="submit">login</button>
            </form>
        </div> 
    )
}

export default Login 