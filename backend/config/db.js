import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed!");
        console.error("Error:", error.message);

        // Provide helpful troubleshooting based on error type
        if (error.message.includes("ECONNREFUSED") || error.message.includes("querySrv")) {
            console.error("\n🔧 TROUBLESHOOTING STEPS:");
            console.error("1. Check if your IP address is whitelisted in MongoDB Atlas");
            console.error("   → Go to: https://cloud.mongodb.com/");
            console.error("   → Navigate to: Network Access → Add IP Address");
            console.error("   → Add your current IP or use 0.0.0.0/0 for development");

            try {
                const response = await fetch("https://api.ipify.org?format=json");
                const data = await response.json();
                console.error(`   → 🌐 Your Current IP appears to be: ${data.ip}`);
            } catch (err) {
                console.error("   → ⚠️  Could not automatically detect IP.");
            }

            console.error("\n2. Verify your internet connection");
            console.error("3. Check if MongoDB Atlas cluster is running (not paused)");
            console.error("4. Disable VPN if you're using one");
            console.error("5. ⚠️ DNS ISSUE DETECTED: Try using Google DNS (8.8.8.8) or Cloudflare (1.1.1.1)");
            console.error("   OR use the 'Standard connection string' (mongodb://...) instead of SRV (mongodb+srv://)");
            console.error("\n💡 Alternative: Use local MongoDB instead");
            console.error("   → Install MongoDB locally");
            console.error("   → Update .env: MONGO_URI=mongodb://localhost:27017/home_finder\n");
        } else if (error.message.includes("authentication failed")) {
            console.error("\n🔧 Check your MongoDB credentials in .env file");
        }

        // Don't exit the process - let the server run without DB for now
        console.log("\n⚠️  Server will continue running without database connection");
        console.log("⚠️  Fix the issue above and restart the server\n");
    }
};

export default connectDB;
