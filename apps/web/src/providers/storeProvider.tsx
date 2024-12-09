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
        loading={<div className="min-h-screen place-content-center text-center bg-neutral-950 text-white"><p className="animate-bounce text-3xl">loading</p></div>}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}