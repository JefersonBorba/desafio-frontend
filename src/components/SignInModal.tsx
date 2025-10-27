import { useEffect } from "react";
import ReactModal from "react-modal";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
const SignInModal = ({
  isSignInOpen,
  setIsSignInOpen,
}: {
  isSignInOpen: boolean;
  setIsSignInOpen: (open: boolean) => void;
}) => {
  const { loginWithYouTube } = useUser();
  useEffect(() => {
    if (typeof document !== "undefined") {
      ReactModal.setAppElement(document.body);
    }
  }, []);

  return (
    <ReactModal
      isOpen={isSignInOpen}
      onRequestClose={() => setIsSignInOpen(false)}
      contentLabel="Sign In Modal"
      className="max-w-md mx-auto mt-20 p-6 rounded-lg outline-none bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
      overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-50"
    >
      <h2 className="text-xl font-bold mb-4">Sign In with YouTube</h2>
      <button
        onClick={loginWithYouTube}
        className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 w-full justify-center"
      >
        <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
        Sign in with Google
      </button>
      <button
        onClick={() => setIsSignInOpen(false)}
        className="w-full mt-3 px-4 py-2 rounded border border-zinc-600 text-sm hover:opacity-80"
      >
        Cancel
      </button>
    </ReactModal>
  );
};

export default SignInModal;
