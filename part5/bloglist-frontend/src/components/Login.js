import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      setNotification({ message: `${username} is now logged in` })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    } catch (exception) {
      setNotification({ message: exception.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: null })
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
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

export default Login