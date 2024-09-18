import Image from "next/image";

const Photo = ({ src, alt }: { src: string; alt: string }) => {
    return (
        <div className="relative w-full h-full p-0 m-0">
            <Image
                className="object-cover object-center" // object-cover for maintaining aspect ratio, object-center to center image
                src={src}
                alt={alt}
                layout="fill" // Ensures image fills the container
                objectFit="cover" // Makes the image cover the entire space
                objectPosition="center" // Centers the image in both axes
                priority
            />
        </div>
    );
};

export default Photo;