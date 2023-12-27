import "./LoadingSpinnerStyles.css";
import { Oval } from "react-loader-spinner";
export const LoadingSpinner = () => {
  return (
    <div className="overlay">
      <Oval
        height={80}
        width={80}
        color="rgb(255, 102, 0)"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="Cargando"
        secondaryColor="rgb(255, 102, 0)"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </div>
  );
};
