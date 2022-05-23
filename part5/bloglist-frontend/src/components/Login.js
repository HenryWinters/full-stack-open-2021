import loginService from '../services/login'

const Login = ({username, password, setUsername, setPassword, user, setUser}) => { 

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
              username, password,
            })
            setUser(user)
            setUsername('')
            setPassword('')
          } catch (error) {
            
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