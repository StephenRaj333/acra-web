"use client"

import Head from "next/head"
import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"

const SITE_URL = "https://acra-web.vercel.app";

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
    <>
      <Head>
        <title>Login | AKRA Consultants</title>
        <meta name="description" content="Secure login portal for AKRA Consultants administrators and team members." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${SITE_URL}/login`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/login`} />
        <meta property="og:title" content="Login | AKRA Consultants" />
        <meta property="og:description" content="Secure login portal for AKRA Consultants." />
        <meta property="og:site_name" content="AKRA Consultants" />
      </Head>
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
          {/* Left side - Branding animation */}
          <motion.div
            className="hidden lg:flex flex-col justify-center items-center relative h-full min-h-[560px] select-none"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Dot grid background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, color-mix(in oklch, var(--primary) 18%, transparent) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* Radial fade over grid */}
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, var(--background) 100%)" }}
            />

            {/* Outer orbit ring */}
            <motion.div
              className="absolute w-[340px] h-[340px] rounded-full"
              style={{ border: "1px solid color-mix(in oklch, var(--primary) 25%, transparent)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_12px_4px_color-mix(in_oklch,var(--primary)_60%,transparent)]" />
            </motion.div>

            {/* Middle orbit ring */}
            <motion.div
              className="absolute w-[220px] h-[220px] rounded-full"
              style={{ border: "1px solid color-mix(in oklch, var(--secondary) 25%, transparent)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-secondary shadow-[0_0_10px_3px_color-mix(in_oklch,var(--secondary)_60%,transparent)]" />
            </motion.div>

            {/* Inner orbit ring */}
            <motion.div
              className="absolute w-[130px] h-[130px] rounded-full"
              style={{ border: "1px dashed color-mix(in oklch, var(--primary) 30%, transparent)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            />

            {/* Central logo mark */}
            <motion.div
              className="relative z-10 flex flex-col items-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Glow */}
              <div
                className="absolute -inset-10 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%)" }}
              />
              {/* Triangle logo */}
              <svg width="80" height="80" viewBox="0 0 32 32" fill="none" className="relative mb-3 drop-shadow-2xl">
                <defs>
                  <linearGradient id="lgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--secondary)" />
                  </linearGradient>
                </defs>
                <path d="M16 2L2 28h28L16 2z" stroke="url(#lgGrad)" strokeWidth="2.5" fill="none" />
                <path d="M16 10L10 24h12L16 10z" fill="url(#lgGrad)" />
              </svg>
              <span
                className="text-4xl font-black tracking-tight leading-none"
                style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                AKRA
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-muted-foreground mt-1.5">
                Consultants
              </span>
            </motion.div>

            {/* Floating metric cards */}
            {[
              { label: "Client Retention", value: "98%", x: -130, y: -70, delay: 0.2 },
              { label: "Projects Delivered", value: "150+", x: 125, y: -50, delay: 0.5 },
              { label: "Years of Excellence", value: "12+", x: -120, y: 105, delay: 0.8 },
              { label: "Industries Served", value: "20+", x: 118, y: 95, delay: 1.1 },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="absolute z-10 rounded-2xl px-4 py-3 shadow-xl"
                style={{
                  left: `calc(50% + ${stat.x}px)`,
                  top: `calc(50% + ${stat.y}px)`,
                  transform: "translate(-50%, -50%)",
                  background: "color-mix(in oklch, var(--card) 85%, transparent)",
                  border: "1px solid color-mix(in oklch, var(--border) 80%, transparent)",
                  backdropFilter: "blur(12px)",
                }}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
                transition={{
                  opacity: { delay: stat.delay + 0.6, duration: 0.4 },
                  scale: { delay: stat.delay + 0.6, duration: 0.4 },
                  y: { delay: stat.delay, duration: 4 + stat.delay, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <p
                  className="text-xl font-black leading-none"
                  style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  {stat.value}
                </p>
                <p className="text-[10px] text-muted-foreground font-semibold mt-0.5 whitespace-nowrap uppercase tracking-wide">{stat.label}</p>
              </motion.div>
            ))}

            {/* Bottom tagline */}
            <motion.p
              className="absolute bottom-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              Strategy · Technology · Growth
            </motion.p>
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
                <p className="font-semibold text-foreground mb-2">Credentials:</p>
                <p>Email: <code className="bg-muted/50 px-2 py-1 rounded text-primary">akra@admin.com</code></p>
                <p>Password: <code className="bg-muted/50 px-2 py-1 rounded text-primary">akra</code></p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  )
}
