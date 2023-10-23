import Link from "next/link"

const Navbar = () => {
    return (
        <header className="bg-indigo-500">
            <div className="flex flex-col justify-between p-4 gap-2 md:flex-row">
                <Link className="font-bold text-white text-2xl" href="/">CUYANIMELIST</Link>
                <input placeholder="cari anime..." className=""/>
            </div>
        </header>
    )
}

export default Navbar