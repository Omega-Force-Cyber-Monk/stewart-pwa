export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-br from-[#0b0f19] via-[#111827] to-[#1e1b4b] pt-24">
      <h1 className="text-5xl font-extrabold mb-6 text-white tracking-tight">
        Own Your Work.
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f42661] to-[#ff7b9f]">
          Keep What You Earn.
        </span>
      </h1>
      <p className="text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
        We provide everything you need to start and run your business successfully. Start fresh with the new requirements here.
      </p>
      
      {/* Spacer to allow scrolling and testing sticky navbar */}
      <div className="h-[200vh]"></div>
    </div>
  );
}
