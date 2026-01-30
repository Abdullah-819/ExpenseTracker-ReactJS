import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { motion, AnimatePresence } from "framer-motion"

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.94
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

const errorShake = {
  x: [0, -10, 8, -6, 4, 0],
  transition: { duration: 0.5 }
}

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = e => {
    e.preventDefault()
    const success = login(username, password)

    if (!success) {
      setError("Invalid credentials")
      return
    }

    navigate("/")
  }

  return (
    <motion.div
      className="login-page"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="login-card godfather-glow"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="login-title">Login</h1>

        <motion.form
          onSubmit={handleSubmit}
          className="login-form"
          animate={error ? errorShake : {}}
        >
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />

          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />

          <motion.button
            type="submit"
            className="login-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            Login
          </motion.button>

          <AnimatePresence>
            {error && (
              <motion.p
                className="login-error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>
    </motion.div>
  )
}

export default Login
