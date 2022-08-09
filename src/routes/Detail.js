import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.moudle.css";
function Detail() {
  const { id } = useParams(); // id를 찾는다!
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const getMovie = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetails(() => json.data.movie);
    setHours(parseInt(details.runtime / 60));
    setMinutes(details.runtime - hours * 60);
    setLoading(false);
  }, [hours, minutes]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);
  return (
    <div>
      {loading && hours === 0 && minutes === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>
            {details.title}({details.rating})
          </h1>
          <h4>
            Runtime : {hours}시간 {minutes}분
          </h4>
          <img src={details.medium_cover_image} alt={details.id} />
          <h2>Genres: </h2>
          <ul>
            {details.genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
          <h2>Desciption: </h2>
          <p>{details.description_full}</p>
        </div>
      )}
    </div>
  );
}
export default Detail;
