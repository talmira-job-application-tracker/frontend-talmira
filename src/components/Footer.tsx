'use client'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Left side */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-lg font-semibold">Talmira</h2>
          <p className="text-sm mt-1">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        </div>

        {/* Center links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/about" className="hover:text-white transition">About</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
          <a href="/privacy" className="hover:text-white transition">Privacy</a>
        </div>

        {/* Right side social icons */}
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" className="hover:text-white transition">Twitter</a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-white transition">LinkedIn</a>
          <a href="https://github.com" target="_blank" className="hover:text-white transition">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
