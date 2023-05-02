import React, { useEffect, useState } from "react";
import axios from "../../axios/adminInstance";

function AllUser() {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("All");
  const [change, setChange] = useState();

  console.log(role, "the role");

  useEffect(() => {
    const userFinder = async () => {
      await axios({
        method: "POST",
        url: "/userFinder",
      }).then((res) => {
        setData(res.data.data);
        setChange(res.data.data);
        console.log(data, "the data");
      });
    };

    userFinder();
  }, []);

  useEffect(() => {
    roleFinder();
  }, [role]);

  const roleFinder = async () => {
    let filteredUsers;

    switch (role) {
      case "pending":
        filteredUsers = data.filter((user) => user.type.includes("pending"));
        break;
      case "user":
        filteredUsers = data.filter((user) => user.type.includes("user"));
        break;
      case "artist":
        filteredUsers = data.filter((user) => user.type.includes("artist"));
        break;
      default:
        filteredUsers = data;
        return;
    }

    console.log(filteredUsers, "the filtered users");
    setChange(filteredUsers);
  };

  const approver = async () => {
    await axios({
      method: "POST",
      url: "/artistApprover",
      data: {
        data,
      },
    }).then((res) => {
      console.log(res, "the response here");
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight text-white">
              Users
            </h2>
          </div>
          <div className="my-2 flex sm:flex-row flex-col pt-3">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select
                  onChange={(e) => {
                    setRole(e.target.value);
                    roleFinder();
                  }}
                  className=" h-full rounded-lg border-t  sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                >
                  <option className="" value={"All"}>All</option>
                  <option value={"user"}>User</option>
                  <option value={"pending"}>Pending</option>
                  <option value={"artist"}>Artist</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    {role == "pending" ? (
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Approve
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {change?.map((data) => (
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={data?.imgUrl}
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {data?.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {data.type}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Jan 01, 2020
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden=""
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          />
                          <span className="relative">{data.type}</span>
                        </span>
                      </td>
                      {role == "pending" ? (
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button
                            className="bg-blue-500 rounded-full h-7 w-20"
                            onClick={() => {
                              approver();
                            }}
                          >
                            Approve
                          </button>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUser;
