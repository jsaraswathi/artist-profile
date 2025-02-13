import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Image } from "react-bootstrap";
import "./ArtistProfile.css";
import CoverImg from "../../Assets/cover-image.png";
import Instagram from "../../Assets/instagram.svg";
import Youtube from "../../Assets/youtube.svg";
import Twitter from "../../Assets/twitter.svg";
import Photo from "../../Assets/photo.svg";
import { ArrowLeft } from "react-bootstrap-icons";
import { Dot } from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import {PlayCircle} from "react-bootstrap-icons";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ArtistProfile = () => {
  const query = useQuery();
  const id = query.get("id");
  console.log(`Fetching data for artist ID: ${id}`);
  const [loading, setLoading] = useState(true);
  const [artistBios, setArtistBios] = useState(null);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://lafs-atv.com/letsfame-admin/api/profile_details.php?id=${id}&page=1&pageSize=20`
        );
        const data = await response.json();
        if (data?.data) {
          setArtistBios(data.data);
        } else {
          setArtistBios(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBio();
  }, [id]);

  return (
    <Container fluid className="artist-profile-container px-0">
      {loading ? (
        <div className="text-center text-warning d-flex justify-content-center align-items-center vh-100">
          <Spinner
            animation="border border-2"
            variant="warning"
            role="status"
          />
          <span className="ms-2">Loading...</span>
        </div>
      ) : (
        <>
          <Row className="m-0">
            <Col className="p-0 position-relative">
              <Link to="/">
                <ArrowLeft
                  size={28}
                  className="position-absolute top-0 start-2 text-white mt-3 ms-3"
                />
              </Link>
              <Image
                src={artistBios?.cover_image || CoverImg}
                alt="Cover"
                className="img-fluid w-100 lt-cover"
              />
            </Col>
          </Row>
          <Row className="m-0">
            <Col md={4} className="bg-overlay text-center position-relative">
              <div className="artist-details">
                <div className="profile-img position-absolute">
                  <Image
                    src={artistBios?.profile_image || CoverImg}
                    alt={artistBios?.name || "Artist"}
                    className="img-fluid rounded-circle border-2 border-light"
                    style={{ border: "2px solid #fff" }}
                  />
                </div>
                <div className="about-artist position-relative pt-5 px-4">
                  <h5 className="pt-5 text-white mb-1">{artistBios?.name}</h5>
                  <ul className="p-0 text-white mb-4">
                    <li className="list-none d-inline-block me-2">
                      {artistBios?.profession}
                    </li>
                    <li className="d-inline-block me-2">
                      <Dot size={12} />
                    </li>
                    <li className="d-inline-block">{artistBios?.country}</li>
                  </ul>
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-md book-btn w-50 shadow-none position-relative fw-bold">
                      {`Book ${artistBios?.name}`}
                    </button>
                  </div>
                  <div className="d-flex justify-content-between align-items-center gap-3 px-4 pt-4 w-100">
                    <div className="d-flex align-items-center gap-3 w-75">
                      <Image
                        src={Instagram}
                        alt="Instagram Icon"
                        title="Instagram Icon"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <Image
                        src={artistBios?.followers?.instagram?.img || CoverImg}
                        alt={`${artistBios?.name} Profile Image`}
                        className="rounded-circle"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                      <span className="fw-bold text-white">
                        {artistBios?.followers?.instagram?.name}
                      </span>
                    </div>

                    <div className="d-flex flex-column align-items-center text-center w-25">
                      <span className="lt-yellow fw-bold">
                        {artistBios?.followers?.instagram?.followers}
                      </span>
                      <span className="text-white">Followers</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center gap-3 px-4 pt-4 w-100">
                    <div className="d-flex align-items-center gap-3 w-75">
                      <Image
                        src={Youtube}
                        alt="Youtube Icon"
                        title="Youtube Icon"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <Image
                        src={artistBios?.followers?.youtube?.img || CoverImg}
                        alt="pvsindhu1 Profile Image"
                        className="rounded-circle"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                      <span className="fw-bold text-white">
                        {artistBios?.followers?.youtube?.name}
                      </span>
                    </div>

                    <div className="d-flex flex-column align-items-center text-center w-25">
                      <span className="lt-yellow fw-bold">
                        {artistBios?.followers?.youtube?.followers}
                      </span>
                      <span className="text-white">Followers</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center gap-3 px-4 pt-4 w-100 mb-3">
                    <div className="d-flex align-items-center gap-3 w-75">
                      <Image
                        src={Twitter}
                        alt="Twitter Icon"
                        title="Twitter Icon"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <Image
                        src={artistBios?.followers?.twitter?.img || CoverImg}
                        alt="pvsindhu1 Profile Image"
                        className="rounded-circle"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                      <span className="fw-bold text-white">
                        {artistBios?.followers?.twitter?.name}
                      </span>
                    </div>

                    <div className="d-flex flex-column align-items-center text-center w-25">
                      <span className="lt-yellow fw-bold">
                        {artistBios?.followers?.twitter?.followers}
                      </span>
                      <span className="text-white">Followers</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={8}>
              <div className="artistbio py-4 px-2">
                <div className="mb-3">
                  <p className="text-white fs-6 fw-bold">About</p>
                  <span className="text-white">
                    {artistBios?.biography || "Biography not available."}
                  </span>
                </div>
                <h5 className="text-white fw-bold mb-3">Portfolio</h5>
                <div className="d-flex justify-content-start align-items-center text-white fs-4 mb-3">
                  <Image
                    src={Photo}
                    className="me-1"
                    alt="Showreel Icon"
                    title="Showreel Icon"
                    style={{ width: "25px" }}
                  />
                  <span className="fw-bold fs-6">Photos</span>
                </div>
                <div className="scroll-gallery-container">
                  <div className="scroll-gallery-row row">
                    {artistBios?.portfolio?.IMAGES?.map((image, index) => (
                      <div
                        key={index}
                        className="col-sm-6 col-md-3 lt-showreel-item px-2 pb-1"
                      >
                        <Image
                          id={`portfolio-image-${index + 1}`}
                          src={image?.url}
                          alt={image?.name}
                          title={image?.name}
                          className="lt-portfolio-img"
                        />
                      </div>
                    ))}

                    {artistBios?.portfolio?.VIDEOS?.map((video, index) => (
                      <div
                        key={index}
                        className="col-sm-6 col-md-3 lt-showreel-item px-2 pb-1 position-relative"
                      >
                        <Image
                          id={`portfolio-video-${index + 1}`}
                          src={video?.thumbnails}
                          alt={video?.name}
                          title={video?.name}
                          className="lt-portfolio-vid"
                        />
                        <PlayCircle size={34} className="text-white position-absolute top-50 start-50 translate-middle" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ArtistProfile;
