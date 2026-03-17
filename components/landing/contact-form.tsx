"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ArrowRight, CheckCircle, ChevronDown, User, Mail, Phone, Globe, Zap } from "lucide-react"
import axios from "axios"

const requirementOptions = [
  "Digital Platforms",
  "Brand Strategy",
  "Marketing & Communications",
  "UI & UX Design",
  "Data, AI & Automation",
  "Business Consulting",
  "Other",
]

const countryCodes = [
  { code: "+91", flag: "IN", country: "India" },
  { code: "+1", flag: "US", country: "USA" },
  { code: "+44", flag: "GB", country: "UK" },
  { code: "+61", flag: "AU", country: "Australia" },
  { code: "+65", flag: "SG", country: "Singapore" },
  { code: "+971", flag: "AE", country: "UAE" },
]

function CountryFlag({ code }: { code: string }) {
  return (
    <span className="inline-flex items-center justify-center w-6 h-4 bg-secondary/20 rounded text-[10px] font-bold text-secondary-foreground">
      {code}
    </span>
  )
}

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    website: "",
    email: "",
    interest: "select",
    countryCode: countryCodes[0],
    phone: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Name validation
    if (!formData.name) {
      newErrors.name = "Name is required"
    } else if (!/^[a-zA-Z\s]*$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces"
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits"
    }
    
    // Interest validation 
    if (formData.interest === "select") {
      newErrors.interest = "Please select a topic"
    }

    // Website validation (optional but if provided must be valid)
    if (formData.website) {
      try {
        new URL(formData.website.startsWith("http") ? formData.website : `https://${formData.website}`)
      } catch {
        newErrors.website = "Please enter a valid website URL"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    try {
      setIsLoading(true)

      // Post to backend API
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"
      await axios.post(`${backendUrl}/api/contact`, { 
        name: formData.name,
        company: formData.company,
        website: formData.website,
        email: formData.email,
        interest: formData.interest,
        phone: formData.phone,
      })
      

      // Success
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          name: "",
          company: "",
          website: "",
          email: "",
          interest: "select",
          countryCode: countryCodes[0],
          phone: "",
        })
      }, 3000)
    } catch (err: any) {
      if (err.response) {
        // API error
        setErrors({ submit: err.response.data?.message || "Failed to submit form" })
      } else {
        setErrors({ submit: "An error occurred. Please try again." })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="relative rounded-[2rem] p-[1.5px] shadow-2xl shadow-primary/20"
      style={{
        background: "linear-gradient(145deg, hsl(var(--primary)/0.6), hsl(var(--secondary)/0.4), hsl(var(--primary)/0.2), hsl(var(--secondary)/0.6))",
      }}
    >
      {/* Inner card */}
      <div className="rounded-[calc(2rem-1.5px)] bg-background dark:bg-card px-3 py-6 sm:px-8 sm:py-10 lg:px-10 lg:py-12 relative">

        {/* Soft glow blobs — clipped inside their own wrapper so dropdowns can overflow */}
        <div className="pointer-events-none absolute inset-0 rounded-[calc(2rem-1.5px)] overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              className="relative z-10 flex flex-col items-center justify-center py-20 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="relative mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                  <CheckCircle className="h-14 w-14 text-white" />
                </div>
                <motion.div
                  className="absolute -inset-4 border-2 border-green-400/30 rounded-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                <h4 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-2">
                  Message Sent Successfully!
                </h4>
                <p className="text-muted-foreground text-lg">
                  Thank you for reaching out. We'll review your inquiry and get back to you within 24 hours.
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="relative z-10 space-y-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Form title */}
              <div className="mb-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary mb-2">Contact Form</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                  Tell us about your<br />
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">project</span>
                </h3>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

              {/* Name & Company */}
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5 group">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground">
                    <User className="h-3.5 w-3.5" />
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <motion.div className="relative" whileFocus={{ scale: 1.01 }}>
                    <input
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      className={`w-full h-[52px] bg-muted/40 dark:bg-muted/20 border-0 border-b-2 text-foreground placeholder:text-muted-foreground/40 rounded-t-xl text-sm px-4 transition-all duration-300 outline-none ${
                        errors.name
                          ? "border-b-red-500 bg-red-500/5"
                          : "border-b-border focus:border-b-primary"
                      }`}
                      required
                    />
                    {focusedField === "name" && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                  {errors.name && (
                    <motion.p className="text-[11px] text-red-500 font-medium" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Company */}
                <div className="space-y-1.5 group">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground">
                    <Zap className="h-3.5 w-3.5" />
                    Company Name
                  </label>
                  <div className="relative">
                    <input
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      onFocus={() => setFocusedField("company")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Acme Inc."
                      className={`w-full h-[52px] bg-muted/40 dark:bg-muted/20 border-0 border-b-2 text-foreground placeholder:text-muted-foreground/40 rounded-t-xl text-sm px-4 transition-all duration-300 outline-none ${
                        errors.company ? "border-b-red-500 bg-red-500/5" : "border-b-border focus:border-b-primary"
                      }`}
                    /> 
                    {focusedField === "company" && (
                      <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.3 }} />
                    )}
                  </div>
                </div>
              </div>

              {/* Website & Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Website */}
                <div className="space-y-1.5 group">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground">
                    <Globe className="h-3.5 w-3.5" />
                    Website
                  </label>
                  <div className="relative">
                    <input
                      value={formData.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      onFocus={() => setFocusedField("website")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="www.example.com"
                      className={`w-full h-[52px] bg-muted/40 dark:bg-muted/20 border-0 border-b-2 text-foreground placeholder:text-muted-foreground/40 rounded-t-xl text-sm px-4 transition-all duration-300 outline-none ${
                        errors.website ? "border-b-red-500 bg-red-500/5" : "border-b-border focus:border-b-primary"
                      }`}
                    />
                    {focusedField === "website" && (
                      <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.3 }} />
                    )}
                  </div>
                  {errors.website && (
                    <motion.p className="text-[11px] text-red-500 font-medium" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>{errors.website}</motion.p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5 group">
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="john@example.com"
                      className={`w-full h-[52px] bg-muted/40 dark:bg-muted/20 border-0 border-b-2 text-foreground placeholder:text-muted-foreground/40 rounded-t-xl text-sm px-4 transition-all duration-300 outline-none ${
                        errors.email ? "border-b-red-500 bg-red-500/5" : "border-b-border focus:border-b-primary"
                      }`}
                      required
                    />
                    {focusedField === "email" && (
                      <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.3 }} />
                    )}
                  </div>
                  {errors.email && (
                    <motion.p className="text-[11px] text-red-500 font-medium" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>{errors.email}</motion.p>
                  )}
                </div>
              </div>

              {/* Interest Dropdown */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground">
                  <Zap className="h-3.5 w-3.5" />
                  I Would Like to Discuss <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full h-[52px] bg-muted/40 dark:bg-muted/20 border-0 border-b-2 text-foreground rounded-t-xl text-sm px-4 flex items-center justify-between font-medium transition-all duration-300 ${
                      errors.interest ? "border-b-red-500" : isDropdownOpen ? "border-b-primary" : "border-b-border"
                    }`}
                  >
                    <span className={formData.interest === "select" ? "text-muted-foreground/50" : "text-foreground"}>
                      {formData.interest === "select" ? "Select a service area..." : formData.interest}
                    </span>
                    <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="h-4 w-4 text-foreground" />
                    </motion.div>
                  </button>
                  {isDropdownOpen && (
                    <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.3 }} />
                  )}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/60 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden z-20"
                      >
                        <motion.button
                          key="select"
                          type="button"
                          onClick={() => { setFormData({ ...formData, interest: "select" }); setIsDropdownOpen(false) }}
                          className="w-full px-5 py-3 text-left text-sm text-muted-foreground hover:bg-muted/60 transition-colors flex items-center gap-3 border-b border-border/40"
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0 }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                          Select an option
                        </motion.button>
                        {requirementOptions.map((option, index) => (
                          <motion.button
                            key={option}
                            type="button"
                            onClick={() => { handleChange("interest", option); setIsDropdownOpen(false) }}
                            className="w-full px-5 py-3 text-left text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-3 border-b border-border/30 last:border-b-0"
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: (index + 1) * 0.03 }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
                            {option}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {errors.interest && (
                  <motion.p className="text-[11px] text-red-500 font-medium" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>{errors.interest}</motion.p>
                )}
              </div>

              {/* Phone Input */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  Phone Number <span className="text-primary">*</span>
                </label>
                <div className={`relative flex h-[52px] bg-muted/40 dark:bg-muted/20 rounded-t-xl border-0 border-b-2 overflow-visible transition-all duration-300 ${
                  errors.phone ? "border-b-red-500" : "border-b-border focus-within:border-b-primary"
                }`}>
                  {/* Country picker */}
                  <div className="relative flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="h-full pl-4 pr-3 flex items-center gap-2 border-r border-border/50 hover:bg-muted/60 transition-colors rounded-tl-xl"
                    >
                      <CountryFlag code={formData.countryCode.flag} />
                      <span className="text-sm font-semibold text-foreground">{formData.countryCode.code}</span>
                      <ChevronDown className="h-3.5 w-3.5 text-foreground" />
                    </button>
                    <AnimatePresence>
                      {isCountryDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                          className="absolute top-full left-0 mt-2 bg-card border border-border/60 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden z-20 min-w-52"
                        >
                          {countryCodes.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => { setFormData({ ...formData, countryCode: country }); setIsCountryDropdownOpen(false) }}
                              className="w-full px-4 py-2.5 text-left text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-3 border-b border-border/30 last:border-b-0"
                            >
                              <CountryFlag code={country.flag} />
                              <span className="font-semibold">{country.code}</span>
                              <span className="text-muted-foreground text-xs ml-auto">{country.country}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="1234567890"
                    className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground/40 text-sm px-4 focus:outline-none"
                  />
                  {focusedField === "phone" && (
                    <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.3 }} />
                  )}
                </div>
                {errors.phone && (
                  <motion.p className="text-[11px] text-red-500 font-medium" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>{errors.phone}</motion.p>
                )}
              </div>

              {errors.submit && (
                <motion.div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/8 border border-red-500/20 text-red-600 text-sm"
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                >
                  {errors.submit}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div className="pt-2" whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="relative w-full h-14 rounded-2xl font-semibold text-base text-primary-foreground overflow-hidden disabled:cursor-not-allowed disabled:opacity-60 group"
                  style={{
                    background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                    boxShadow: "0 8px 32px color-mix(in oklch, var(--primary) 35%, transparent), 0 2px 8px color-mix(in oklch, var(--primary) 20%, transparent)",
                  }}
                >
                  {/* Shimmer sweep on hover */}
                  <span className="pointer-events-none absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>  
                        <motion.span
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending your message...
                      </>
                    ) : (
                      <>
                        Submit Inquiry
                        <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
                          <ArrowRight className="h-5 w-5" />
                        </motion.span>
                      </>
                    )}
                  </span>
                </button>
              </motion.div>

              <p className="text-[11px] text-center text-muted-foreground/60 pt-1">
                By submitting, you agree to our privacy policy and terms of service.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>  
    </div>
  )
}
