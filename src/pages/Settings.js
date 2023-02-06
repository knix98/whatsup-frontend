import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import styles from "../styles/settings.module.css";
import { useAuth } from "../hooks";

const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false); //signifying whether user entered the update profile state
  const [editPic, setEditPic] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadingPic, setUploadingPic] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : "");
  const [userImg, setUserImg] = useState(
    "https://cdn-icons-png.flaticon.com/128/3893/3893170.png"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingForm, setSavingForm] = useState(false); //signifying whether the saving updated profile info request completed or not

  useEffect(() => {
    const getUserImg = async function () {
      const imgUrl = await auth.fetchUserImg();
      setUserImg(imgUrl);
    };

    getUserImg();
  }, [auth]);

  const updateProfile = async () => {
    setSavingForm(true);

    let error = false;
    if (!name || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      error = true;
    } else if (password !== confirmPassword) {
      toast.error("Password and confirm password does not match");
      error = true;
    }

    if (error) return setSavingForm(false);

    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );

    setEditMode(false);
    //resetting the password and confirmPassword
    setPassword("");
    setConfirmPassword("");

    if (response.success) {
      toast.success("User updated successfully!");
    } else {
      toast.error(response.message);
    }

    setSavingForm(false);
  };

  const removeEditPicMode = () => {
    setFile(null);
    setEditPic(false);
  };

  const uploadFile = async (e) => {
    e.preventDefault();

    if (file === null) {
      toast.error('Please "Choose File" first');
      return;
    }

    setUploadingPic(true);
    const formData = new FormData();
    formData.append("photo", file);

    const response = await auth.changeUserPic(formData);

    if (response.success) {
      toast.success("Profile pic changed successfully");
    } else {
      toast.error(response.message);
    }

    setFile(null);
    setUploadingPic(false);
    setEditPic(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img src={userImg} alt="Profile pic" />
        {editPic ? (
          <>
            <form onSubmit={uploadFile}>
              <input
                type="file"
                name="photo"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <button
                type="submit"
                className={styles.uploadPic}
                disabled={uploadingPic}
              >
                {uploadingPic ? "Uploading..." : "Upload"}
              </button>
            </form>

            <button
              className={styles.uploadPic}
              disabled={uploadingPic}
              onClick={removeEditPicMode}
            >
              Go Back
            </button>
          </>
        ) : (
          <button className={styles.editPic} onClick={() => setEditPic(true)}>
            Change Profile Pic
          </button>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          //'auth.user?.name' means if auth.user exists->return auth.user.name otherwise return undefined
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? "Saving..." : "Save profile info"}
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile Info
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
