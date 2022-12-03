import React, { FC, useEffect, useState } from "react";
import PlayerPanel from "../PlayerPanel/PlayerPanel";
import Player from "../../interfaces/Player";
import axios from "axios";
import { ENDPOINTS } from "../../config";
import Loader from "../../assets/scss/components/Loader/Loader";

const Dashboard: FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    try {
      fetchPlayers()
        .then((data: Player[]) => {
          setPlayers(data);
          setIsLoading(false);
        })
        .catch(({ res }) => {
          setIsLoading(false);
          setError(true);
        });
    } catch (e) {}
  }, []);

  const fetchPlayers = async (): Promise<Player[]> => {
    const { data } = await axios.get<Player[]>(ENDPOINTS.GET.GET_PLAYERS_BIO);
    return data;
  };

  return (
    <section className="flex flex-column justify-content-start align-items-center">
      {!isLoading ? (
        <>
          {players.map((player: Player) => (
            <PlayerPanel key={player.id} player={player} />
          ))}
        </>
      ) : (
        <Loader size="big" />
      )}
    </section>
  );
};

export default Dashboard;
