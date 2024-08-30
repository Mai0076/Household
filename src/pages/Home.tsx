import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { supabase } from "../supabase";

const Home: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  const addEvent = async (title: string, date: string) => {
    const { data, error } = await supabase.from("events").insert([
      {
        title: title,
        date: date,
      },
    ]);

    if (error) {
      console.error("Error adding event:", error);
      return null;
    }

    return data;
  };

  const getAllEvents = async () => {
    const { data, error } = await supabase.from("events").select("*");
    if (error) {
      console.error("Error fetching events:", error);
      return [];
    }
    return data;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = await getAllEvents();
      setEvents(fetchedEvents || []);
    };
    fetchEvents();
  }, []);

  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr);
    setModalOpen(true);
  };

  const handleSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title === "") return;

    const newEvent = await addEvent(title, selectedDate);
    if (newEvent) {
      setEvents([...events, ...newEvent]);
      window.location.reload();
    }

    setNewEventTitle("");
    setModalOpen(false);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
        }}
        events={events}
        dateClick={handleDateClick}
      />

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-3">予定を追加</h2>
            <form onSubmit={handleSubmitEvent}>
              <input
                type="text"
                value={title}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="予定のタイトル"
                className="border p-2 mb-3 w-full"
              />
              <div className="mb-3">
                <span>選択された日付: {selectedDate}</span>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  確定
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  キャンセル
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
