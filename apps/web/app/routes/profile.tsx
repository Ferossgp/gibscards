import { ClientOnly } from "remix-utils/client-only";
import { ProfileView } from "~/components/profile-view.client";

export default function Index() {
  return (
    <div className="mx-auto grid w-full max-w-6xl min-h-[90vh] pb-8">
      <div className="p-4 relative overflow-hidden rounded-3xl border-2 border-neutral-900 bg-[#f3f2fa] w-full h-full">
        <div className="absolute bottom-0 right-0 left-0 w-full z-0 opacity-30 transition-all duration-1000 ease-in-out flex justify-center items-center">
          <img
            src="/assets/friends.svg"
            alt="Buy gift card"
            className="w-1/3"
          />
        </div>
        <ClientOnly>{() => <ProfileView />}</ClientOnly>
      </div>
    </div>
  );
}
