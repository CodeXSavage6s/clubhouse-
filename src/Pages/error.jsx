
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="card max-w-xl text-center py-12">
        <h1 className="text-4xl font-bold mb-4">404 — Page not found</h1>
        <p className="text-muted mb-6">Sorry, we couldn't find the page you were looking for.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn btn-primary">Take me home</Link>
          <Link to="/" className="btn btn-ghost">Go to dashboard</Link>
        </div>
      </div>
    </div>
  )
}