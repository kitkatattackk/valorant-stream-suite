import { createFileRoute } from "@tanstack/react-router";
import { OverlayNodeStudio } from "@/components/overlay-node-studio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Valorant Stream Bundle Studio — OverlayNode" },
      { name: "description", content: "Customize coordinated rank, chat, and stream goal overlays for OBS with OverlayNode." },
      { property: "og:title", content: "Valorant Stream Bundle Studio — OverlayNode" },
      { property: "og:description", content: "Customize coordinated rank, chat, and stream goal overlays for OBS with OverlayNode." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <OverlayNodeStudio />;
}
