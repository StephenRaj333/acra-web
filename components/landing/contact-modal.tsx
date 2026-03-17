"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { X, ArrowRight, CheckCircle, ChevronDown, User, Mail, Phone, Globe, Zap } from "lucide-react"
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
        <span className="inline-flex items-center justify-center w-6 h-4 bg-white/10 rounded text-[10px] font-bold text-white/80">
            {code}
        </span>
    )
}

type Props = {
    open: boolean
    onClose: () => void
}

export function ContactModal({ open, onClose }: Props) {
    const panelRef = useRef<HTMLDivElement>(null)

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        website: "",
        email: "",
        interest: "select",
        countryCode: countryCodes[0],
        phone: "",
    })

    // Reset form whenever modal opens
    useEffect(() => {
        if (open) {
            setIsSubmitted(false)
            setErrors({})
            setFormData({
                name: "",
                company: "",
                website: "",
                email: "",
                interest: "select",
                countryCode: countryCodes[0],
                phone: "",
            })
        }
    }, [open])

    // Lock body scroll while open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [open])

    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [onClose])

    // Close on backdrop click (outside panel)
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
            onClose()
        }
    }

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => { const n = { ...prev }; delete n[field]; return n })
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}
        if (!formData.name) {
            newErrors.name = "Name is required"
        } else if (!/^[a-zA-Z\s]*$/.test(formData.name)) {
            newErrors.name = "Name can only contain letters and spaces"
        }
        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }
        if (!formData.phone) {
            newErrors.phone = "Phone number is required"
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be exactly 10 digits"
        }
        if (formData.interest === "select") {
            newErrors.interest = "Please select a topic"
        }
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
        if (!validateForm()) return
        try {
            setIsLoading(true)
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"
            await axios.post(`${backendUrl}/api/contact`, {
                name: formData.name,
                company: formData.company,
                website: formData.website,
                email: formData.email,
                interest: formData.interest,
                phone: formData.phone,
            })
            setIsSubmitted(true)
            setTimeout(() => {
                onClose()
            }, 2800)
        } catch (err: any) {
            if (err.response) {
                setErrors({ submit: err.response.data?.message || "Failed to submit form" })
            } else {
                setErrors({ submit: "An error occurred. Please try again." })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {open && (
                // Backdrop — clicking it closes the modal
                <motion.div
                    key="modal-backdrop"
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={handleBackdropClick}
                    style={{
                        // Glass morphism backdrop
                        background: "rgba(5, 8, 22, 0.55)",
                        backdropFilter: "blur(18px) saturate(160%)",
                        WebkitBackdropFilter: "blur(18px) saturate(160%)",
                    }}
                >
                    {/* Coloured radial glow behind panel */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(ellipse 70% 60% at 50% 50%, hsl(var(--primary)/0.15) 0%, hsl(var(--secondary)/0.08) 45%, transparent 80%)",
                        }}
                    />

                    {/* Panel */}
                    <motion.div
                        ref={panelRef}
                        key="modal-panel"
                        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-[2rem] shadow-2xl [&::-webkit-scrollbar]:hidden"
                        initial={{ opacity: 0, scale: 0.92, y: 32 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 20 }}
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                        style={{
                            scrollbarWidth: "none",
                            background: "linear-gradient(145deg, rgba(15,18,40,0.97), rgba(20,24,54,0.97))",
                            border: "1px solid rgba(255,255,255,0.10)",
                            boxShadow:
                                "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)",
                        }}
                        // stop click bubbling so it doesn't trigger backdrop close
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Inner glow blobs */}
                        <div className="pointer-events-none absolute inset-0 rounded-[2rem] overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-secondary/10 blur-3xl" />
                        </div>

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10">
                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    /* ── Success state ── */
                                    <motion.div
                                        key="success"
                                        className="flex flex-col items-center justify-center py-16 text-center"
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.45 }}
                                    >
                                        <motion.div
                                            className="relative mb-6"
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                        >
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                                                <CheckCircle className="h-12 w-12 text-white" />
                                            </div>
                                            <motion.div
                                                className="absolute -inset-4 border-2 border-green-400/30 rounded-full"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1.3, opacity: 0 }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                        </motion.div>
                                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                                            <h4 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
                                                Message Sent!
                                            </h4>
                                            <p className="text-white/60 text-sm">
                                                Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                ) : (
                                    /* ── Form state ── */
                                    <motion.div
                                        key="form"
                                        className="space-y-6"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {/* Header */}
                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-primary mb-1.5">Get Started</p>
                                            <h3 className="text-2xl font-bold text-white leading-tight">
                                                Tell us about your{" "}
                                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                                    project
                                                </span>
                                            </h3>
                                        </div>

                                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                        {/* Name & Company */}
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {/* Name */}
                                            <div className="space-y-1.5 group">
                                                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white transition-colors">
                                                    <User className="h-3.5 w-3.5" />
                                                    Your Name <span className="text-primary">*</span>
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        value={formData.name}
                                                        onChange={(e) => handleChange("name", e.target.value)}
                                                        onFocus={() => setFocusedField("name")}
                                                        onBlur={() => setFocusedField(null)}
                                                        placeholder="John Doe"
                                                        className={`w-full h-[48px] bg-white/5 border-0 border-b-2 text-white placeholder:text-white/20 rounded-t-xl text-sm px-4 outline-none transition-all ${errors.name ? "border-b-red-500 bg-red-500/5" : "border-b-white/10 focus:border-b-primary"
                                                            }`}
                                                    />
                                                    {focusedField === "name" && (
                                                        <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.3 }} />
                                                    )}
                                                </div>
                                                {errors.name && <motion.p className="text-[11px] text-red-400 font-medium" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>{errors.name}</motion.p>}
                                            </div>

                                            {/* Company */}
                                            <div className="space-y-1.5 group">
                                                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white transition-colors">
                                                    <Zap className="h-3.5 w-3.5" />
                                                    Company
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        value={formData.company}
                                                        onChange={(e) => handleChange("company", e.target.value)}
                                                        onFocus={() => setFocusedField("company")}
                                                        onBlur={() => setFocusedField(null)}
                                                        placeholder="Acme Inc."
                                                        className="w-full h-[48px] bg-white/5 border-0 border-b-2 border-b-white/10 text-white placeholder:text-white/20 rounded-t-xl text-sm px-4 outline-none focus:border-b-primary transition-all"
                                                    />
                                                    {focusedField === "company" && (
                                                        <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.3 }} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Website & Email */}
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {/* Website */}
                                            <div className="space-y-1.5 group">
                                                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white transition-colors">
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
                                                        className={`w-full h-[48px] bg-white/5 border-0 border-b-2 text-white placeholder:text-white/20 rounded-t-xl text-sm px-4 outline-none transition-all ${errors.website ? "border-b-red-500 bg-red-500/5" : "border-b-white/10 focus:border-b-primary"
                                                            }`}
                                                    />
                                                    {focusedField === "website" && (
                                                        <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.3 }} />
                                                    )}
                                                </div>
                                                {errors.website && <motion.p className="text-[11px] text-red-400 font-medium" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>{errors.website}</motion.p>}
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-1.5 group">
                                                <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white transition-colors">
                                                    <Mail className="h-3.5 w-3.5" />
                                                    Email <span className="text-primary">*</span>
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => handleChange("email", e.target.value)}
                                                        onFocus={() => setFocusedField("email")}
                                                        onBlur={() => setFocusedField(null)}
                                                        placeholder="john@example.com"
                                                        className={`w-full h-[48px] bg-white/5 border-0 border-b-2 text-white placeholder:text-white/20 rounded-t-xl text-sm px-4 outline-none transition-all ${errors.email ? "border-b-red-500 bg-red-500/5" : "border-b-white/10 focus:border-b-primary"
                                                            }`}
                                                    />
                                                    {focusedField === "email" && (
                                                        <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.3 }} />
                                                    )}
                                                </div>
                                                {errors.email && <motion.p className="text-[11px] text-red-400 font-medium" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>{errors.email}</motion.p>}
                                            </div>
                                        </div>

                                        {/* Interest dropdown */}
                                        <div className="space-y-1.5">
                                            <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
                                                <Zap className="h-3.5 w-3.5" />
                                                I Would Like to Discuss <span className="text-primary">*</span>
                                            </label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                    className={`w-full h-[48px] bg-white/5 border-0 border-b-2 text-white rounded-t-xl text-sm px-4 flex items-center justify-between font-medium transition-all ${errors.interest ? "border-b-red-500" : isDropdownOpen ? "border-b-primary" : "border-b-white/10"
                                                        }`}
                                                >
                                                    <span className={formData.interest === "select" ? "text-white/25" : "text-white"}>
                                                        {formData.interest === "select" ? "Select a service area..." : formData.interest}
                                                    </span>
                                                    <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                        <ChevronDown className="h-4 w-4 text-white" />
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
                                                            className="absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl overflow-hidden z-30"
                                                            style={{ background: "rgba(15,18,40,0.98)", border: "1px solid rgba(255,255,255,0.10)" }}
                                                        >
                                                            <button
                                                                type="button"
                                                                onClick={() => { setFormData({ ...formData, interest: "select" }); setIsDropdownOpen(false) }}
                                                                className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/5 transition-colors flex items-center gap-3 border-b border-white/5"
                                                            >
                                                                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                                                Select an option
                                                            </button>
                                                            {requirementOptions.map((option, i) => (
                                                                <motion.button
                                                                    key={option}
                                                                    type="button"
                                                                    onClick={() => { handleChange("interest", option); setIsDropdownOpen(false) }}
                                                                    className="w-full px-4 py-3 text-left text-sm text-white hover:bg-primary/15 hover:text-primary transition-colors flex items-center gap-3 border-b border-white/5 last:border-b-0"
                                                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                                                                >
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
                                                                    {option}
                                                                </motion.button>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            {errors.interest && <motion.p className="text-[11px] text-red-400 font-medium" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>{errors.interest}</motion.p>}
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-1.5">
                                            <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
                                                <Phone className="h-3.5 w-3.5" />
                                                Phone Number <span className="text-primary">*</span>
                                            </label>
                                            <div className={`relative flex h-[48px] bg-white/5 rounded-t-xl border-0 border-b-2 overflow-visible transition-all ${errors.phone ? "border-b-red-500" : "border-b-white/10 focus-within:border-b-primary"
                                                }`}>
                                                {/* Country picker */}
                                                <div className="relative flex-shrink-0">
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                                                        className="h-full pl-4 pr-3 flex items-center gap-2 border-r border-white/10 hover:bg-white/5 transition-colors rounded-tl-xl"
                                                    >
                                                        <CountryFlag code={formData.countryCode.flag} />
                                                        <span className="text-sm font-semibold text-white">{formData.countryCode.code}</span>
                                                        <ChevronDown className="h-3.5 w-3.5 text-white" />
                                                    </button>
                                                    <AnimatePresence>
                                                        {isCountryDropdownOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                                                                className="absolute top-full left-0 mt-2 rounded-2xl shadow-2xl overflow-hidden z-30 min-w-52"
                                                                style={{ background: "rgba(15,18,40,0.98)", border: "1px solid rgba(255,255,255,0.10)" }}
                                                            >
                                                                {countryCodes.map((country) => (
                                                                    <button
                                                                        key={country.code}
                                                                        type="button"
                                                                        onClick={() => { setFormData({ ...formData, countryCode: country }); setIsCountryDropdownOpen(false) }}
                                                                        className="w-full px-4 py-2.5 text-left text-sm text-white hover:bg-primary/15 hover:text-primary transition-colors flex items-center gap-3 border-b border-white/5 last:border-b-0"
                                                                    >
                                                                        <CountryFlag code={country.flag} />
                                                                        <span className="font-semibold">{country.code}</span>
                                                                        <span className="text-white text-xs ml-auto">{country.country}</span>
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
                                                    onFocus={() => setFocusedField("phone")}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder="1234567890"
                                                    className="flex-1 bg-transparent border-none text-white placeholder:text-white/20 text-sm px-4 focus:outline-none"
                                                />
                                                {focusedField === "phone" && (
                                                    <motion.div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.3 }} />
                                                )}
                                            </div>
                                            {errors.phone && <motion.p className="text-[11px] text-red-400 font-medium" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>{errors.phone}</motion.p>}
                                        </div>

                                        {/* Submit error */}
                                        {errors.submit && (
                                            <motion.div
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                                                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                                            >
                                                {errors.submit}
                                            </motion.div>
                                        )}

                                        {/* Submit */}
                                        <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                                            <button
                                                onClick={handleSubmit}
                                                disabled={isLoading}
                                                className="relative w-full h-14 rounded-2xl font-semibold text-base text-primary-foreground overflow-hidden disabled:cursor-not-allowed disabled:opacity-60 group"
                                                style={{
                                                    background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                                                    boxShadow: "0 8px 32px color-mix(in oklch, var(--primary) 35%, transparent), 0 2px 8px color-mix(in oklch, var(--primary) 20%, transparent)",
                                                }}
                                            >
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
                                                            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}>
                                                                <ArrowRight className="h-5 w-5" />
                                                            </motion.span>
                                                        </>
                                                    )}
                                                </span>
                                            </button>
                                        </motion.div>

                                        <p className="text-[11px] text-center text-white/25">
                                            By submitting, you agree to our privacy policy and terms of service.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
