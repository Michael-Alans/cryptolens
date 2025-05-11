import Link  from "next/link"

export default function Header() {
    return (
        <header className="header">
            <span><Link href="/" className="nav-link" id="logo">cryptoLens</Link></span>
        </header>
    )
}