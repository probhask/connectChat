import { Outlet } from "react-router-dom";

const CreateGroup = () => {
  return (
    <>
      <Outlet />
      <div className=" top-0 left-0 w-full h-full  z-[200] flex justify-center items-center">
        CreateGroup
      </div>
    </>
  );
};

export default CreateGroup;
