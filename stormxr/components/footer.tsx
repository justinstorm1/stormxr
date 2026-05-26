export default function Footer() {
    return (
        <footer className="bg-background border-t border-border py-12">
            <div className="container mx-auto px-4">
                <p className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} StormXR, LLC. All rights reserved.
                </p>
                <p className="text-center text-xs text-muted-foreground">
                    Designed and developed by Justin Storm
                </p>
            </div>
        </footer>
    )
}