import mongoose from "mongoose";

export const dbConnect = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    console.log("🔍 MONGO_URL:", mongoUrl); 

    if (!mongoUrl) {
      throw new Error("MONGO_URL muhit o'zgaruvchisi aniqlanmagan");
    }

    await mongoose.connect(mongoUrl);
    console.log("✅ MongoDB ga muvaffaqiyatli ulandi!");
  } catch (error) {
    console.error("❌ MongoDB ulanishida xatolik:", error);
    process.exit(1);
  }
};
