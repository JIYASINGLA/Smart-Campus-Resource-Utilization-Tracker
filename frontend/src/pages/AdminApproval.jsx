import { useEffect, useState } from "react";

export default function AdminApproval() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("/api/booking-requests")
      .then(res => res.json())
      .then(data => setRequests(data));
  }, []);

  const handleAction = async (id, action) => {
    const res = await fetch(`/api/booking/${id}/${action}`, {
      method: "PUT"
    });

    if (res.ok) {
      setRequests(prev => prev.filter(r => r.booking_id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Admin Approval</h1>

      {requests.map(req => (
        <div key={req.booking_id} className="p-4 mb-3 bg-white rounded shadow">
          <p>Room: {req.room_id}</p>
          <p>Date: {req.booking_date}</p>

          <button
            onClick={() => handleAction(req.booking_id, "approve")}
            className="px-3 py-1 mr-2 text-white bg-green-500 rounded"
          >
            Approve
          </button>

          <button
            onClick={() => handleAction(req.booking_id, "reject")}
            className="px-3 py-1 text-white bg-red-500 rounded"
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}