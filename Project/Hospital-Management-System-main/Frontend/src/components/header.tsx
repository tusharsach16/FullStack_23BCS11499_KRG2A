import { useNavigate } from "react-router-dom"

export function Header() {
    const navigate = useNavigate()
    return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 animate-slide-in-down">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">MediCare Pro</h1>
              <p className="text-xs text-muted-foreground">Hospital Management System</p>
            </div>
          </div>
          <nav className="hidden gap-8 md:flex">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Doctors
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
          <button onClick={() => navigate('/login')} className="rounded-lg bg-primary px-6 py-2 text-primary-foreground font-medium hover:shadow-lg hover:opacity-90 transition-all transform hover:scale-105">
            Sign In
          </button>
        </div>
      </div>
    </header>
  )
}
