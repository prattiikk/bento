import { useState } from "react";
import BentoDock from "./BentoDock";

const ProfileSection = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [username, setUsername] = useState("John Doe");
    const [bio, setBio] = useState("This is a short bio...");

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="flex flex-col w-full h-screen fixed">
            {/* Profile Picture Section */}
            <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden border mt-12 ml-12 mb-4">
                {profileImage ? (
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full font-semibold text-gray-400">
                        Upload Image
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                />
            </div>

            {/* Username Section */}
            <div className="w-full mt-5">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full text-left ml-12 text-5xl tracking-tighter font-bold text-black bg-transparent focus:outline-none"
                    placeholder="Username"
                />
            </div>

            {/* Bio Section */}
            <div className="w-full mt-2">
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full text-left ml-12 text-xl text-black opacity-60 bg-transparent focus:outline-none"
                    placeholder="Tell us about yourself"
                    rows={3}
                />
            </div>
            <BentoDock />
        </div>
    );
};

export default ProfileSection;