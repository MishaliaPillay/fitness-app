import { useEffect } from "react";
import React from "react";
import { useTrainerActions, useTrainerState } from "@/providers/trainer";
import { useUserState } from "@/providers/userlogin";

const ClientList = () => {
  const { getTrainers } = useTrainerActions();
  const { user, isPending: userLoading, isError: userError } = useUserState();
  const { trainers: clients = [], isPending, isError } = useTrainerState();

  useEffect(() => {
    if (user?.id) {
      getTrainers(user.id); // Dispatch action to Redux store
    }
  }, [user?.id]);

  if (userLoading || isPending) return <p>Loading clients...</p>;
  if (userError || isError)
    return <p className="text-red-500">Error fetching clients.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Client List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Joined</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {Array.isArray(clients) && clients.length > 0 ? (
              clients.map((client, index) => (
                <tr
                  key={client.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{client.fullName}</td>
                  <td className="py-3 px-6">{client.email}</td>
                  <td className="py-3 px-6">
                    {client.date
                      ? new Date(client.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;
