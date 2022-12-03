import React, { FC, useEffect, useState } from "react";
import DashboardPanelHeader from "../../components/DashboardPanelHeader/DashboardPanelHeader";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { DataTable } from "primereact/datatable";
import { Panel } from "primereact/panel";
import Player from "../../interfaces/Player";
import axios from "axios";
import {
  DASHBOARD_RADAR_CHART_LABELS,
  DASHBOARD_RADAR_CHART_OPTIONS,
  ENDPOINTS,
} from "../../config";
import { PlayerTotalStatsTable } from "../../interfaces/PlayerTotalStats";
import Loader from "../../components/Loader/Loader";
import { Column } from "primereact/column";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

interface PlayerPanelProps {
  player: Player;
}

const PlayerPanel: FC<PlayerPanelProps> = ({ player }) => {
  const navigate = useNavigate();

  const [isToggled] = useState<boolean>(true);
  const [fetched, setFetched] = useState<boolean>(false);
  const [playerDataState, setPlayerDataState] = useState<{
    error: boolean;
    loading: boolean;
    data: [PlayerTotalStatsTable, [any]];
  }>({
    error: false,
    loading: false,
    data: [{}, [[]]],
  });

  const [chart, setChart] = useState({
    labels: DASHBOARD_RADAR_CHART_LABELS,
    datasets: [
      {
        label: `${player.first_name} ${player.last_name}`,
        backgroundColor: `rgba(99, 114, 195, .5)`,
        borderColor: "#6372c3",
        pointBackgroundColor: "#6372c3",
        pointBorderColor: "#6372c3",
        pointHoverBackgroundColor: "#6372c3",
        pointHoverBorderColor: "#6372c3",
        data: [],
      },
    ],
  });

  const fetchDataOnClick = () => {
    if (fetched && playerDataState.data?.length > 0) return;
    setPlayerDataState({ ...playerDataState, loading: true });

    try {
      fetchPlayerData()
        .then((data: [PlayerTotalStatsTable, [never[]]]) => {
          setPlayerDataState({ loading: false, data, error: false });
          setFetched(true);
          setChart({
            ...chart,
            datasets: [
              {
                ...chart.datasets[0],
                data: data[1].map((d) => Object.values(d)[0]),
              },
            ],
          });
        })
        .catch(({ res }) => {
          setPlayerDataState({
            ...playerDataState,
            loading: false,
            error: true,
          });
        });
    } catch (e) {
      setPlayerDataState({
        ...playerDataState,
        loading: false,
        error: true,
      });
    }

    setFetched(true);
  };

  const fetchPlayerData = async (): Promise<[PlayerTotalStatsTable, [any]]> => {
    const { data } = await axios.get<[PlayerTotalStatsTable, [any]]>(
      ENDPOINTS.GET.GET_PLAYER_PANEL_DATA.replace(
        ":id",
        player.id.toString()
      ).replace(":season", "2021-2022")
    );
    return data;
  };

  const addPlayerToFavourites = async () => {};
  const navigateToDetailedPlayerStatistics = () =>
    navigate("/player/:id".replace(":id", player.id.toString()));

  return (
    <Panel
      header={
        <DashboardPanelHeader
          data={{
            first_name: player.first_name,
            last_name: player.last_name,
            main_position: player.main_position,
            nationality: player.nationality,
            current_club: player.current_club,
          }}
        />
      }
      collapsed
      toggleable
      className="w-full"
      onClick={fetchDataOnClick}
    >
      {!playerDataState.loading &&
      Object.keys(playerDataState.data[0]).length > 0 ? (
        <>
          <Splitter layout="horizontal">
            <SplitterPanel>
              <div className="card">
                <DataTable value={playerDataState.data} size="small">
                  {Object.keys(playerDataState.data[0]).map((header, i) => (
                    <Column
                      key={"column-" + i}
                      field={header}
                      header={
                        header.charAt(0).toUpperCase() +
                        header
                          .split("_")
                          .join(" ")
                          .slice(1, header.length - 1)
                      }
                    ></Column>
                  ))}
                </DataTable>
              </div>
            </SplitterPanel>
            <SplitterPanel>
              <div className="card flex justify-content-center">
                <Chart
                  id={player.id.toString()}
                  options={DASHBOARD_RADAR_CHART_OPTIONS}
                  type="radar"
                  data={chart}
                  style={{ position: "relative", width: "auto" }}
                />
              </div>
            </SplitterPanel>
          </Splitter>
          <div className="flex align-items-center justify-content-end w-full p-3 gap-2">
            <Button
              label="Add to favourites"
              icon="pi pi-star-fill"
              onClick={addPlayerToFavourites}
            />

            <Button
              label="View details"
              icon="pi pi-chart-line"
              onClick={navigateToDetailedPlayerStatistics}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </Panel>
  );
};

export default PlayerPanel;
