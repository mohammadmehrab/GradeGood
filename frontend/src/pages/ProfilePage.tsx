import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user || !user.email) return;

      try {
        const response = await fetch(`http://localhost:3000/users?email=${user.email}`);
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        if (!data || Object.keys(data).length === 0) {
          const [firstName, lastName] = (user.displayName || "New User").split(" ");

          const createResponse = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              firstName: firstName || "New",
              lastName: lastName || "User",
            }),
          });

          const createdText = await createResponse.text();
          const createdData = createdText ? JSON.parse(createdText) : {};

          setProfile({
            firstName: createdData.firstName || "",
            lastName: createdData.lastName || "",
            email: createdData.email || user.email,
          });
        } else {
          setProfile({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || user.email,
          });
        }
      } catch (error) {
        console.error("Error syncing profile:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await fetch("http://localhost:3000/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });
    alert("Profile updated!");
  };

  return (
    <div className="border h-full flex flex-col items-center justify-center font-sans">
      <div className="w-[80%]">
        <div className="text-5xl font-bold mb-[0.5in]">Profile</div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col flex-1/2">
            <label htmlFor="firstName" className="m-2">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="bg-white p-3"
              value={profile.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col flex-1/2">
            <label htmlFor="lastName" className="m-2">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="bg-white p-3"
              value={profile.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="email" className="m-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            className="bg-gray-100 p-3"
            value={profile.email}
            disabled
          />
        </div>
        <button
          onClick={handleSave}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
