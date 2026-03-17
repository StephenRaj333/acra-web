"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ArrowRight, CheckCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
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
      const backendUrl = "http://localhost:8080" 
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
    <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-primary/5">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            className="flex flex-col items-center justify-center py-16 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <motion.div
                className="absolute -inset-4 border-2 border-green-200 dark:border-green-800 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
            <h4 className="text-2xl font-bold text-foreground">Message Sent!</h4>
            <p className="mt-2 text-muted-foreground">We will get back to you within 24 hours.</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Name & Organization Row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Name *
                </label>
                <motion.div
                  className="relative"
                  whileFocus={{ scale: 1.01 }}
                >
                  <input
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="John Doe"
                    className={`w-full h-12 bg-muted/50 border text-foreground placeholder:text-muted-foreground/50 rounded-xl text-sm px-4 transition-all duration-300 outline-none focus:ring-2 ${errors.name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-border focus:border-primary focus:ring-primary/20"
                      }`}
                    required
                  />
                </motion.div>
                {errors.name && (
                  <motion.p
                    className="text-xs text-red-500 font-medium"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Company Name
                </label>
                <input
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  onFocus={() => setFocusedField("company")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Acme Inc."
                  className={`w-full h-12 bg-muted/50 border text-foreground placeholder:text-muted-foreground/50 rounded-xl text-sm px-4 transition-all duration-300 outline-none focus:ring-2 ${errors.company
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-border focus:border-primary focus:ring-primary/20"
                    }`}
                />
                {errors.company && (
                  <motion.p
                    className="text-xs text-red-500 font-medium"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.company}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Website & Email Row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Website
                </label>
                <input
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  onFocus={() => setFocusedField("website")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="www.example.com"
                  className={`w-full h-12 bg-muted/50 border text-foreground placeholder:text-muted-foreground/50 rounded-xl text-sm px-4 transition-all duration-300 outline-none focus:ring-2 ${errors.website
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-border focus:border-primary focus:ring-primary/20"
                    }`}
                />
                {errors.website && (
                  <motion.p
                    className="text-xs text-red-500 font-medium"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.website}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="john@example.com"
                  className={`w-full h-12 bg-muted/50 border text-foreground placeholder:text-muted-foreground/50 rounded-xl text-sm px-4 transition-all duration-300 outline-none focus:ring-2 ${errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-border focus:border-primary focus:ring-primary/20"
                    }`}
                  required
                />
                {errors.email && (
                  <motion.p
                    className="text-xs text-red-500 font-medium"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Interest Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                I Would Like to Discuss *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full h-12 bg-muted/50 border text-foreground rounded-xl text-sm px-4 flex items-center justify-between font-medium transition-all duration-300 ${errors.interest
                      ? "border-red-500 hover:border-red-500 focus:ring-red-500/20"
                      : "border-border hover:border-primary/50 focus:ring-primary/20"
                    }`}
                >
                  <span className={formData.interest === "select" ? "text-muted-foreground" : ""}>
                    {formData.interest === "select" ? "Select an option" : formData.interest}
                  </span>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-xl shadow-2xl overflow-hidden z-20"
                    >
                      <motion.button
                        key="select"
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, interest: "select" })
                          setIsDropdownOpen(false)
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
                        Select an option
                      </motion.button>
                      {requirementOptions.map((option, index) => (
                        <motion.button
                          key={option}
                          type="button"
                          onClick={() => {
                            handleChange("interest", option)
                            setIsDropdownOpen(false)
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index + 1) * 0.03 }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
                          {option}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {errors.interest && (
                <motion.p
                  className="text-xs text-red-500 font-medium"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.interest}
                </motion.p>
              )}
            </div>

            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Phone Number *
              </label>
              <div className={`flex h-12 bg-muted/50 rounded-xl overflow-hidden border transition-all duration-300 ${errors.phone
                  ? "border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
                  : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                }`}>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    className="h-full px-3 flex items-center gap-2 border-r border-border hover:bg-muted/80 transition-colors"
                  >
                    <CountryFlag code={formData.countryCode.flag} />
                    <span className="text-sm text-foreground font-medium">
                      {formData.countryCode.code}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <AnimatePresence>
                    {isCountryDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 bg-popover border border-border rounded-xl shadow-2xl overflow-hidden z-20 min-w-48"
                      >
                        {countryCodes.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, countryCode: country })
                              setIsCountryDropdownOpen(false)
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-3"
                          >
                            <CountryFlag code={country.flag} />
                            <span className="font-medium">{country.code}</span>
                            <span className="text-muted-foreground text-xs">{country.country}</span>
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
                  placeholder="(0000) 000-000"
                  className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground/50 text-sm px-4 focus:outline-none"
                />
              </div>
              {errors.phone && (
                <motion.p
                  className="text-xs text-red-500 font-medium"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.phone}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <motion.div
              className="pt-4"
              whileHover={{ scale: 1.01 }} 
              whileTap={{ scale: 0.99 }}
            >
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground rounded-xl h-14 font-semibold text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  {isLoading ? "Submitting..." : "Submit Inquiry"}
                  {!isLoading && <ArrowRight className="h-5 w-5" />}
                </span>
              </Button>
            </motion.div>

            {errors.submit && (
              <motion.p
                className="text-xs text-red-500 font-medium text-center"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.submit}
              </motion.p>
            )}

            <p className="text-xs text-center text-muted-foreground pt-2">
              By submitting, you agree to our privacy policy and terms of service.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
