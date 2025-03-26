import React, { useEffect, useState } from "react";

function Torocare() {
  const [providers, setProviders] = useState([]);
  const [events, setEvents] = useState([]);
  const [myAppointments, setMyAppointments] = useState([]);
  const [searchSpecialization, setSearchSpecialization] = useState("");
  const [appointmentForm, setAppointmentForm] = useState({
    student_name: "",
    provider: "",
    date: "",
    symptoms: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/torocare/providers/")
      .then((res) => res.json())
      .then((data) => setProviders(data));

    fetch("http://127.0.0.1:8000/api/torocare/events/")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...appointmentForm,
      status: "Pending",
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/torocare/appointments/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Appointment booked successfully!");
        setAppointmentForm({
          student_name: "",
          provider: "",
          date: "",
          symptoms: "",
        });
        fetchMyAppointments(payload.student_name);
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };

  const fetchMyAppointments = (studentName) => {
    fetch("http://127.0.0.1:8000/api/torocare/appointments/")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (item) => item.student_name.toLowerCase() === studentName.toLowerCase()
        );
        setMyAppointments(filtered);
      });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🩺 Torocare: Student Health & Wellness
      </h1>

      {/* FILTER INPUT */}
      <div className="mb-4 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search by specialization (e.g. Mental, Nutrition...)"
          value={searchSpecialization}
          onChange={(e) => setSearchSpecialization(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        />
        {searchSpecialization && (
          <button
            onClick={() => setSearchSpecialization("")}
            className="text-sm text-blue-600 underline mt-1"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* CARE PROVIDERS */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Meet Our Care Providers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {providers
            .filter((provider) =>
              provider.specialization
                .toLowerCase()
                .includes(searchSpecialization.toLowerCase())
            )
            .map((provider) => (
              <div key={provider.id} className="bg-white rounded-2xl shadow-md p-4">
                <img
                  src={`http://127.0.0.1:8000${provider.image}`}
                  alt={provider.name}
                  className="w-full h-48 object-cover rounded-xl mb-3 border"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/img/placeholder-doctor.jpg";
                  }}
                />
                <h3 className="text-lg font-bold text-blue-800">{provider.name}</h3>
                <p className="text-sm text-gray-600">{provider.specialization}</p>
                <p className="text-sm mt-1">🕒 {provider.availability}</p>
                <p className="text-sm">📧 {provider.contact}</p>
              </div>
            ))}
        </div>
      </section>

      {/* BOOK APPOINTMENT */}
      <section className="mt-16 mb-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Book an Appointment</h2>
        <form
          className="grid gap-4 bg-white shadow-md p-6 rounded-2xl"
          onSubmit={handleAppointmentSubmit}
        >
          <input
            type="text"
            placeholder="Your Name"
            value={appointmentForm.student_name}
            onChange={(e) =>
              setAppointmentForm({ ...appointmentForm, student_name: e.target.value })
            }
            onBlur={() => {
              if (appointmentForm.student_name.trim().length > 0) {
                fetchMyAppointments(appointmentForm.student_name);
              }
            }}
            className="border p-2 rounded"
            required
          />
          <select
            value={appointmentForm.provider}
            onChange={(e) =>
              setAppointmentForm({ ...appointmentForm, provider: e.target.value })
            }
            className="border p-2 rounded"
            required
          >
            <option value="">Select a Provider</option>
            {providers.map((provider) => (
              <option key={provider.id} value={provider.id}>
                {provider.name}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            value={appointmentForm.date}
            onChange={(e) =>
              setAppointmentForm({ ...appointmentForm, date: e.target.value })
            }
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Describe your symptoms or concerns..."
            value={appointmentForm.symptoms}
            onChange={(e) =>
              setAppointmentForm({ ...appointmentForm, symptoms: e.target.value })
            }
            className="border p-2 rounded"
            rows={3}
            required
          />
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
          >
            Submit Appointment
          </button>
        </form>
      </section>

      {/* MY APPOINTMENTS */}
      {myAppointments.length > 0 && (
        <section className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-blue-900">My Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myAppointments.map((appt) => (
              <div key={appt.id} className="bg-white shadow rounded-xl p-4">
                <p className="font-bold text-blue-800">With Provider ID #{appt.provider}</p>
                <p className="text-sm">🕒 {new Date(appt.date).toLocaleString()}</p>
                <p className="text-sm">📝 {appt.symptoms}</p>
                <p className="text-sm">
                  📌 Status: <span className="font-semibold">{appt.status}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* HEALTH EVENTS */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Upcoming Health Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-md p-4">
              <img
                src={`http://127.0.0.1:8000${event.image}`}
                alt={event.title}
                className="w-full h-48 object-cover rounded-xl mb-3 border"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/img/placeholder-event.jpg";
                }}
              />
              <h3 className="text-lg font-bold text-blue-800">{event.title}</h3>
              <p className="text-sm text-gray-700 mb-1">{event.description}</p>
              <p className="text-sm text-gray-500">
                📅 {new Date(event.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Torocare;
