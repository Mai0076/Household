import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react"; // FullCalendarのReactコンポーネントをインポート
import dayGridPlugin from "@fullcalendar/daygrid"; // dayGridプラグイン
import timeGridPlugin from "@fullcalendar/timegrid"; // timeGridプラグイン
import interactionPlugin from "@fullcalendar/interaction"; // interactionプラグイン
import { DateClickArg } from "@fullcalendar/interaction"; // DateClickArgの型をインポート

const Home: React.FC = () => {
  const [events, setEvents] = useState<{ title: string; start: string }[]>([]); // カレンダーのイベントを保持する状態
  const [modalOpen, setModalOpen] = useState(false); // モーダルの開閉状態を保持する状態
  const [newEventTitle, setNewEventTitle] = useState(""); // 新しいイベントのタイトルを保持する状態
  const [selectedDate, setSelectedDate] = useState(""); // 選択された日付を保持する状態

  // 日付をクリックしたときにモーダルを開く関数
  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr); // 選択された日付を設定
    setModalOpen(true); // モーダルを開く
  };

  // 新しいイベントをカレンダーに追加する関数
  const handleAddEvent = () => {
    setEvents([
      ...events,
      {
        title: newEventTitle,
        start: selectedDate,
      },
    ]);
    setNewEventTitle(""); // イベントタイトルの入力フィールドをクリア
    setModalOpen(false); // モーダルを閉じる
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
        dateClick={handleDateClick} // 日付クリック時のハンドラをバインド
      />

      {/* モーダル */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-3">予定を追加</h2>
            <input
              type="text"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="予定のタイトル"
              className="border p-2 mb-3 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddEvent}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                確定
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
