"use client"

import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { Staff } from "@/types/staff"
import { StaffService } from "@/services/staffService"

export function Hero() {
  const [searchTerm, setSearchTerm] = useState("")
  const [staffList, setStaffList] = useState<Staff[]>([])

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await StaffService.getAllStaff()
        setStaffList(data)
      } catch (error) {
        alert(`Error loading staff: ${error}`)
      }
    }

    fetchStaff()
  }, [])

  const filteredStaff = staffList.filter((staff) => {
    const fullName = `${staff.personal_info.first_name} ${staff.personal_info.last_name} ${staff.personal_info.second_last_name}`.toLowerCase()

    const skillMap: Record<string, boolean> = {
      "animador": staff.personal_info.has_animator_experience,
      "maquillaje": staff.personal_info.has_face_painting_experience,
      "globoflexia": staff.personal_info.has_balloon_twisting_experience,
      "coreografías": staff.personal_info.has_choreography_experience,
      "canto": staff.personal_info.can_sing,
      "rapel": staff.personal_info.has_rappelling_experience,
      "disfraces": staff.personal_info.has_costumes_material,
    }

    const skillsText = Object.entries(skillMap)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(" ")

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      skillsText.includes(searchTerm.toLowerCase())
    )
  })

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left: Texto y búsqueda */}
        <div className="w-full md:w-1/2">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl text-white">
            Encuentra al staff ideal
          </h1>
          <p className="mb-6 max-w-md text-white/80 md:text-lg">
            Filtra por nombre o experiencia para encontrar el mejor talento disponible.
          </p>

          <div className="relative w-full max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white" />
            <input
              type="text"
              placeholder="Buscar por nombre o experiencia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/70 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {filteredStaff.length === 0 && (
            <p className="text-white/70 text-sm">No se encontraron resultados.</p>
          )}
        </div>

        {/* Right: Imagen */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/images/entretainers-hero.png"
            alt="Staff illustration"
            className="max-w-md h-auto rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Cards debajo si hay resultados */}
      {filteredStaff.length > 0 && (
        <div className="mt-12 container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((staff) => {
            const {
              first_name,
              last_name,
              second_last_name,
              has_animator_experience,
              has_face_painting_experience,
              has_balloon_twisting_experience,
              has_choreography_experience,
              can_sing,
              has_rappelling_experience,
              has_costumes_material,
            } = staff.personal_info

            const skillMap: Record<string, boolean> = {
              "Animador": has_animator_experience,
              "Maquillaje artístico": has_face_painting_experience,
              "Globoflexia": has_balloon_twisting_experience,
              "Coreografías": has_choreography_experience,
              "Canto": can_sing,
              "Rapel": has_rappelling_experience,
              "Disfraces": has_costumes_material,
            }

            const skills = Object.entries(skillMap)
              .filter(([_, active]) => active)
              .map(([label]) => label)

            return (
              <div
                key={staff.id}
                className="rounded-xl bg-white/5 p-4 border border-white/10 shadow-md backdrop-blur"
              >
                <h3 className="text-lg font-semibold text-white mb-1">
                  {first_name} {last_name} {second_last_name}
                </h3>
                <p className="text-sm text-white/80 mb-1">Habilidades:</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.length > 0 ? (
                    skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-white/50 text-sm">Sin habilidades registradas</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
