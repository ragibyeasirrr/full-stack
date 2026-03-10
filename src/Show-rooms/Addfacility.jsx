import { useForm } from "react-hook-form";
import authApiClient from "../mainlinks/auth-apiclient";

const Addfacility = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFacilityAdd = async (data) => {
    try {
      await authApiClient.post("/room_facility/", data);
      alert("Facility added successfully!");
    } catch (error) {
      console.log("Error adding facility", error.response?.data || error);
      alert("Error adding facility");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Facility</h2>

      <form onSubmit={handleSubmit(handleFacilityAdd)} className="space-y-4">

        <div>
          <label>Facility Name</label>
          <input
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-red-500 text-xs">Required</p>}
        </div>

        <div>
          <label>Description</label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <button className="btn btn-primary w-full">
          Add Facility
        </button>

      </form>
    </div>
  );
};

export default Addfacility;