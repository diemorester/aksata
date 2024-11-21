import { Toaster } from "react-hot-toast";

const ToastComp = () => {
  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "12px",
          },
          // Custom success toast
          success: {
            duration: 5000,
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
          // Custom errors toast
          error: {
            duration: 5000,
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          },
        }}
      />
    </div>
  );
};

export default ToastComp;