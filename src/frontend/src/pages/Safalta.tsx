export default function Safalta() {
  const videos = [
    {
      id: "0KqKZCp9f1I",
      title: "कट्टर सनातनी योद्धा — कार्यक्रम १",
    },
    {
      id: "V1eSyClWWcU",
      title: "कट्टर सनातनी योद्धा — कार्यक्रम २",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-white py-14 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 drop-shadow">
          हमारा सफ़लता
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          हमारी उपलब्धियां एवं कार्यक्रम — सनातन धर्म की सेवा में हमारे प्रयास
        </p>
        <div className="mt-6 flex justify-center">
          <span className="inline-block w-20 h-1 bg-white/60 rounded-full" />
        </div>
      </section>

      {/* Videos */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary text-center mb-8">
          हमारे कार्यक्रमों की झलकियां
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="rounded-xl overflow-hidden shadow-warm border border-primary/20 bg-card"
            >
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="px-4 py-3 bg-primary/5">
                <p className="text-sm font-medium text-primary">
                  {video.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-primary/10 py-10 px-4 text-center">
        <p className="text-foreground/80 max-w-xl mx-auto text-base">
          सनातन धर्म की रक्षा के लिए हमसे जुड़ें और हमारे कार्यक्रमों में भाग लें।
        </p>
        <a
          href="https://te8dzxj2.forms.app/untitled-form"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-8 py-3 rounded-md font-bold text-white shadow-warm hover:opacity-90 transition-opacity"
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
          }}
          data-ocid="safalta.primary_button"
        >
          हमसे जुड़ें
        </a>
      </section>
    </main>
  );
}
