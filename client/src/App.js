import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listEntries } from "./Api";
import EntryForm from "./EntryForm";

function App() {
  const [showPopup, setShowPopup] = useState({});
  const [entries, setEntries] = useState([]);
  const [addEntry, setAddEntry] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 22.917923,
    longitude: 76.230064,
    zoom: 3,
  });

  const getEntries = async () => {
    const entries = await listEntries();
    console.log(entries);
    setEntries(entries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (e) => {
    console.log(e);
    const [longitude, latitude] = e.lngLat;
    setAddEntry({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {entries.map((entry) => (
        <>
          <Marker
            //{...console.log(entry)}
            key={entry._id}
            latitude={entry.latitute}
            longitude={entry.longitude}
          >
            <div
              className="marker"
              onClick={() =>
                setShowPopup({
                  [entry._id]: true,
                })
              }
            >
              <svg
                className="marker"
                style={{
                  width: "24px",
                  height: "24px",
                }}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitute}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup({})}
              anchor="top"
              dynamicPosition={true}
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  <i>{new Date(entry.visitDate).toLocaleString()}</i>
                </small>
                {entry.image && <img src={entry.image} alt={entry.title}></img>}
              </div>
            </Popup>
          ) : null}
        </>
      ))}

      {addEntry ? (
        <React.Fragment key={addEntry._id}>
          <Marker latitude={addEntry.latitude} longitude={addEntry.longitude}>
            <div className="addmarker">
              <svg
                className="addmarker"
                style={{
                  width: "24px",
                  height: "24px",
                }}
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          <Popup
            latitude={addEntry.latitude}
            longitude={addEntry.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntry(null)}
            anchor="top"
            dynamicPosition={true}
          >
            <div className="popup">
              <EntryForm
                onClose={() => {
                  setAddEntry(null);
                  getEntries();
                }}
                location={addEntry}
              ></EntryForm>
            </div>
          </Popup>
        </React.Fragment>
      ) : null}
    </ReactMapGL>
  );
}

export default App;
