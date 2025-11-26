import React, { useState, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MapPin, Phone, Clock } from "lucide-react";

const TableRow = memo(({ saloon, handleToggle }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/profile/${saloon.id}`, { state: { saloon } });
  };

  return (
    <tr
      onClick={handleRowClick}
      className="border-b hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer"
    >
      <td className="py-3 px-4 font-medium text-[#01ABAB] hover:underline flex items-center gap-3">
        <img
          src={`https://i.pravatar.cc/40?img=${saloon.id}`}
          alt="Profile"
          className="w-8 h-8 rounded-full border border-gray-200"
        />
        {saloon.name}
      </td>
      <td className="py-3 px-4">{saloon.address}</td>
      <td className="py-3 px-4">{saloon.contact}</td>
      <td className="py-3 px-4">{saloon.hours}</td>
      <td className="py-3 px-4">
        <div className="relative group inline-block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggle(saloon.id);
            }}
            className={`text-sm px-3 py-1 rounded-full transition-all duration-300 ease-in-out ${saloon.status === "Active"
              ? "text-[#01ABAB] bg-[#01ABAB]/10 hover:bg-[#01ABAB]/20"
              : "text-red-500 bg-red-100 hover:bg-red-200"
              }`}
          >
            ● {saloon.status}
          </button>
          <span className="w-full absolute -top-8 left-1/2 -translate-x-1/2 bg-[#01ABAB] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {saloon.status === "Active"
              ? "Click to Block the User"
              : "Click to Unblock the User"}
          </span>
        </div>
      </td>
    </tr>
  );
});

const Management = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [saloonList, setSaloonList] = useState(() => {
    const baseSaloons = [
      "Crown Saloon",
      "Canvas Saloon",
      "Brownie Saloon",
      "Tony and Guys",
      "Pauli Mora Saloon",
      "Buckmaster Hair Stylers",
      "Swann Saloon",
    ];
    return Array.from({ length: 35 }, (_, i) => ({
      id: i + 1,
      name: baseSaloons[i % baseSaloons.length] + " #" + (i + 1),
      address: "Lahore, Pakistan",
      contact: `(030${i % 10}) ${Math.floor(
        1000000 + Math.random() * 9000000
      )}`,
      hours: "09:00 am – 12:00 pm",
      status: Math.random() > 0.5 ? "Active" : "Deactivate",
    }));
  });

  const itemsPerPage = 7;
  const totalPages = Math.ceil(saloonList.length / itemsPerPage);

  const filteredData = useMemo(() => {
    return saloonList.filter((saloon) =>
      saloon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, saloonList]);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleToggle = (id) => {
    setSaloonList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            status: item.status === "Active" ? "Deactivate" : "Active",
          }
          : item
      )
    );
  };

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const mobileData = currentData.slice(0, 5);
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Saloon Management
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            View and manage all registered saloons here.
          </p>
        </div>

        {/* Date */}
        <div className="relative group mt-4 md:mt-0">
          <button className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#01ABAB]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10m-7 8h4m-7 8h10M4 21h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {currentDate}
          </button>
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#01ABAB] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Today's Date
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full md:w-1/3 mb-6">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, or role"
          className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#01ABAB]/30"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table View */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-left border-collapse bg-white rounded-xl shadow-sm">
          <thead>
            <tr className="text-gray-600 text-sm bg-gray-50 border-b border-gray-100">
              <th className="py-3 px-4 font-medium w-[30%]">Saloon</th>
              <th className="py-3 px-4 font-medium w-[25%]">Address</th>
              <th className="py-3 px-4 font-medium w-[20%]">Contact</th>
              <th className="py-3 px-4 font-medium w-[15%]">Hours</th>
              <th className="py-3 px-4 font-medium w-[10%] text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {currentData.length > 0 ? (
              currentData.map((saloon) => (
                <tr
                  key={saloon.id}
                  onClick={() => navigate(`/profile/${saloon.id}`, { state: { saloon } })}
                  className="hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 cursor-pointer"
                >
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/40?img=${saloon.id}`}
                      alt={saloon.name}
                      className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                    />
                    <span className="font-medium text-[#01ABAB]">{saloon.name}</span>
                  </td>
                  <td className="py-3 px-4">{saloon.address}</td>
                  <td className="py-3 px-4">{saloon.contact}</td>
                  <td className="py-3 px-4">{saloon.hours}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(saloon.id);
                      }}
                      className={`relative group px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 
      ${saloon.status === "Active"
                          ? "text-[#01ABAB] bg-[#E6F9F9]"
                          : "text-red-500 bg-red-100"
                        }`}
                    >
                      <span className="absolute -top-8 left-1/2 w-25 -translate-x-1/2 bg-[#01ABAB] text-white text-xs px-1 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to {saloon.status === "Active" ? "unactive" : "active"}
                      </span>
                      ● {saloon.status}
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No saloons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {/* Mobile View */}
      <div className="grid md:hidden gap-4">
        {mobileData.map((saloon) => (
          <div
            key={saloon.id}
            onClick={() =>
              navigate(`/profile/${saloon.id}`, { state: { saloon } })
            }
            className="bg-white rounded-xl p-4 border border-gray-300 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={`https://i.pravatar.cc/60?img=${saloon.id}`}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-200"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{saloon.name}</h3>
              </div>
              <div className="relative group">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(saloon.id);
                  }}
                  className={`text-xs px-2 py-1 rounded-full ${saloon.status === "Active"
                    ? "bg-[#01ABAB]/10 text-[#01ABAB]"
                    : "bg-red-100 text-red-500"
                    }`}
                >
                  ● {saloon.status}
                </button>
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {saloon.status === "Active"
                    ? "Currently Active"
                    : "Currently Deactivated"}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin size={15} className="text-[#01ABAB]" /> {saloon.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-[#01ABAB]" /> {saloon.contact}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={15} className="text-[#01ABAB]" /> {saloon.hours}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex sm:flex-row justify-between items-center mt-6 text-sm text-gray-600 gap-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          ← Previous
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, currentPage - 2),
              Math.min(totalPages, currentPage + 3)
            )
            .map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-8 h-8 rounded-lg ${currentPage === num
                  ? "bg-[#01ABAB] text-white"
                  : "hover:bg-gray-100"
                  }`}
              >
                {num}
              </button>
            ))}
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Management;
