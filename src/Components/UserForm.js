import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const GENDER_OPTIONS = [
  { text: "Male", value: "male" },
  { text: "Female", value: "female" },
  { text: "Other", value: "other" },
];

const schema = yup
  .object({
    lastName: yup.string().required("Last Name is required"),
    gender: yup.string().required("Gender is required"),
    phone: yup.string().required("Phone number is required"),
    email: yup
      .string()
      .email("This must be a email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "The password must be six characters"),
    confirmPassword: yup
      .string()
      .required("Password is required")
      .min(6, "The password must be six characters")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  })
  .required();

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    console.log(values);
    setTimeout(() => {
      reset();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>User Registration Form</h3>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className="form-control"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && (
          <span className="field_level_error">This field is required</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" className="form-control" {...register("lastName")} />
        {errors.lastName && (
          <span className="field_level_error">{errors.lastName?.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select className="form-control" {...register("gender")}>
          <option value="">Select</option>
          {GENDER_OPTIONS.map((option, index) => (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        {errors.gender && (
          <span className="field_level_error">{errors.gender?.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" {...register("email")} />
        {errors.email && (
          <span className="field_level_error">{errors.email?.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input type="number" className="form-control" {...register("phone")} />
        {errors.phone && (
          <span className="field_level_error">{errors.phone?.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          {...register("password")}
        />
        {errors.password && (
          <span className="field_level_error">{errors.password?.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Cofirm Password</label>
        <input
          type="password"
          className="form-control"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="field_level_error">
            {errors.confirmPassword?.message}
          </span>
        )}
      </div>

      <button className="btn btn-primary mt-2">Submit</button>
    </form>
  );
};

export default UserForm;
