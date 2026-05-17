import { useEffect, useState,} from "react";
  
  import DashboardLayout  from "../../layouts/DashboardLayout";
  
  import { getMyProfile, updateProfile,} from "../../services/authService";
  
  
  const StudentProfilePage = () => {
  
    const [
      profile,
      setProfile
    ] = useState(null);
  
  
    const [
      fullName,
      setFullName
    ] = useState("");
  
  
    const [
      avatar,
      setAvatar
    ] = useState("");
  
  
    const [
      loading,
      setLoading
    ] = useState(true);
  
  
    const [
      saving,
      setSaving
    ] = useState(false);
  
  
    useEffect(() => {
  
      fetchProfile();
  
    }, []);
  
  
    const fetchProfile =
      async () => {
  
        try {
  
          const data =
            await getMyProfile();
  
          setProfile(
            data.user
          );
  
          setFullName(
            data.user.fullName
          );
  
          setAvatar(
            data.user.avatar || ""
          );
  
        } catch (error) {
  
          console.error(error);
  
        } finally {
  
          setLoading(false);
        }
      };
  
  
    const handleUpdate =
      async (e) => {
  
        e.preventDefault();
  
        try {
  
          setSaving(true);
  
          const data =
            await updateProfile({
  
              fullName,
              avatar,
  
            });
  
          setProfile(
            data.user
          );
  
          localStorage.setItem(
            "user",
            JSON.stringify(
              data.user
            )
          );
  
        } catch (error) {
  
          console.error(error);
  
        } finally {
  
          setSaving(false);
        }
      };
  
  
    if (loading) {
  
      return (
        <DashboardLayout>
  
          <p className="events-loading">
            Loading profile...
          </p>
  
        </DashboardLayout>
      );
    }
  
  
    return (
      <DashboardLayout>
  
        <section>
  
          <h1 className="dashboard-page-title">
            My Profile
          </h1>
  
  
          <p className="events-page-description">
  
            Manage your profile
            information and personal
            identity within your club
            ecosystem.
  
          </p>
  
        </section>
  
  
        <section className="profile-layout">
  
          {/* PROFILE CARD */}
  
          <div className="profile-card glass-card">
  
            <div className="profile-avatar">
  
              {profile?.avatar ? (
  
                <img
                  src={profile.avatar}
                  alt="avatar"
                  className="profile-avatar-img"
                />
  
              ) : (
  
                profile?.fullName
                  ?.charAt(0)
  
              )}
  
            </div>
  
  
            <h2 className="profile-name">
              {profile?.fullName}
            </h2>
  
  
            <p className="profile-email">
              {profile?.email}
            </p>
  
  
            <div className="profile-role">
  
              {profile?.role}
  
            </div>
  
          </div>
  
  
          {/* PROFILE FORM */}
  
          <form
            onSubmit={handleUpdate}
            className="profile-form glass-card"
          >
  
            <div className="profile-grid">
  
              <div>
  
                <label className="profile-label">
                  Full Name
                </label>
  
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  className="auth-input"
                />
  
              </div>
  
  
              <div>
  
                <label className="profile-label">
                  Avatar URL
                </label>
  
                <input
                  type="text"
                  value={avatar}
                  onChange={(e) =>
                    setAvatar(
                      e.target.value
                    )
                  }
                  className="auth-input"
                />
  
              </div>
  
  
              <div>
  
                <label className="profile-label">
                  Roll Number
                </label>
  
                <input
                  type="text"
                  value={profile?.rollNumber|| ""}
                  disabled
                  className="auth-input"
                />
  
              </div>
  
  
              <div>
  
                <label className="profile-label">
                  Department
                </label>
  
                <input
                  type="text"
                  value={profile?.department|| ""}
                  disabled
                  className="auth-input"
                />
  
              </div>
  
  
              <div>
  
                <label className="profile-label">
                  Year
                </label>
  
                <input
                  type="text"
                  value={profile?.year || ""}
                  disabled
                  className="auth-input"
                />
  
              </div>
  
  
              <div>
  
                <label className="profile-label">
                  Status
                </label>
  
                <input
                  type="text"
                  value={profile?.status || ""}
                  disabled
                  className="auth-input capitalize"
                />
  
              </div>
  
            </div>
  
  
            <button
              type="submit"
              className="primary-btn mt-10"
            >
  
              {saving
                ? "Saving..."
                : "Update Profile"}
  
            </button>
  
          </form>
  
        </section>
  
      </DashboardLayout>
    );
  };
  
  export default StudentProfilePage;