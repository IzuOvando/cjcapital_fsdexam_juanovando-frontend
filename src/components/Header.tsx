import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-nav shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          CjCapital
        </Link>
        <nav className="hidden space-x-6 md:flex">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/staff" className="text-sm font-medium hover:text-primary">
            Our Staff
          </Link>
          <Link href="/upload" className="text-sm font-medium hover:text-primary">
            Add Staff
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link
            href="/upload"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 md:hidden"
          >
            Add Staff
          </Link>
        </div>
      </div>
    </header>
  )
}