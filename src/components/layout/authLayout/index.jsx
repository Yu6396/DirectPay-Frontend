import GoBack from "../../../commons/goBack"

const AuthLayout = ({ image, text, children }) => {
  return (
    <div className="flex w-full h-screen bg-main-100 ">
      <div className="w-full md:max-w-[50%] hidden md:block ">
        <img src={image} alt="" className="w-full h-full " />
      </div>
      <div className="flex flex-col justify-center items-center w-full md:max-w-[50%] p-6 ">
        <div className="absolute top-8 right-12">
          <GoBack />
        </div>
        <div className="min-w-[80%]">
          <h1 className="text-[1.5rem] font-medium mb-4">{text}</h1>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
