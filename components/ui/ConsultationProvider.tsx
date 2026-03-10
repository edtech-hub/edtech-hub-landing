"use client"

import { createContext, useContext, useState } from "react"
import BookConsultationModal from "./BookConsultationModal"

interface ConsultationContextType {
  openModal: () => void
}

const ConsultationContext = createContext<ConsultationContextType>({ openModal: () => {} })

export function useConsultation() {
  return useContext(ConsultationContext)
}

export default function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ConsultationContext.Provider value={{ openModal: () => setIsOpen(true) }}>
      {children}
      <BookConsultationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ConsultationContext.Provider>
  )
}
