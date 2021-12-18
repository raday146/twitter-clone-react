import React, { useState, useEffect } from "react";
import { Alert, Figure, Form, Modal, Row } from "react-bootstrap";
import { useAuthUser } from "../context/authContext";
import { validate } from "../utils/validate";
import { updateUserDetails } from "../utils/apiClient";
import { uploadMedia } from "../utils/upload";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CLAOUDINARY_BANNER,
  CLAOUDINARY_AVATAR,
} from "../constants/cloudinary";
const ProfileModalScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuthUser();
  const [name, setName] = useState(currentUser?.user?.name);
  const [email, setEmail] = useState(currentUser?.user?.email);
  const [banner, setBanner] = useState(currentUser?.user?.banner);
  const [bio, setBio] = useState(currentUser?.user?.bio);
  const [userLocation, setLocation] = useState(currentUser?.user?.location);
  const [avatar, setAvatar] = useState(currentUser?.user?.avatar);
  const url = !!currentUser?.user ? currentUser?.user?.urls[0] : "";
  const [userUrl, setUrl] = useState(url);
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [showModal, setShowModel] = useState(true);
  const redirected = new URLSearchParams(location.search).get("redirected");

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  const handleClose = () => {
    setShowModel(false);
    navigate("/");
  };
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);
      setError(null);
      const _name = validate(name, "name", {
        identifier: "Name",
      });
      const _bio = validate(bio, "html", {
        identifier: "Bio",
        max_length: 280,
      });
      const _website = validate(userUrl, "html", {
        identifier: "Website URL",
        min_length: 0,
      });
      const _location = validate(userLocation, "name", {
        identifier: "Location",
        min_length: 0,
      });
      const user = {
        name: _name,
        email: email,
        bio: _bio,
        banner: banner,
        location: _location,
        website: _website,
        avatar: avatar,
      };

      await updateUserDetails(currentUser.token, user);
      handleClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function uploadProfileImage(event) {
    const file = event.target.files[0];
    if (file) {
      const uploadAvatar = await uploadMedia({
        type: "image",
        file,
        preset: CLAOUDINARY_AVATAR,
      });
      setAvatar(uploadAvatar);
    }
  }

  async function uploadCoverImage(event) {
    const file = event.target.files[0];
    if (file) {
      const uploadBanner = await uploadMedia({
        type: "image",
        file,
        preset: CLAOUDINARY_BANNER,
      });
      setBanner(uploadBanner);
    }
  }

  return (
    <Modal
      enforceFocus={false}
      className="p-0"
      size="lg"
      scrollable
      show={showModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="py-2">
        <Modal.Title>
          <small className="font-weight-bold">
            {!redirected ? "Edit profile" : "Complete your profile"}
          </small>
        </Modal.Title>
        <button
          type="button"
          onClick={handleClose}
          class="btn-close"
          aria-label="Close"
        ></button>
      </Modal.Header>
      {error && (
        <Alert variant="danger" className="mb-0 font-weight-bold text-white">
          {error}
        </Alert>
      )}
      <Modal.Body className="pt-1 pb-0 px-0">
        <fieldset>
          <Form onSubmit={handleSubmit} noValidate>
            <Figure
              className={`${!currentUser?.banner && "bg-primary"} d-flex`}
              style={{
                height: "200px",
                width: "100%",
                backgroundImage: `url(${banner})`,
              }}
            >
              {currentUser && currentUser?.banner && (
                <Figure.Image
                  src={currentUser?.banner}
                  className="w-100 h-100"
                />
              )}
              <label
                htmlFor="cover-image"
                className="mx-auto my-auto btn btn-outline border px-2 py-1 font-weight-bold"
              >
                Edit cover image
              </label>
              <input
                onChange={uploadCoverImage}
                style={{ display: "none" }}
                id="cover-image"
                type="file"
                accept="img/*"
              />
            </Figure>
            <div className="px-3">
              <Row className="d-flex justify-content-between mt-n2 px-2 align-items-center w-100">
                <label htmlFor="profile-image">
                  <Figure
                    style={{ height: "100px", width: "100px" }}
                    className="mt-n5 rounded-circle overflow-hidden bg-primary"
                  >
                    <Figure.Image className="w-100 h-100" src={avatar} />
                  </Figure>
                  <input
                    style={{ display: "none" }}
                    onChange={uploadProfileImage}
                    id="profile-image"
                    type="file"
                    accept="img/*"
                  />
                </label>
              </Row>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  style={{ fontSize: "1.25rem" }}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email" className="my-2">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  style={{ fontSize: "1.25rem" }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="bio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{ fontSize: "1.25rem", minHeight: "100px" }}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="location" className="my-2">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  style={{ fontSize: "1.25rem" }}
                  type="text"
                  value={userLocation}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="website">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  style={{ fontSize: "1.25rem" }}
                  type="text"
                  value={userUrl}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </Form.Group>
            </div>
            <Modal.Footer className="py-1">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <div />
                <div className="right">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="btn btn-primary rounded-pill px-3 py-1 font-weight-bold"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Modal.Footer>
          </Form>
        </fieldset>
      </Modal.Body>
    </Modal>
  );
};
export default ProfileModalScreen;
