import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowLeft } from "lucide-react";

const ProfilePage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const saloon = state?.saloon;

    if (!saloon) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-500">No profile data found.</p>
            </div>
        );
    }

    const demoServices = [
        { name: "Hair Cutting", price: "PKR 1500" },
        { name: "Beard Styling", price: "PKR 800" },
        { name: "Facial Treatment", price: "PKR 2000" },
        { name: "Hair Coloring", price: "PKR 2500" },
    ];

    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 hover:text-[#01ABAB] mb-8"
            >
                <ArrowLeft size={18} /> Back
            </button>

            <div>

                {/* Header Section */}
                <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-12">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full md:w-auto">
                        <img
                            src={`https://i.pravatar.cc/150?img=${saloon.id}`}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-[#01ABAB]/30"
                        />
                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl font-semibold text-gray-800">{saloon.name}</h2>
                            <p className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 mt-2">
                                <Mail size={16} /> {saloon.name.toLowerCase().replace(/\s+/g, ".")}@gmail.com
                            </p>
                            <p
                                className={`mt-2 text-sm font-medium ${saloon.status === "Active" ? "text-[#01ABAB]" : "text-red-500"
                                    }`}
                            >
                                ● {saloon.status}
                            </p>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="mt-6 md:mt-0 flex flex-col gap-3 text-gray-600 w-full sm:w-auto">
                        <p className="flex items-center gap-2">
                            <MapPin size={18} className="text-[#01ABAB]" /> {saloon.address}
                        </p>
                        <p className="flex items-center gap-2">
                            <Phone size={18} className="text-[#01ABAB]" /> {saloon.contact}
                        </p>
                        <p className="flex items-center gap-2">
                            <Clock size={18} className="text-[#01ABAB]" /> {saloon.hours}
                        </p>
                    </div>
                </section>


                {/* Services */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Services Offered
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {demoServices.map((srv, idx) => (
                            <div
                                key={idx}
                                className="p-3 border rounded-lg hover:bg-gray-50 flex justify-between"
                            >
                                <span>{srv.name}</span>
                                <span className="font-medium text-[#01ABAB]">{srv.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
