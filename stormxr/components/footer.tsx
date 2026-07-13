import Link from "next/link";

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
                <p className="mt-3 text-center text-xs text-muted-foreground">
                    <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-foreground">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </footer>
    )
}