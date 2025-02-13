import React, { useEffect, useState } from "react";
import "./BookList.css";
import Insta from "../../Assets/instagram.svg";
import Youtube from "../../Assets/youtube.svg";
import Twitter from "../../Assets/twitter-black.svg";
import Warning from "../../Assets/warning.svg";
import { Link, useNavigate } from "react-router-dom";

const BookList = ({ activeCategory }) => {
  const [artistInfos, setArtistInfos] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FetchArtist = async () => {
      try {
        setLoading(true);
        const url = await fetch(
          "https://lafs-atv.com/letsfame-admin/api/list_artise_api.php?page=2&pageSize=12"
        );
        const data = await url.json();
        if (data.status && data.data && data.data.posts) {
          setArtistInfos(data.data.posts);
        }
      } catch (error) {
        console.error("Error Fetching Data: ", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    FetchArtist();
  }, []);

  const handleBooking = (id) => {
    navigate(`/artist-profile?id=${id}`);
  };

  const filterCategory =
    activeCategory === "All"
      ? artistInfos
      : artistInfos.filter((artist) => artist.profession === activeCategory);
  console.log("filterCategory: ", filterCategory);
  return (
    <div className="container pt-5 mt-4">
      {loading ? (
        <div className="spinner-overlay text-center text-warning">
          <div className="spinner-border border-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="text-warning ms-2">Loading...</span>
        </div>
      ) : filterCategory.length > 0 ? (
        <div className="row artist-row">
          {filterCategory.map((artistInfo) => (
            <div className="col-md-4 text-left p-0" key={artistInfo.id}>
              <div className="book-artist-info h-100 bg-white shadow-sm rounded p-3">
                <div className="row py-2 align-items-center">
                  <div className="col-4">
                    <div className="art-img">
                      <img
                        src={artistInfo.profile_image}
                        alt={artistInfo.name}
                        className="img-fluid rounded-circle"
                      />
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="artist-details ps-3">
                      <Link
                        to={`artist-profile?id=${artistInfo.id}`}
                        className="text-decoration-none"
                      >
                        <span className="text-dark art-name">
                          {artistInfo.name}
                        </span>
                      </Link>
                      <p className="mb-1 art-profession text-dark">
                        {artistInfo.profession}
                      </p>
                      <div className="social-items d-flex align-items-center justify-space-between">
                        <div className="text-start d-flex align-items-center">
                          <img
                            src={Insta}
                            alt="Instagram Icon"
                            draggable="false"
                          />
                          <small className="lt-social-media ps-1">
                            {artistInfo.followers?.instagram?.followers ?? "1k"}
                          </small>
                        </div>
                        <div className="text-start d-flex align-items-center">
                          <img
                            src={Youtube}
                            alt="Youtube Icon"
                            draggable="false"
                          />
                          <small className="lt-social-media ps-1">
                            {artistInfo.followers?.youtube?.followers ?? "1k"}
                          </small>
                        </div>
                        <div className="text-start d-flex align-items-center">
                          <img
                            src={Twitter}
                            alt="Twitter Icon"
                            draggable="false"
                          />
                          <small className="lt-social-media ps-1">
                            {artistInfo.followers?.twitter?.followers ?? "2k"}
                          </small>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mt-2">
                        <button
                          className="btn btn-sm book-btn w-100 shadow-none position-relative"
                          onClick={() => handleBooking(artistInfo.id)}
                        >
                          <span
                            id={`btnText-${artistInfo.id}`}
                            className="lt-btn-text"
                          >
                            Book
                          </span>
                          <div
                            id={`spinner-${artistInfo.id}`}
                            className="spinner-border spinner-border-sm text-light d-none"
                            role="status"
                          ></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-100 text-center pt-5 mt-5 warning-txt">
          <img src={Warning} alt="warning" className="img-fluid mb-3" />
          <h1 className="text-white text-center text-uppercase fw-bold">
            No Results
          </h1>
          <h1 className="text-white text-center text-uppercase fw-bold">
            Found
          </h1>
        </div>
      )}
    </div>
  );
};

export default BookList;
