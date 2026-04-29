const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/nexaguard-placeholder";

export default function ContactOptions() {
  return (
    <section className="bg-[#010C13] px-4 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-3">
          <span className="text-cyan-400 text-sm">⏱</span>
          <p className="text-cyan-300 text-sm">
            Expected response time: within 24 hours
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-cyan-400/40 hover:bg-white/10"
            href={CALENDLY_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <div>
              <p className="font-semibold text-sm text-white">
                Prefer to book directly?
              </p>
              <p className="mt-0.5 text-cyan-400 text-sm">Book a call →</p>
            </div>
            <span className="text-2xl">📅</span>
          </a>

          <a
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-green-400/40 hover:bg-white/10"
            href="https://wa.me/971506233538?text=Hi%20Nexaguard%2C%20I%27d%20like%20to%20discuss%20our%20cybersecurity%20needs."
            rel="noopener noreferrer"
            target="_blank"
          >
            <div>
              <p className="font-semibold text-sm text-white">
                Prefer WhatsApp?
              </p>
              <p className="mt-0.5 text-green-400 text-sm">
                Message us on WhatsApp →
              </p>
            </div>
            <span className="text-2xl">💬</span>
          </a>
        </div>
      </div>
    </section>
  );
}
