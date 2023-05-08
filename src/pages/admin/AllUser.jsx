import React, { useEffect, useState } from "react";
import axios from "../../axios/adminInstance";
import { useSelector } from "react-redux";

function AllUser() {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("All");
  const [change, setChange] = useState();

  const [user, setUser] = useState();
  const [artist, setArtist] = useState();
  const [pending, setPending] = useState();

  const { token } = useSelector((state) => state.adminSlice);

  console.log(role, "the role", change, "the change");

  useEffect(() => {
    axios({
      method: "GET",
      url: "/userFinder",
      headers: {
        Authorization: `${token}`,
      },
    }).then((res) => {
      // setData(res.data.data);
      // setChange(res.data.data);
      setUser(res?.data?.user);
      setArtist(res?.data?.artist);
      setPending(res?.data?.pending);
      console.log(res, "the data");
    });
  }, []);

  // useEffect(() => {
  //   roleFinder();
  // }, [role]);

  // const roleFinder = async () => {
  //   let filteredUsers;

  //   switch (role) {
  //     case "pending":
  //       filteredUsers = data.filter((user) => user.type.includes("pending"));
  //       break;
  //     case "user":
  //       filteredUsers = data.filter((user) => user.type.includes("user"));
  //       break;
  //     case "artist":
  //       filteredUsers = data.filter((user) => user.type.includes("artist"));
  //       break;
  //     default:
  //       filteredUsers = data;
  //       return;
  //   }

  //   console.log(filteredUsers, "the filtered users");
  //   setChange(filteredUsers);
  // }

  const approver = async (id) => {
    console.log("the id ", id);
    await axios({
      method: "POST",
      url: "/artistApprover",
      headers: {
        Authorization: `${token}`,
      },
      data: {
        id,
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
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user?.map((data) => (
                    <tr key={data?._id}>
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
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden=""
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          />
                          <span className="relative">{data.type}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight text-white">
              Pending Artists
            </h2>
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
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Approve
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pending?.map((data) => (
                    <tr key={data?._id}>
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
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden=""
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          />
                          <span className="relative">{data.type}</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          className="bg-blue-500 rounded-full h-7 w-20"
                          onClick={() => {
                            approver(data?._id);
                          }}
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight text-white">
              Artists
            </h2>
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
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {artist?.map((data) => (
                    <tr key={data?._id}>
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
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden=""
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          />
                          <span className="relative">{data.type}</span>
                        </span>
                      </td>
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
