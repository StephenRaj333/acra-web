import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Services } from "@/components/landing/services"
import { About } from "@/components/landing/about"
import { Testimonial } from "@/components/landing/testimonial"
import { Approach } from "@/components/landing/approach"
import { Contact } from "@/components/landing/contact"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <Testimonial />  
      <Approach />
      <Contact />
      <Footer />
    </main>
  ) 
}
