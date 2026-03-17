import Head from "next/head"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Scale } from "@/components/landing/scale"
import { Services } from "@/components/landing/services"
import { About } from "@/components/landing/about"
import { Testimonial } from "@/components/landing/testimonial"
import { Approach } from "@/components/landing/approach"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"

const SITE_URL = "https://acra-web.vercel.app";

export default function Home() {
  return (
    <>
      <Head>
        <title>AKRA Consultants | Digital Strategy, Brand &amp; Technology Solutions</title>
        <meta name="description" content="AKRA is a premium consultancy firm specializing in digital platforms, brand strategy, UI/UX design, marketing communications, data &amp; AI automation, and business consulting. Based in Mumbai, India." />
        <meta name="keywords" content="digital consultancy, brand strategy, UI UX design, digital platforms, business consulting, marketing communications, data AI automation, technology solutions, Mumbai, India, AKRA" />
        <meta name="author" content="AKRA Consultants" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="AKRA Consultants | Digital Strategy, Brand & Technology Solutions" />
        <meta property="og:description" content="Premium consultancy firm specializing in digital platforms, brand strategy, UI/UX design, marketing, data & AI, and business consulting. Based in Mumbai, India." />
        <meta property="og:site_name" content="AKRA Consultants" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AKRA Consultants | Digital Strategy, Brand & Technology Solutions" />
        <meta name="twitter:description" content="Premium consultancy firm specializing in digital platforms, brand strategy, UI/UX design, marketing, data & AI, and business consulting." />
        <meta name="twitter:site" content="@akraconsultants" />
      </Head>
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Scale /> 
        <Services />
        <About />
        <Testimonial />
        <Approach />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
