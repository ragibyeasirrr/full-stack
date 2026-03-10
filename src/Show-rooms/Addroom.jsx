

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authApiClient from "../mainlinks/auth-apiclient";
import apiClient from "../mainlinks/apiclient";

const Addroom = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [hotels, setHotels] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [roomId, setRoomId] = useState(null);

  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    apiClient.get("/hotel/").then(res => setHotels(res.data));
    apiClient.get("/room_facility/").then(res => setFacilities(res.data));
  }, []);


  const handleRoomAdd = async (data) => {
    try {
     
      let facilityArray = [];
      if (data.facility) {
        facilityArray = Array.isArray(data.facility)
          ? data.facility
          : [data.facility];
      }

      const payload = {
        room_num: data.room_num,
        description: data.description || "",
        cost_per_day: data.cost_per_day,
        capecity: data.capecity,      
        hotel: data.hotel,
        facility: facilityArray,
        available: data.available || false,
      };

      const roomRes = await authApiClient.post("/room/", payload);
      setRoomId(roomRes.data.id);
      alert("Room added successfully!");
    } catch (error) {
      console.log("Error adding room", error.response?.data || error);
      alert("Error adding room. Check console for details!");
    }
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };


  const handleUpload = async () => {
    if (!images.length) return alert("Please select images.");
    setLoading(true);

    try {
      await Promise.all(
        images.map(image => {
          const formData = new FormData();
          formData.append("image", image);

          return authApiClient.post(`/room/${roomId}/roomimg/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        })
      );

      alert("Room images uploaded successfully");
      setImages([]);
      setPreviewImages([]);
    } catch (error) {
      console.log("Error uploading images", error.response?.data || error);
      alert("Error uploading images");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add New Room</h2>

      {!roomId ? (
        <form onSubmit={handleSubmit(handleRoomAdd)} className="space-y-4">
          <div>
            <label>Room Number</label>
            <input
              {...register("room_num", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.room_num && <p className="text-red-500 text-xs">Required</p>}
          </div>

          <div>
            <label>Description</label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div>
            <label>Cost Per Day</label>
            <input
              type="number"
              {...register("cost_per_day", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label>Capacity</label>
            <input
              type="number"
              {...register("capecity", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label>Hotel</label>
            <select
              {...register("hotel", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Hotel</option>
              {hotels.map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">Facilities</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {facilities.map(f => (
                <label key={f.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={f.id}
                    {...register("facility")}
                  />
                  {f.name}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <input type="checkbox" {...register("available")} />
            <label>Available</label>
          </div>

          <button className="btn btn-primary w-full">Add Room</button>
        </form>
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-2">Upload Room Images</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleImageChange}
          />
          {previewImages.length > 0 && (
            <div className="flex gap-2 mt-2">
              {previewImages.map((src, idx) => (
                <img key={idx} src={src} alt="Preview" className="w-16 h-16 rounded-md object-cover" />
              ))}
            </div>
          )}
          <button
            onClick={handleUpload}
            className="btn btn-primary w-full mt-2"
            disabled={loading}
          >
            {loading ? "Uploading images..." : "Upload Images"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Addroom;


