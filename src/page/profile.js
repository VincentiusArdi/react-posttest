import React from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import profile from "../assets/image/2.jpeg";

const ProfileCard = () => {
    return (
        <div className="min-w-full">
            <Card className=" shadow-lg rounded-xl md:m-8">
                {/* Grid Layout */}
                <div className="grid md:grid-cols-2">

                    {/* Bagian Kiri - Gambar */}
                    <div className="col-6">
                        <div className="absolute inset-0 bg-yellow-400 rounded-bl-xl"></div>
                        <img
                            src={profile}
                            alt="Profile"
                            width="500"
                        />
                    </div>

                    {/* Bagian Kanan - Detail Profil */}
                    <div className="p-6 bg-white">
                        <p className="text-gray-400 text-sm">Name</p>
                        <h1 className="text-2xl font-bold text-gray-800">Vincentius Ardi Christanto</h1>

                        <p className="text-gray-400 text-sm mt-4">Position</p>
                        <h2 className="text-xl font-semibold text-gray-700">Junior BackEnd Developer</h2>

                        {/* Followers & Following */}
                        <div className="flex items-center gap-6 mt-6">
                            <div>
                                <p className="text-gray-400 text-sm">Quotes Of The Day</p>
                                <p className="text-lg font-bold font-italic text-gray-800">"Yang Sudah, Boleh Pulang..."</p>
                            </div>
                        </div>

                        <Divider className="my-4" />

                        {/* Team Section */}
                        <p className="text-gray-400 text-sm">Social Media</p>
                        <div className="flex mt-2 gap-2">
                            <a
                                href="https://www.instagram.com/chrstnt_ardi?igsh=Y3lxdXA5eWtjbHh0&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-700 hover:text-pink-500 transition"
                            >
                                <i className="pi pi-instagram text-lg"></i>
                                <span>@chrstnt_ardi</span>
                            </a>

                            {/* TikTok */}
                            <a
                                href="https://www.tiktok.com/@noisymonk3y?_t=ZS-8tvb8v1ogMh&_r=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-gray-700 hover:text-indigo-300 transition"
                            >
                                <i className="pi pi-tiktok text-lg"></i>
                                <span>@noisymonk3y</span>
                            </a>
                        </div>
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default ProfileCard;
