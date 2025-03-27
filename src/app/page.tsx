import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Hero } from "@/components/Hero"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Services</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Find Specialists",
                  description: "Search for healthcare professionals by specialty, location, or availability.",
                  icon: "🔍",
                },
                {
                  title: "Book Appointments",
                  description: "Schedule appointments with your preferred healthcare providers.",
                  icon: "📅",
                },
                {
                  title: "Manage Your Team",
                  description: "Add and manage your healthcare staff with our easy-to-use platform.",
                  icon: "👥",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-4 text-4xl">{service.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}