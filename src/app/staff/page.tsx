"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, X } from "lucide-react"
import { StaffService } from "@/services/staffService"
import { Staff } from "@/types/staff"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

const extractDriveId = (url: string) => {
  const match = url.match(/id=([^&]+)/)
  return match ? match[1] : url
}

export default function StaffPage() {
  const [staffList, setStaffList] = useState<Staff[]>([])
  const [selectedStaff, setSelectedStaff] = useState<(Staff & { availableDates: Date[] }) | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const dayNameMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await StaffService.getAllStaff()
        setStaffList(data)
      } catch (error) {
        alert(`Error loading staff: ${error}`);
      }
    }

    fetchStaff()
  }, [])

  const openModal = (staff: Staff) => {
    const availableDates = staff.availability.days_available.map((dateStr) => new Date(dateStr))

    setSelectedStaff({
      ...staff,
      availableDates,
    } as Staff & { availableDates: Date[] })
    setSelectedDate(null)
    setBookingSuccess(false)
    setIsModalOpen(true)

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        document.documentElement.classList.add("modal-open")
      })
    } else {
      document.documentElement.classList.add("modal-open")
    }
  }

  const closeModal = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        document.documentElement.classList.remove("modal-open")
        setIsModalOpen(false)
      })
    } else {
      document.documentElement.classList.remove("modal-open")
      setIsModalOpen(false)
    }
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedStaff?.id) return
  
    setIsLoading(true)
    const success = await handleDateSelect(selectedDate)
    setIsLoading(false)
  
    if (success) {
      setBookingSuccess(true)
    } else {
      setBookingSuccess(false)
    }
  }
  
  

  const handleDateSelect = async (date: Date) => {
    if (!selectedStaff?.id) return
  
    try {
      setSelectedDate(date)
      await StaffService.updateStaff(selectedStaff.id, date)
      alert("✅ La fecha de contratación y el estado del staff se han actualizado correctamente.")
      return true
    } catch (error) {
      console.error("Error updating hire status:", error)
      alert("❌ Hubo un error al actualizar el staff. Intenta nuevamente.")
      return false
    }
  }

  const handleDeleteStaff = async (id: string) => {
  
    try {
      await StaffService.deleteStaff(id)
      alert("✅ Se ha eliminado el staff y se han actualizado correctamente.")
    } catch (error) {
      console.error("Error updating hire status:", error)
      alert("❌ Hubo un error al actualizar el staff. Intenta nuevamente.")
    }
  }
  

  const isDateAvailable = (date: Date): boolean => {
    if (!selectedStaff) return false
  
    const dayName = dayNameMap[date.getDay()]
    return selectedStaff.availability.days_available.includes(dayName)
  }
  

  const renderCalendar = () => {
    if (!selectedStaff) return null

    const today = new Date()
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay()

    const days = []
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`header-${i}`} className="text-center font-medium text-sm py-2">
          {dayNames[i]}
        </div>,
      )
    }

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(today.getFullYear(), today.getMonth(), day)
      const isAvailable = isDateAvailable(date)
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === date.getMonth() &&
        selectedDate.getFullYear() === date.getFullYear()

      days.push(
        <div
          key={`day-${day}`}
          className={`p-2 text-center cursor-pointer rounded-md transition-colors ${
            isAvailable
              ? isSelected
                ? "bg-primary text-primary-foreground"
                : "hover:bg-primary/10"
              : "text-white opacity-50 cursor-not-allowed"
          }`}
          onClick={() => isAvailable && setSelectedDate(date)}
        >
          {day}
        </div>,
      )
    }

    return <div className="grid grid-cols-7 gap-1 mt-4">{days}</div>
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Header/>
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Nuestro Animadores Profesionales</h1>
            <Link
              href="/upload"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Add New Staff
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {staffList.map((staff) => {
              const name = `${staff.personal_info.first_name} ${staff.personal_info.last_name}`
              const image =
                staff.contact_info.img?.[0]
                  ? `https://drive.google.com/uc?export=view&id=${extractDriveId(staff.contact_info.img[0])}`
                  : "/placeholder.svg"
              const specialty = staff.personal_info.education || "General"
              const bio = `Experiencia: ${staff.personal_info.years_of_experience} años`
              return (
                <div
                  key={staff.id}
                  className="view-transition-card overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md"
                  style={{ viewTransitionName: `card-${staff.id}` }}
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    <Image
                      src={image}
                      alt={name}
                      width={400}
                      height={225}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                      style={{ viewTransitionName: `image-${staff.id}` }}
                    />
                  </div>
                    <div className="p-4">
                      <h2 className="mb-1 text-xl font-semibold" style={{ viewTransitionName: `name-${staff.id}` }}>
                        {name}
                      </h2>
                      <p
                        className="mb-2 text-sm font-medium text-white"
                        style={{ viewTransitionName: `specialty-${staff.id}` }}
                      >
                        {specialty}
                      </p>
                      <p className="mb-4 text-sm text-muted-foreground">{bio}</p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(staff)}
                          disabled={staff.hire?.status === "active"}
                          className={`
                            flex-1 rounded-md px-4 py-2 text-sm font-medium
                            ${staff.hire?.status === "active"
                              ? "bg-muted text-muted-foreground cursor-not-allowed"
                              : "bg-muted text-white hover:bg-secondary/90 ring-2 ring-secondary/50 focus:ring-4 focus:ring-secondary/40 transition duration-200 ease-in-out rounded-lg px-4 py-2 font-medium shadow-sm"}
                          `}
                        >
                          {staff.hire?.status === "active" ? "No disponible" : "Contratar"}
                        </button>

                        <button
                          onClick={() => handleDeleteStaff(staff.id!)}
                          className="flex-1 rounded-md bg-red-600 text-white px-4 py-2 text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {isModalOpen && selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg"
            style={{ viewTransitionName: `modal-${selectedStaff.id}` }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold" style={{ viewTransitionName: `modal-name-${selectedStaff.id}` }}>
                Book with {selectedStaff.personal_info.first_name} {selectedStaff.personal_info.last_name}
              </h2>
              <button onClick={closeModal} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6 text-green-600"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Appointment Confirmed!</h3>
                <p className="text-muted-foreground">
                  Your appointment with {selectedStaff.personal_info.first_name}{" "}
                  {selectedStaff.personal_info.last_name} on {selectedDate?.toLocaleDateString()} has been booked.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className="h-16 w-16 overflow-hidden rounded-full bg-muted"
                    style={{ viewTransitionName: `modal-image-${selectedStaff.id}` }}
                  >
                    <Image
                      src={
                        selectedStaff.contact_info.img?.[0]
                          ? `https://drive.google.com/uc?export=view&id=${extractDriveId(
                              selectedStaff.contact_info.img[0],
                            )}`
                          : "/placeholder.svg"
                      }
                      alt="staff image"
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <strong
                      className="text-sm font-medium text-primary"
                      style={{ viewTransitionName: `modal-specialty-${selectedStaff.id}` }}
                    >
                      {selectedStaff.personal_info.education || "General"}
                    </strong>
                    <p className="text-sm text-primary">{selectedStaff.contact_info.email}</p>
                    <p className="text-sm text-primary">{selectedStaff.contact_info.tel}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="mb-2 flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    <h3 className="font-medium">Select a Date</h3>
                  </div>
                  <p className="mb-2 text-sm text-primary">Available dates are highlighted below:</p>
                  {renderCalendar()}
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closeModal}
                    className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={!selectedDate || isLoading}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isLoading ? "Confirming..." : "Confirm Booking"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer/>
    </div>
  )
}
