import { Link, useParams } from "react-router";

import { FaArrowLeft } from "react-icons/fa";
import { Suspense, useEffect, useState } from "react";


import Addtobookingcart from "./Addtobookingcart";
import RoomImageGallery from "./RoomImageGallery";
import apiClient from "../mainlinks/apiclient";
import ReviewSection from "../Review/Reviewsection";

const Aboutrooms = () => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const { roomId } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchRoom = async () => {
      try {
        const res = await apiClient.get(`/room/${roomId}/`);
        setRoom(res.data);
        console.log("Room data:", res.data);
      } catch (error) {
        console.log("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);

  if (loading) return <div>Loading...</div>;
  if (!room) return <div>Room Not Found...</div>;

  return (
    <div className="w-3/4 mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/rooms"
          className="flex items-center text-sm text-base-content/70 hover:text-base-content transition-colors"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Back to rooms
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <Suspense
          fallback={
            <div className="aspect-square bg-base-300 animate-pulse rounded-lg"></div>
          }
        >
          < RoomImageGallery
            images={room?.images || []}
            Roomnum={room.room_num}
          />
        </Suspense>

        <div className="flex flex-col">
          <div className="mb-4">
            <div className="badge badge-outline mb-2">
              Hotel: {room.hotel?.name}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{room.room_num}</h1>
          </div>

          <div className="mt-2 mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">${room.cost_per_day.toFixed(2)}</span>
              <span className="text-sm text-base-content/70">
                (${room.cost_per_day.toFixed(2)} per day)
              </span>
            </div>
          </div>

          <div className="prose prose-sm mb-6">
            <p>{room.description}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center">
              <div className="mr-2 text-sm font-medium">Availability:</div>
              {room.available ? (
                <div className="badge badge-outline bg-success/10 text-success border-success/20">
                  Available
                </div>
              ) : (
                <div className="badge badge-outline bg-error/10 text-error border-error/20">
                  Not Available
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto">
            <Addtobookingcart room={room} />
          </div>
        </div>
      </div>

      <ReviewSection roomId={roomId} />
    </div>
  );
};

export default Aboutrooms;