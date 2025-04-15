export default function ProfilePage() {
  return (
    <div className="border h-full flex flex-col items-center justify-center font-sans">
      <div className="w-[80%]">
        <div className="text-5xl font-bold mb-[0.5in]">Profile</div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col flex-1/2">
            <label htmlFor="profile-page-first-name-input" className="m-2">
              First Name
            </label>
            <input
              id="profile-page-first-name-input"
              type="text"
              name="profile-page-first-name-input"
              className="bg-white p-3"
              placeholder="Bob"
            />
          </div>
          <div className="flex flex-col flex-1/2">
            <label htmlFor="profile-page-last-name-input" className="m-2">
              Last Name
            </label>
            <input
              id="profile-page-last-name-input"
              type="text"
              name="profile-page-last-name-input"
              className="bg-white p-3"
              placeholder="William"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="profile-page-email-input" className="m-2">
            Email
          </label>
          <input
            id="profile-page-email-input"
            type="text"
            name="profile-page-email-input"
            className="bg-white p-3"
            placeholder="bob.william@gmail.com"
          />
        </div>
      </div>
    </div>
  );
}
