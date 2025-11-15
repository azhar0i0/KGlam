import React, { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";

const generateCustomers = (count = 25) => {
  const statuses = ["Active", "Deactivate"];
  const customers = [];
  for (let i = 1; i <= count; i++) {
    customers.push({
      id: i,
      name: `Customer ${i}`,
      email: `customer${i}@gmail.com`,
      role: "Customer",
      status: statuses[Math.floor(Math.random() * statuses.length)],
      image: `https://randomuser.me/api/portraits/${
        i % 2 === 0 ? "men" : "women"
      }/${(i * 7) % 70}.jpg`,
    });
  }
  return customers;
};

const Customers = () => {
  const [customers, setCustomers] = useState(generateCustomers(40));
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const mobileCardLimit = 5;

  const filtered = useMemo(() => {
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const mobileData = currentData.slice(0, mobileCardLimit);

  const handleToggle = (id) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === id
          ? {
              ...customer,
              status: customer.status === "Active" ? "Deactivate" : "Active",
            }
          : customer
      )
    );
  };

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
          <p className="text-gray-400 text-sm mt-1">
            View and manage the list of registered customers.
          </p>
        </div>

        <div className="relative group mt-4 md:mt-0 ">
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

      {/* Desktop Table */}
<div className="hidden md:block overflow-x-auto rounded-lg">
  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="text-gray-600 text-sm bg-gray-50">
        <th className="py-3 px-4 font-medium w-[30%]">Customer Name</th>
        <th className="py-3 px-4 font-medium w-[30%]">Email</th>
        <th className="py-3 px-4 font-medium w-[20%]">Role</th>
        <th className="py-3 px-4 font-medium w-[20%] text-center">Status</th>
      </tr>
    </thead>
    <tbody className="text-gray-700 text-sm">
      {currentData.length > 0 ? (
        currentData.map((customer) => (
          <tr
            key={customer.id}
            className="hover:bg-gray-50 transition-all duration-200 border-b border-gray-100"
          >
            <td className="py-3 px-4 flex items-center gap-3">
              <img
                src={customer.image}
                alt={customer.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-medium">{customer.name}</span>
            </td>
            <td className="py-3 px-4">{customer.email}</td>
            <td className="py-3 px-4">{customer.role}</td>
            <td className="py-3 px-4 text-center">
              <button
                onClick={() => handleToggle(customer.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                  customer.status === "Active"
                    ? "text-[#01ABAB] bg-[#E6F9F9]"
                    : "text-red-500 bg-red-100"
                }`}
              >
                ● {customer.status}
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="4"
            className="text-center py-6 text-gray-400 italic"
          >
            No customers found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      {/* Mobile Cards */}
      <div className="grid md:hidden gap-4">
        {mobileData.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-xl p-4 border border-gray-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={customer.image}
                alt={customer.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{customer.name}</h3>
                <p className="text-sm text-gray-500">{customer.role}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600"><span className="font-bold">Mail : </span>{customer.email}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggle(customer.id);
              }}
              className={`text-sm px-3 py-1 mt-2 width-full rounded-full transition-all duration-300 ease-in-out ${
                customer.status === "Active"
                  ? "text-[#01ABAB] bg-[#01ABAB]/10 hover:bg-[#01ABAB]/20"
                  : "text-red-500 bg-red-100 hover:bg-red-200"
              }`}
            >
              ● {customer.status}
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex sm:flex-row justify-between items-center mt-6 text-sm text-gray-600 gap-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
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
                className={`w-8 h-8 rounded-lg ${
                  currentPage === num
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
          className={`flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Customers;
