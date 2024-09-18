import Image from "next/image";

const Photo = ({ src, alt }: { src: string; alt: string }) => {
    return (
        <div className="relative w-full h-full p-0 m-0">
            <Image
                className="object-cover" // Use object-cover to maintain aspect ratio
                src={src}
                alt={alt}
                layout="fill" // This will make the image take up the full width and height of the parent
                objectFit="cover" // Ensures the image covers the entire space without distortion
                priority
            />
        </div>
    );
};

export default Photo;