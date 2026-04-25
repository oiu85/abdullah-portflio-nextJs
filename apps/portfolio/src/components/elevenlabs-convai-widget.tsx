'use client';

import Script from 'next/script';

const DEFAULT_AGENT_ID = 'agent_8301kq154dvgfajswyz6kh9jfr3s';
const WIDGET_SCRIPT_SRC =
  'https://unpkg.com/@elevenlabs/convai-widget-embed/dist/index.js';

type ElevenLabsConvaiWidgetProps = {
  agentId?: string;
};

export function ElevenLabsConvaiWidget({
  agentId = process.env.NEXT_PUBLIC_ELEVENLABS_CONVAI_AGENT_ID ?? DEFAULT_AGENT_ID,
}: ElevenLabsConvaiWidgetProps) {
  if (!agentId) {
    return null;
  }

  return (
    <>
      <elevenlabs-convai agent-id={agentId} />
      <Script src={WIDGET_SCRIPT_SRC} strategy="afterInteractive" />
    </>
  );
}
