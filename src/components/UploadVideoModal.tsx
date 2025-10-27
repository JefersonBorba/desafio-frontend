import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import ReactModal from "react-modal";

const UploadVideoModal = ({
  isUploadOpen,
  setIsUploadOpen,
}: {
  isUploadOpen: boolean;
  setIsUploadOpen: (open: boolean) => void;
}) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (typeof document !== "undefined") {
      ReactModal.setAppElement(document.body);
    }
  }, []);
  const handleUpload = async () => {
    if (!file || !user?.token) return alert("Missing file or token");
    setUploading(true);

    try {
      const uploadRes = await fetch(
        `https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            snippet: {
              title,
              description,
              tags: ["test", "bycoders"],
              categoryId: "22",
            },
            status: { privacyStatus: "private" },
          }),
        },
      );

      const uploadUrl = uploadRes.headers.get("location");
      if (!uploadUrl) throw new Error("Failed to initialize upload");

      const binaryRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": "video/*" },
        body: file,
      });

      if (!binaryRes.ok) throw new Error("Upload failed");
      alert("✅ Video uploaded successfully (as private)");
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed: " + (err as Error).message);
    } finally {
      setUploading(false);
      setIsUploadOpen(false);
      setFile(null);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <ReactModal
      isOpen={isUploadOpen}
      onRequestClose={() => setIsUploadOpen(false)}
      contentLabel="Upload Video Modal"
      appElement={
        typeof document !== "undefined"
          ? document.getElementById("__next")!
          : undefined
      }
      className="max-w-lg mx-auto mt-20 p-6 rounded-lg outline-none bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
      overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-50"
    >
      <h2 className="text-xl font-bold mb-4">Upload a New Video</h2>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4 w-full text-sm"
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-zinc-100 dark:bg-zinc-800"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="w-full mb-4 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-zinc-100 dark:bg-zinc-800"
      ></textarea>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsUploadOpen(false)}
          className="px-4 py-2 rounded border border-zinc-600 text-sm hover:opacity-80"
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`px-4 py-2 rounded text-white ${
            uploading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </ReactModal>
  );
};

export default UploadVideoModal;
