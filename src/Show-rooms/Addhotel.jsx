import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authApiClient from "../mainlinks/auth-apiclient";
import apiClient from "../mainlinks/apiclient";

const Addhotel = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiClient.get("/hotel_category/")
      .then(res => setCategories(res.data));
  }, []);

  const handleHotelAdd = async (data) => {
    try {

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("description", data.description || "");
      formData.append("category", data.category);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await authApiClient.post("/hotel/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Hotel added successfully!");

    } catch (error) {
      console.log("Error adding hotel", error.response?.data || error);
      alert("Error adding hotel");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Hotel</h2>

      <form onSubmit={handleSubmit(handleHotelAdd)} className="space-y-4">

        <div>
          <label>Hotel Name</label>
          <input
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Address</label>
          <input
            {...register("address", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label>Category</label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>

            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}

          </select>
        </div>

        <div>
          <label>Hotel Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <button className="btn btn-primary w-full">
          Add Hotel
        </button>

      </form>
    </div>
  );
};

export default Addhotel;