import { useEffect } from 'react';

interface TwitchEmbedProps {
  channel: string;
  width?: string;
  height?: string;
}

const TwitchEmbed = ({ channel, width = "100%", height = "480" }: TwitchEmbedProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://player.twitch.tv/js/embed/v1.js";
    script.async = true;
    script.onload = () => {
      new window.Twitch.Embed("twitch-embed", {
        width,
        height,
        channel,
        parent: [window.location.hostname]
      });
    };
    script.onerror = (error) => {
      console.error('Error loading Twitch embed script:', error);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [channel, width, height]);

  return <div id="twitch-embed"></div>;
};

export default TwitchEmbed;
