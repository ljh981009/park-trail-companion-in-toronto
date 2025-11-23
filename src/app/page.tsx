import { Suspense } from "react";
import MapClient from "../components/MapClient";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-screen h-screen flex flex-col bg-[#E9F5EC]">
        <Suspense
          fallback={
            <LoadingSpinner message="Loading Toronto parks and trails..." />
          }
        >
          {/* <MapClient parks={parks} /> */}
          <MapClient />
        </Suspense>
      </main>
    </div>
  );
}
