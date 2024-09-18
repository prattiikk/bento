export default function SocialMediaLinks({ url, platform }: { url: string, platform: string }) {
    return (
        <div className="social-media-link">
            <a href={url} target="_blank" rel="noopener noreferrer">
                {platform}
            </a>
        </div>
    );
}