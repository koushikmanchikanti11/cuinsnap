import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="font-playfair text-[36px] sm:text-[42px] font-bold text-[#3B1F0A] leading-tight max-w-md mx-auto">
          Your college food stall, snapped.
        </h1>
        <p className="text-[#3B1F0A]/60 text-[14px] font-dm-sans mt-3">
          No sign in. Just snap &amp; share.
        </p>
      </div>

      {/* Action Cards */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[340px] sm:max-w-[700px]">
        {/* Camera Card */}
        <Link href="/camera" className="flex-1 group">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#E8622A] to-[#d4551f] rounded-[24px] p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#E8622A]/40 min-h-[220px] flex flex-col justify-between cursor-pointer border border-[#E8622A]/20">
            {/* Background pattern/glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-white/20 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
                  <circle cx="12" cy="13" r="3"/>
                </svg>
              </div>
              <h2 className="font-playfair text-[24px] font-bold text-white mb-2 leading-tight">
                Take a<br/>Snap
              </h2>
              <p className="text-white/80 text-[14px] font-dm-sans max-w-[180px]">
                Capture the moment right now
              </p>
            </div>
            
            <div className="relative z-10 mt-6 flex items-center text-white text-[13px] font-bold tracking-wide uppercase">
              <span className="group-hover:mr-2 transition-all duration-300">Open Camera</span>
              <svg className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Gallery Card */}
        <Link href="/gallery" className="flex-1 group">
          <div className="relative overflow-hidden bg-white rounded-[24px] p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl min-h-[220px] flex flex-col justify-between cursor-pointer border-[1.5px] border-[#3B1F0A]/10 hover:border-[#3B1F0A]/20">
            {/* Background pattern */}
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#F5ECD7] to-transparent rounded-tl-full opacity-50 transition-transform duration-500 group-hover:scale-125"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-[#F5ECD7] rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-[#3B1F0A]/5 transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 text-[#3B1F0A]">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="m21 15-5-5a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
              </div>
              <h2 className="font-playfair text-[24px] font-bold text-[#3B1F0A] mb-2 leading-tight">
                View<br/>Gallery
              </h2>
              <p className="text-[#3B1F0A]/60 text-[14px] font-dm-sans max-w-[180px]">
                Browse recent memories
              </p>
            </div>
            
            <div className="relative z-10 mt-6 flex items-center text-[#3B1F0A] text-[13px] font-bold tracking-wide uppercase">
              <span className="group-hover:mr-2 transition-all duration-300">Explore</span>
              <svg className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Bottom Note */}
      <p className="text-[#3B1F0A]/30 text-[12px] font-dm-sans mt-8">
        No sign in needed · Just snap &amp; share
      </p>
    </div>
  );
}
