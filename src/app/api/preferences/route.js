import connectDB from "@/_helpers/db/connect";
import User from "@/_helpers/db/models/User";

export async function GET(req, res) {
  await connectDB();
  const forUser_ID = req.headers.get("user_id");


  let ID;
  if (forUser_ID != "undefined") {

    if (req.headers.get("userRole") !== "admin") {
      return Response.json({
        message: "Unauthorized",
      });
    }
    ID = forUser_ID;
  } else {
    ID =req.headers.get("userID");
  }

  const data = await User.findById(ID, "preferences firstName");

  return Response.json(data);
}

export async function POST(req, res) {
  await connectDB();
  const forUser_ID = req.headers.get("user_id");

  let ID;
  const isAdmin = req.headers.get("userRole") === "admin";

  if (forUser_ID != "undefined") {
    if (req.headers.get("userRole") !== "admin") {
      return Response.json({
        message: "Unauthorized",
      });
    }
    ID = forUser_ID;
  } else {
    ID = req.headers.get("userID");
  }


  const pref = await req.json();

  const oldPref = await User.findById(ID, "preferences");

  
  console.log(pref);
  oldPref.preferences.email = pref.email;
  oldPref.preferences.allowNextWeek = pref.allowNextWeek;

  if (isAdmin) {
    oldPref.preferences.persistMeals = pref.persistMeals;
    oldPref.preferences.skipNotSignedUp = pref.skipNotSignedUp;
  }
  
  oldPref.markModified("preferences");


  await oldPref.save();

  return Response.json({
    message: "OK",
  });
}

// forces the route handler to be dynamic
export const dynamic = "force-dynamic";
