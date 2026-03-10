import { useForm } from "react-hook-form";
import authApiClient from "../mainlinks/auth-apiclient";

const Addhotelcategory = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleCategoryAdd = async (data) => {
    try {
      await authApiClient.post("/hotel_category/", data);
      alert("Hotel category added successfully!");
    } catch (error) {
      console.log("Error adding category", error.response?.data || error);
      alert("Error adding category");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Hotel Category</h2>

      <form onSubmit={handleSubmit(handleCategoryAdd)} className="space-y-4">
        
        <div>
          <label>Category Name</label>
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
          Add Category
        </button>

      </form>
    </div>
  );
};

export default Addhotelcategory;