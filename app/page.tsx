import Link from "next/link";

export default function Home() {
  return (
    <section
      className="relative h-screen min-h-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2226.jpg?semt=ais_hybrid')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 md:px-12 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 leading-snug">
          Welcome to Mercileen Agency
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-sans leading-relaxed">
          At Mercileen Agency, we are passionate about making property
          acquisition, sales, and management simple, efficient, and stress-free.
          We value your time and understand the importance of a streamlined
          process. Whether you&apos;re a homebuyer, home seller, rental property
          owner, landlord, or land seller, we&apos;re here to guide you every
          step of the way. Your property journey deserves expert care, and with
          Mercileen Agency, you can trust that you&apos;re in good hands.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-4">
          <Link
            href="/Listings"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base rounded-lg"
          >
            🏠 View Listings
          </Link>
          <Link
            href="/services"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base rounded-lg"
          >
            Services
          </Link>
          <Link
            href="/contact-us"
            className="px-6 py-3 border border-white hover:bg-white hover:text-black text-sm sm:text-base rounded-lg"
          >
            📞 Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
