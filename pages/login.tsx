"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const VALID_EMAIL = "akra@admin.com"
  const VALID_PASSWORD = "akra"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!password) {
      setError("Password is required")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        setIsSuccess(true)
        setIsLoading(false)
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setError("Invalid email or password")
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Illustration */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <svg
              viewBox="0 0 500 500"
              className="w-full h-auto max-w-lg"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Animated background circle */}
              <motion.circle
                cx="250"
                cy="250"
                r="200"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                opacity="0.3"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-primary, #3b82f6)" />
                  <stop offset="100%" stopColor="var(--color-secondary, #ec4899)" />
                </linearGradient>
              </defs>

              {/* Animated lock icon */}
              <motion.g
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {/* Lock body */}
                <rect x="185" y="200" width="130" height="150" rx="10" fill="none" stroke="currentColor" strokeWidth="8" className="text-primary" />

                {/* Lock shackle */}
                <path
                  d="M 210 200 Q 210 120 250 120 Q 290 120 290 200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-secondary"
                />

                {/* Lock keyhole */}
                <circle cx="250" cy="260" r="12" fill="currentColor" className="text-primary" opacity="0.8" />
                <rect x="245" y="275" width="10" height="35" fill="currentColor" className="text-primary" opacity="0.8" />

                {/* Animated particles around lock */}
                {[...Array(6)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx="250"
                    cy="100"
                    r="4"
                    fill="currentColor"
                    className="text-primary"
                    animate={{
                      cx: [250, 250 + Math.cos((i / 6) * Math.PI * 2) * 120, 250],
                      cy: [100, 100 + Math.sin((i / 6) * Math.PI * 2) * 120, 100],
                      opacity: [1, 0.3, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.g>

              {/* Animated dots */}
              <motion.circle
                cx="100"
                cy="150"
                r="3"
                fill="currentColor"
                className="text-secondary"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle
                cx="400"
                cy="350"
                r="2"
                fill="currentColor"
                className="text-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </svg>
          </motion.div>

          {/* Right side - Login form */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-xl shadow-primary/10 backdrop-blur-sm">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back</h1>
                <p className="text-muted-foreground mb-8">Sign in to access your dashboard</p>
              </motion.div>

              {/* Success message */}
              {isSuccess && (
                <motion.div
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">Login successful! Redirecting...</span>
                </motion.div>
              )}

              {/* Error message */}
              {error && !isSuccess && (
                <motion.div
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-600 font-medium">{error}</span>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email field */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError("")
                      }}
                      placeholder="akra@admin.com"
                      className="w-full h-12 bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground/50 rounded-xl text-sm px-4 pl-12 transition-all duration-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      disabled={isLoading || isSuccess}
                    />
                  </div>
                </motion.div>

                {/* Password field */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (error) setError("")
                      }}
                      placeholder="Enter your password"
                      className="w-full h-12 bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground/50 rounded-xl text-sm px-4 pl-12 pr-12 transition-all duration-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      disabled={isLoading || isSuccess}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={isLoading || isSuccess}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Forgot password */}
                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >  
                </motion.div>

                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: isLoading || isSuccess ? 1 : 1.01 }}
                  whileTap={{ scale: isLoading || isSuccess ? 1 : 0.99 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground rounded-xl h-14 font-semibold text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-transparent border-t-current rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          Signing in...
                        </>
                      ) : isSuccess ? (
                        <>
                          <CheckCircle className="h-5 w-5" />
                          Success!
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </span>
                  </Button>
                </motion.div>
              </form>

              {/* Demo credentials hint */}
              <motion.div
                className="mt-8 p-4 bg-secondary/10 border border-secondary/20 rounded-lg text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="font-semibold text-foreground mb-2">Demo Credentials:</p>
                <p>Email: <code className="bg-muted/50 px-2 py-1 rounded text-primary">akra@admin.com</code></p>
                <p>Password: <code className="bg-muted/50 px-2 py-1 rounded text-primary">akra</code></p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
