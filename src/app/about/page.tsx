"use client";

import React, { useState } from "react";
import LoadingPage from "../loading";

const Generate = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setImage(null);

    try {
      const form = new FormData();
      form.append("prompt", e.currentTarget.prompt.value);

      const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
        method: "POST",
        headers: {
          "x-api-key":
            "63e9328367cba603736a242b5ff9061fd0fd2fab47eb073b789bd75a4f11e0ef17a8f84d921461bb9248df1c17f9c2d9",
        },
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const buffer = await response.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(buffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setImage(`data:image/png;base64,${base64}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-4xl md:text-6xl font-bold text-accent mb-8">
          Generate Paintings....!😴
        </h1>

        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-base-100 p-6 rounded-lg shadow-lg space-y-4"
          >
            <input
              type="text"
              name="prompt"
              placeholder="What do you want to paint?"
              className="input input-bordered w-full"
            />
            <div className="flex justify-center">
              <button className="btn btn-primary px-8" disabled={loading}>
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-error/10 text-error rounded-lg">
              {error}
            </div>
          )}

          {image && (
            <div className="mt-8 bg-base-100 p-4 rounded-lg shadow-lg">
              <img
                src={image}
                alt="Generated artwork"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generate;
