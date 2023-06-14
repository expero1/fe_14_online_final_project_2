import { useDispatch } from "react-redux";
import { testReducer } from "../../redux/slices/testSlice";

const MainContent = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div>Main Content</div>
      <button
        onClick={() => {
          dispatch(testReducer());
        }}
      >
        reducerTest
      </button>
    </>
  );
};
export default MainContent;