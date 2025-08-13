import { MdArrowBackIos } from "react-icons/md"
import { useNavigate } from "react-router"

const GoBack = () => {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      className="flex justify-center items-center rounded-full bg-black text-white text-[1.5rem] w-7 h-7 p-2  "
      onClick={() => navigate(-1, { replace: true })}
    >
      <MdArrowBackIos />
    </button>
  )
}

export default GoBack
