"use client"

import type React from "react"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { UploadForm } from "@/components/UploadForm"

export default function UploadStaffPage() {

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <UploadForm />
            </div>
          </div>
        </main>
      <Footer />
    </div>
  )
}
