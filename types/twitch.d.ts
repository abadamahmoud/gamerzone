// twitch.d.ts
interface Window {
    Twitch: {
      Embed: new (elementId: string, options: { width: string; height: string; channel: string; parent: string[] }) => void;
    };
  }
  