import React from "react";
import NotificationCard from "../../components/member/notification/NotificationCard";
import { useEffect } from "react";
import {
  getNotification,
  markAllAsRaed,
} from "../../services/NotificationService";
import { useState } from "react";
import Loader from "../../components/Loader";

function MemberNotification() {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState([]);
  const [unRead, setUnRead] = useState(0);
  const [markAllread, setMarkAllread] = useState(false);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        setLoading(true);
        const response = await getNotification();
        setNotification(response.notifications);
        setUnRead(response.unReadNotification);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotification();
  }, [markAllread]);

  const handleMarAllasRead = async () => {
    try {
      setLoading(true);
      const response = await markAllAsRaed();
      console.log(response);
      if (response.success) {
        setMarkAllread(true);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(unRead)

  return (
    <section className="w-full p-6 flex flex-col gap-10 min-h-screen ">
      <header className="w-full flex items-center justify-between">
        <div className="w-full ">
          <h1 className="text-xl font-bold text-text mb-2">Notifications</h1>
          <p className="text-sm text-muted">
            stay updated with your workspace activity
          </p>
        </div>
        <span className={`flex shrink-0 px-2 ${unRead.length <=0 ?'bg-blue-500/20 text-blue-500' : 'bg-gray-500/30 text-white' }  font-semibold rounded-full`}>
          {unRead} Unread
        </span>
      </header>
      <div className="flex items-center w-full justify-between">
        <h1 className="text-xl font-semibold ">Recent Notification</h1>{" "}
        <button disabled={unRead<=0} 
          onClick={handleMarAllasRead}
          className="text-sm font-medium disabled:bg-gray-600/50 disabled:cursor-not-allowed disabled:text-white bg-dark rounded-full px-4 py-2 cursor-pointer  text-white"
        >
          Mark all as read
        </button>
      </div>

      <div className="w-full flex items-center justify-center flex-col gap-4">
        {loading ? (
          <Loader />
        ) : notification.length <= 0 ? (
          <div className="w-full text-center text-muted">
            {" "}
            you don't have any notificatio yet{" "}
          </div>
        ) : (
          notification.map((item, idx) => {
            return <NotificationCard data={item} />;
          })
        )}
      </div>
    </section>
  );
}

export default MemberNotification;
