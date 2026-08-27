import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Premchand Panku — Senior Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0c0c0e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "#e8e6df",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 600, letterSpacing: -1 }}>
          Premchand Panku
        </div>
        <div style={{ fontSize: 32, color: "#8a90a3", marginTop: 20 }}>
          Senior Software Engineer · NIT Warangal
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#5eead4",
            marginTop: 48,
            letterSpacing: 0.5,
          }}
        >
          premchand11.github.io
        </div>
      </div>
    ),
    { ...size },
  );
}
