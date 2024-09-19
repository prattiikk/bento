import CloudImage from "@/components/assets/cloud.png";
import PlaneImage from "@/components/assets/plane.png";
import PlaneShadowImage from "@/components/assets/planeshadow.png";
import Image from "next/image";

const AirplaneScene = () => {
    return (
        <div className="absolute w-full h-full inset-0 overflow-visible">
            <Image
                src={CloudImage}
                alt="cloud background"
                width={500}
                height={500}
                // layout="fill"
                objectFit="cover"
                className=" opacity-15 brightness-[0.01] animate-moveClouds"
            />
            <Image
                src={CloudImage}
                alt="cloud foreground"
                width={500}
                height={500}
                // layout="fill"
                objectFit="cover"
                className="opacity-80 animate-moveClouds"
            />
            <div className="absolute inset-0">
                <Image
                    src={PlaneImage}
                    alt="plane"
                    width={30}
                    height={30}
                    className="absolute animate-movePlane"
                />
            </div>
            <Image
                src={PlaneShadowImage}
                alt="plane shadow"
                width={30}
                height={30}
                className="absolute animate-movePlaneShadow"
            />

        </div>
    );
};

export default AirplaneScene;