"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Linkedin, Twitter, Instagram, Github } from "lucide-react"

const footerLinks = {
  company: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "Careers", href: "#" },
  ],
  services: [
    { label: "Brand & Strategy", href: "#" },
    { label: "UI/UX Design", href: "#" },
    { label: "Data & AI", href: "#" },
    { label: "Consulting", href: "#" },
  ],
  contact: [
    { label: "hello@akraconsultants.com", href: "mailto:hello@akraconsultants.com" },
    { label: "+1 (555) 123-4567", href: "tel:+15551234567" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "GitHub" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* CTA Section */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-background/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-balance">
              Ready to scale new heights?
            </h3>
            <p className="mt-2 text-background/70">
              Lets discuss how we can help transform your business.
            </p>
          </div>
          <motion.a
            href="#contact"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Talk to an Expert
            <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-primary">
                <path
                  d="M16 2L2 28h28L16 2z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path d="M16 10L10 24h12L16 10z" fill="currentColor" />
              </svg>
              <span className="text-xl font-bold">AKRA</span>
            </motion.div>
            <p className="mt-4 text-sm text-background/60 leading-relaxed">
              Independent digital consultancy helping businesses scale through
              strategy, design, and technology.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="text-background/60 hover:text-background transition-colors"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © 2026 AKRA Consultants. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-background/60 hover:text-background transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-background/60 hover:text-background transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
