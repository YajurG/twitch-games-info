import React, { useEffect, useState } from 'react';

const UserStreams = () => {

    const [streams, setStreams] = useState([]);
    //const [isLoading, setIsLoading] = useState(true);
    const [isStreamData, setIsStreamData] = useState(false);

    useEffect(() => {
        const streamData = JSON.parse(localStorage.getItem("userStreamData"));
        console.log(streamData);
        if (streamData) {
            setIsStreamData(true);
            setStreams(streamData);
        } else {
            setIsStreamData(false);
            console.log("no stream data found");
        }
    }, [])

    return (
        <div>
            <h3>Welcome to your streamers!</h3>
            {isStreamData ? (
                <div className="row">
                    {streams.map(stream => (
                    <div className="col-lg-2 col-md-4 col-sm-12 mt-5">
                    <div className="card">
                      <img className="card-img-top" src={stream.thumbnail_url} />
                      <div className="card-body">
                        <h3 className="card-title">{stream.user_name}</h3>
                        <button className="btn btn-success" style={styles.button}>
                          <a
                            href={"https://twitch.tv/" + stream.user_name}
                            className="link"
                            target="_blank"
                          >
                            watch {stream.user_name}'s' stream
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
            ) : (
                <div>data not found</div>
            )}
        </div>
    )

}

const styles = {
    button: {
        margin: "5px 5px 5px 5px",
        width: "fitContent"
    },
}

export default UserStreams;