import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nexaguard Cyber Labs — UAE Cybersecurity Consultancy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #020305 0%, #021624 55%, #020305 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Top cyan accent bar ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: "linear-gradient(90deg, #18A7B7 0%, #1F88BF 100%)",
            display: "flex",
          }}
        />

        {/* ── Radial glow blob (centred-left) ── */}
        <div
          style={{
            position: "absolute",
            top: 65,
            left: 250,
            width: 750,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(24,167,183,0.13) 0%, transparent 68%)",
            display: "flex",
          }}
        />

        {/* ── Corner hex decoration (top-right) ── */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 260,
            height: 260,
            borderRadius: "50%",
            border: "1px solid rgba(24,167,183,0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -30,
            right: -30,
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "1px solid rgba(24,167,183,0.06)",
            display: "flex",
          }}
        />

        {/* ── Logo row ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            zIndex: 10,
          }}
        >
          {/* Shield icon tile */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "linear-gradient(135deg, #18A7B7 0%, #1F88BF 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 24px rgba(24,167,183,0.4)",
            }}
          >
            {/* Shield SVG inline */}
            <svg
              width="28"
              height="32"
              viewBox="0 0 24 28"
              fill="none"
            >
              <path
                d="M12 1L2 5.5V13C2 18.55 6.42 23.74 12 25C17.58 23.74 22 18.55 22 13V5.5L12 1Z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="rgba(255,255,255,0.15)"
              />
              <path
                d="M8 13L11 16L16 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Wordmark */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span
              style={{
                color: "white",
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: "0.12em",
                lineHeight: 1,
              }}
            >
              NEXAGUARD
            </span>
            <span
              style={{
                color: "#18A7B7",
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: "0.38em",
                lineHeight: 1,
              }}
            >
              CYBER LABS
            </span>
          </div>
        </div>

        {/* ── Main headline block ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            zIndex: 10,
          }}
        >
          {/* Cyan accent bar */}
          <div
            style={{
              width: 68,
              height: 4,
              borderRadius: 2,
              background: "linear-gradient(90deg, #18A7B7, #1F88BF)",
              display: "flex",
            }}
          />

          {/* Big headline — two lines */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              fontWeight: 800,
              fontSize: 74,
              lineHeight: 1.07,
              letterSpacing: "-0.025em",
            }}
          >
            <span style={{ color: "white" }}>Breaches Are</span>
            <span
              style={{
                color: "#18A7B7",
              }}
            >
              Preventable.
            </span>
          </div>

          {/* Sub-headline */}
          <span
            style={{
              color: "rgba(148,163,184,0.85)",
              fontSize: 26,
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            Senior-led cybersecurity for UAE businesses.
          </span>
        </div>

        {/* ── Bottom strip ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10,
          }}
        >
          <span style={{ color: "rgba(148,163,184,0.40)", fontSize: 17 }}>
            nexaguardcyberlabs.com
          </span>

          {/* Location pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(24,167,183,0.07)",
              border: "1px solid rgba(24,167,183,0.32)",
              borderRadius: 100,
              padding: "10px 26px",
            }}
          >
            <span
              style={{
                color: "#18A7B7",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.12em",
              }}
            >
              DUBAI · UAE
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
