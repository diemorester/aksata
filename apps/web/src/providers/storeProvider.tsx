"use client";
import { AppStore, makeStore } from "@/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        persistor={persistStore(storeRef.current)}
        loading={
          <div className="min-h-screen place-content-center items-center flex bg-black text-white">
            <video 
              src="/loading.mp4"
              autoPlay
              muted
              loop
              className="md:w-[450px] md:h-[450px]"
            />
          </div>}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}