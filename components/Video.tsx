export default function Video({ src }: { src: string }) {
    return (
        <div className="relative w-full h-full">
            <video
                className="w-full h-full object-cover"
                src={src}
                autoPlay
                muted // Optionally mute the video by default
                loop // This ensures the video plays continuously
            />
        </div>
    );
}