export function Footer() {
    return (
      <footer className="border-t border-border bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} CjCapital. All rights reserved.
        </div>
      </footer>
    )
  }