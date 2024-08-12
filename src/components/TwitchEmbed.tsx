import { useEffect } from 'react';

interface TwitchEmbedProps {
  channel: string;
  width?: string;
  height?: string;
}

const TwitchEmbed = ({ channel, width = "100%", height = "100%" }: TwitchEmbedProps) => {
  useEffect(() => {
    // Generate a unique ID for the embed container
    const embedId = `twitch-embed-${channel}`;

    // Check if the script is already added to the document
    if (!document.querySelector(`script[src="https://player.twitch.tv/js/embed/v1.js"]`)) {
      const script = document.createElement('script');
      script.src = "https://player.twitch.tv/js/embed/v1.js";
      script.async = true;
      script.onload = () => {
        // Ensure window.Twitch is available after the script loads
        if (window.Twitch) {
          new window.Twitch.Embed(embedId, {
            width,
            height,
            channel,
            parent: [window.location.hostname],
          });
        }
      };
      script.onerror = (error) => {
        console.error('Error loading Twitch embed script:', error);
      };
      document.body.appendChild(script);
    } else {
      // If the script is already loaded, ensure window.Twitch is available
      if (window.Twitch) {
        new window.Twitch.Embed(embedId, {
          width,
          height,
          channel,
          parent: [window.location.hostname],
        });
      }
    }

    return () => {
      // Cleanup the embed div
      const embedDiv = document.getElementById(embedId);
      if (embedDiv) {
        embedDiv.innerHTML = "";
      }
    };
  }, [channel, width, height]);

  return <div className='h-[93%] sm:h-[102%] md:h-full' id={`twitch-embed-${channel}`}></div>;
};

export default TwitchEmbed;
