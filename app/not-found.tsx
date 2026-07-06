export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground mb-6">Page not found</p>
        <a href="/" className="inline-block px-4 py-2 bg-primary text-card rounded hover:bg-primary/90">
          Go Home
        </a>
      </div>
    </div>
  )
}
