import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";
import { supabase } from "../supabase";

interface ImageInfo {
  url: string;
  name: string;
  uploadedAt: Date;
}

const Food = () => {
  const [media, setMedia] = useState<ImageInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 画像をアップロードする関数
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileName = `${uuid()}/${file.name}`;
      const { data, error } = await supabase.storage
        .from("food")
        .upload(fileName, file);

      if (error) {
        console.error("Error uploading image:", error.message);
        return;
      }

      console.log("Image uploaded:", data?.path);
      fetchMedia(); // アップロード後にメディアリストを再取得
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  // アップロードされた画像のリストを取得する関数
  const fetchMedia = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage.from("food").list("", {
        limit: 10,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

      if (error) {
        console.error("Error fetching media:", error.message);
        return;
      }

      // data を使って公開URLを取得
      const mediaList = await Promise.all(
        data.map(async (item) => {
          const { data: urlData } = supabase.storage
            .from("food")
            .getPublicUrl(item.name);

          return {
            url: urlData.publicUrl || "",
            name: item.name,
            uploadedAt: new Date(item.updated_at),
          };
        })
      );

      setMedia(mediaList);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  };

  // コンポーネントがマウントされたときにメディアを取得
  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div className="mt-5">
      <input type="file" onChange={uploadImage} />
      <div className="mt-5">
        <h3>My Uploads</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          media.map((item) => (
            <div key={item.name}>
              <img
                src={item.url}
                alt={item.name}
                style={{ width: "300px", height: "auto", marginBottom: "10px" }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Food;
