import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Work",
  description: "Explore Ed-Astra's portfolio of web and mobile applications built for real businesses.",
}

export default function OurWorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
